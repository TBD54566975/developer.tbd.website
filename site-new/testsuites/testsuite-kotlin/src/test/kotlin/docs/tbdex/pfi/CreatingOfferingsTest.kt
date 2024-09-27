package website.tbd.developer.site.docs.tbdex.pfi

import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.*
import tbdex.sdk.protocol.Parser
import tbdex.sdk.protocol.Validator
import tbdex.sdk.protocol.models.*
import tbdex.sdk.protocol.serialization.Json
import web5.sdk.credentials.PresentationExchange
import web5.sdk.credentials.model.*
import website.tbd.developer.site.docs.utils.TestData

class CreatingOfferingsTest {

  private val pfiDid = TestData.PFI_DID
  private lateinit var pd: PresentationDefinitionV2

  @BeforeEach
  fun setup() {
    // :snippet-start: kccPresentationDefintionKt
    val objectMapper = ObjectMapper()
    pd = PresentationDefinitionV2(
      id = "presentation-definition-kcc",
      name = "KYC Verification",
      purpose = "We need to verify your customer status and necessary checks.",
      format = Format(
        jwtVc = JwtObject(
          alg = listOf( "ES256K", "EdDSA")
        )
      ),
      inputDescriptors = listOf(
        InputDescriptorV2(
          id = "known-customer-credential",
          name = "Known Customer Credential",
          purpose = "Please present your Known Customer Credential for verification.",
          constraints = ConstraintsV2(
            fields = listOf(
              FieldV2(
                path = listOf("$.type[*]"),
                filterJson = objectMapper.readTree(
                  """{"type": "string", "pattern": "KnownCustomerCredential"}"""
                ),
              ),
              FieldV2(
                path = listOf("$.evidence[*].kind"),
                filterJson = objectMapper.readTree(
                  """{"type": "string", "pattern": "sanction_screening"}"""
                )
              ),
              FieldV2(
                path = listOf("$.credentialSubject.countryOfResidence"),
                filterJson = objectMapper.readTree(
                  """{"type": "string", "const": "US"}"""
                )
              ),
              FieldV2(
                path = listOf("$.issuer"),
                filterJson = objectMapper.readTree(
                  """{"type": "string", "const": "did:dht:d4sgiggd3dwimo4ubki7spo45q5dazxphrizbxhcgapapcnzpouy"}"""
                )
              )
            )
          )
        )
      )
    )
    // :snippet-end:
  }

  @Test
  fun `Create Offering`() {
    try {
      // :snippet-start: pfiCreateOfferingKt
      val offering = Offering.create(
        from = pfiDid.uri,
        protocol = "1.0",
        data = OfferingData(
          description = "Selling BTC for USD",
          payin = PayinDetails(
            currencyCode = "USD",
            methods = listOf(
              PayinMethod(
                kind = "DEBIT_CARD",
                requiredPaymentDetails = try {
                  Json.jsonMapper.readTree(
                    """
                    {
                      "${'$'}schema": "http://json-schema.org/draft-07/schema",
                      "type": "object",
                      "properties": {
                          "cardNumber": {
                              "type": "string",
                              "description": "The 16-digit debit card number",
                              "minLength": 16,
                              "maxLength": 16
                          },
                          "expiryDate": {
                              "type": "string",
                              "description": "The expiry date of the card in MM/YY format",
                              "pattern": "^(0[1-9]|1[0-2])\\/([0-9]{2})${'$'}"
                          },
                          "cardHolderName": {
                              "type": "string",
                              "description": "Name of the cardholder as it appears on the card"
                          },
                          "cvv": {
                              "type": "string",
                              "description": "The 3-digit CVV code",
                              "minLength": 3,
                              "maxLength": 3
                          }
                      }
                  }
                  """.trimIndent()
                  )
                } catch (e: JsonParseException) {
                  throw IllegalArgumentException("unexpected character at offset ${e.location.charOffset}")
                }
              )
            )
          ),
          payout = PayoutDetails(
            currencyCode = "BTC",
            methods = listOf(
              PayoutMethod(
                kind = "BTC_ADDRESS",
                estimatedSettlementTime = 60,
                fee = "0.25"
              )
            )
          ),
          payoutUnitsPerPayinUnit = "0.00003826",
          requiredClaims = pd
        )
      )
      // :snippet-end:

      // :snippet-start: pfiSignOfferingKt
      offering.sign(pfiDid)
      // :snippet-end:

      // :snippet-start: pfiValidateOfferingKt
      Validator.validate(Parser.parseResourceToJsonNode(offering.toString()), "resource")
      // :snippet-end:
    }
    catch (e: Exception){
      Assertions.fail(e)
    }
  }

  @Test
  fun `Validate KCC PD`() {
    try {
      // :snippet-start: kccValidatePdKt
      PresentationExchange.validateDefinition(
        presentationDefinition = pd
      )
      // :snippet-end:
    } catch (e: Exception) {
      Assertions.fail(e)
    }
  }
}
