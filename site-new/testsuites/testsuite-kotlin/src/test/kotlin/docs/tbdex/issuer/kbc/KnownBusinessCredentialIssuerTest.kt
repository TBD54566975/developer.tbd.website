package website.tbd.developer.site.docs.web5.build.verifiablecredentials

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*
import web5.sdk.credentials.VerifiableCredential
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.didcore.Service
import java.time.Instant
import web5.sdk.credentials.CredentialSchema

import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.*
import tbdex.sdk.protocol.Parser
import tbdex.sdk.protocol.Validator
import tbdex.sdk.protocol.models.*
import web5.sdk.credentials.model.*
import java.util.*


/**
 * Tests backing the KBC Issuance Guide
 */
internal class KbcIssuanceTest {
    private val objectMapper = ObjectMapper()
   
    val serviceToAdd = Service.Builder()
        .id("pfi")
        .type("PFI")
        .serviceEndpoint(listOf("https://example.com/"))
        .build()

    val options = CreateDidDhtOptions(
        publish = true,
        services = listOf(serviceToAdd),
    )

    val pfiDid = DidDht.create(InMemoryKeyManager(), options)

    @Test
    fun `issue KBC`() {
        val subjectDid = DidDht.create(InMemoryKeyManager(),options)
        val subjectDidUri = subjectDid.uri
        data class AdditionalData(
            val exampleField: String = "exampleValue"
        )
        // :snippet-start: issueKbcKt
        val kbc = VerifiableCredential.create(
            issuer = pfiDid.uri, // Issuer's DID URI
            subject = subjectDidUri, // Wallet app's DID URI
            expirationDate = Date.from(Instant.parse("2025-09-30T12:34:56Z")), // Date the KBC should expire
            data = AdditionalData(), // Custom attributes for the KBC
            credentialSchema = CredentialSchema(
                type = "JsonSchema", // Format type of the schema used for the KBC
                id = "https://vc.schemas.host/kbc.schema.json" // URL to the schema used for the KBC
            )
        )
        val signedKbc = kbc.sign(pfiDid)
        // :snippet-end:
        assertNotNull(kbc)
        assertEquals(pfiDid.uri, kbc.issuer)
        assertEquals(subjectDidUri, kbc.subject)

        assertNotNull(signedKbc)
        assertTrue(signedKbc.matches(Regex("^[a-zA-Z0-9-_]+\\.[a-zA-Z0-9-_]+\\.[a-zA-Z0-9-_]+$")))
    }
    @Test
    fun `Required claims in Known Business Credential`() {
        // :snippet-start: kbcPresentationDefinitionKt
        val pd = PresentationDefinitionV2(
            id = "presentation-definition-kbc", // required unique id for presentation definition
            name = "KYB Verification",
            purpose = "Verifying your business status.",
            format = Format(
                jwtVc = JwtObject(
                    alg = listOf("ES256K", "EdDSA")
                )
            ),
            inputDescriptors = listOf(
                InputDescriptorV2(
                    id = "known-business-credential_1", // required unique id for the input descriptor
                    name = "Known Business Credential",
                    purpose = "Please present your Known Business Credential for verification.",
                    constraints = ConstraintsV2(
                        fields = listOf(
                            FieldV2(
                                path = listOf("$.credentialSchema.id"),
                                filterJson = objectMapper.readTree(
                                    """
                                    {
                                      "type": "string",
                                      "const": "https://vc.schemas.host/kbc.schema.json"
                                    }
                                    """.trimIndent()
                                ),
                            ),
                            FieldV2(
                                path = listOf("$.issuer"),
                                filterJson = objectMapper.readTree(
                                    """
                                    {
                                      "type": "string",
                                      "const":  "${pfiDid.uri}"
                                    }
                                    """.trimIndent()
                                )
                            )
                        )
                    )
                )
            )
        )
        // :snippet-end:

        try {
             // :snippet-start: kbcCreateOfferingKt
            val offering = Offering.create(
                from = pfiDid.uri,
                data = OfferingData(
                    description = "Selling BTC for USD",
                    payin = PayinDetails(
                        currencyCode = "USD",
                        max = "100.00",
                        methods = listOf(
                            PayinMethod(
                                description = "Pay in via Debit Card, Apple Pay, or CashApp Pay",
                                kind = "PAYMENT_LINK",
                                name = "Debit Card, ApplePay, CashApp Pay"
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
                    // highlight-next-line
                    requiredClaims = pd
                )
            )

            offering.sign(pfiDid)
            Validator.validate(Parser.parseResourceToJsonNode(offering.toString()), "resource")
            // :snippet-end:
        } catch (e: Exception) {
            Assertions.fail(e.message)
        }
    }

}