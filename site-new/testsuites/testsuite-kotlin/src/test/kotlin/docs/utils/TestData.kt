package website.tbd.developer.site.docs.utils

import com.danubetech.verifiablecredentials.CredentialSubject
import de.fxlae.typeid.TypeId
import web5.sdk.dids.didcore.Service
import tbdex.sdk.protocol.models.*
import tbdex.sdk.protocol.serialization.Json
import web5.sdk.credentials.VcDataModel
import web5.sdk.credentials.VerifiableCredential
import web5.sdk.credentials.model.ConstraintsV2
import web5.sdk.credentials.model.FieldV2
import web5.sdk.credentials.model.InputDescriptorV2
import web5.sdk.credentials.model.PresentationDefinitionV2
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.did.BearerDid
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
import java.net.URI
import java.time.OffsetDateTime
import java.time.OffsetDateTime.*
import java.util.*

object TestData {
    const val ALICE = "alice"
    const val PFI = "pfi"
    private val aliceKeyManager = InMemoryKeyManager()
    val ALICE_DID: BearerDid = DidDht.create(aliceKeyManager)

    val serviceToAdd = Service.Builder()
        .id("pfi")
        .type("PFI")
        .serviceEndpoint(listOf("http://localhost:9000"))
        .build()

    val options = CreateDidDhtOptions(
        publish = true,
        services = listOf(serviceToAdd),
    )

    val PFI_DID = DidDht.create(InMemoryKeyManager(), options)

    fun getPresentationDefinition(): PresentationDefinitionV2 {
        return buildPresentationDefinition(
            inputDescriptors = listOf(
                buildInputDescriptor(fields = listOf(buildField(paths = arrayOf("$.credentialSubject.btcAddress"))))
            )
        )
    }

    fun getVC(): VerifiableCredential {
        val credentialSubject = CredentialSubject.builder()
            .id(URI.create(ALICE_DID.uri))
            .claims(mutableMapOf<String, Any>().apply { this["btcAddress"] = "btcAddress123" })
            .build()

        val vc = VcDataModel.builder()
            .id(URI.create(UUID.randomUUID().toString()))
            .credentialSubject(credentialSubject)
            .issuer(URI.create(ALICE_DID.uri))
            .issuanceDate(Date())
            .build()

        return VerifiableCredential.create("test type", ALICE_DID.uri, ALICE_DID.uri, vc)
    }

    fun getOffering(
        from: String = PFI_DID.uri,
        requiredClaims: PresentationDefinitionV2 = getPresentationDefinition()
    ) = Offering.create(
            from = from,
            OfferingData(
                description = "A sample offering",
                payoutUnitsPerPayinUnit = "1",
                payin = PayinDetails("USD", "0.01", "100.00", listOf(PayinMethod(
                  kind = "BANK_ACCOUNT",
                  requiredPaymentDetails = requiredPaymentDetailsSchema()
                ))),
                payout = PayoutDetails(
                    currencyCode = "KES",
                    methods =  listOf(PayoutMethod(
                        kind = "MOMO",
                        requiredPaymentDetails = requiredPaymentDetailsSchema(),
                        estimatedSettlementTime = 3600
                      )
                    )
                ),
                requiredClaims = requiredClaims
            )
        )

  fun getOfferingWithNoClaims(
    from: String = PFI_DID.uri
  ) = Offering.create(
    from = from,
    OfferingData(
      description = "A sample offering",
      payoutUnitsPerPayinUnit = "1",
      payin = PayinDetails("USD", "0.01", "100.00", listOf(PayinMethod(
        kind = "DEBIT_CARD",
        requiredPaymentDetails = requiredPaymentDetailsSchema()
      ))),
      payout = PayoutDetails(
        currencyCode = "BTC",
        methods =  listOf(PayoutMethod(
          kind = "BTC_ADDRESS",
          requiredPaymentDetails = requiredPaymentDetailsSchema(),
          estimatedSettlementTime = 3600
        )
        )
      ),
      requiredClaims = null
    )
  )


  fun getRfq(
        to: String = PFI_DID.uri,
        from: String = ALICE_DID.uri,
        offeringId: TypeId = TypeId.generate(ResourceKind.offering.name),
        claims: List<String> = emptyList()
    ) = Rfq.create(
        to = PFI_DID.uri,
        from = ALICE_DID.uri,
        rfqData = CreateRfqData(
            offeringId = offeringId.toString(),
            payin = CreateSelectedPayinMethod(
              kind = "BANK_ACCOUNT",
              paymentDetails = mapOf(
                "address" to "123456",
                "cardNumber" to "1234567890123456"
              ),
              amount = "10.00"
            ),
            payout = CreateSelectedPayoutMethod(
             kind = "MOMO",
             paymentDetails = mapOf(
               "phoneNumber" to "254712345678",
               "accountHolderName" to "Alfred Holder"
             )
            ),
            claims = claims
        )
    )

    fun getQuote(
        to: String = ALICE_DID.uri,
        from: String = PFI_DID.uri) = Quote.create(
        ALICE_DID.uri, PFI_DID.uri, TypeId.generate(MessageKind.rfq.name).toString(),
        QuoteData(
            expiresAt = now().plusDays(1),
            payin = QuoteDetails("USD", "10.00", "0.01"),
            payout = QuoteDetails("KES", "0.12", "0.02"),
        )
    )

    fun getClose(
        to: String = ALICE_DID.uri,
        from: String = PFI_DID.uri,
        closeData: String = "test reason"
    ) = Close.create(
        to = ALICE_DID.uri,
        from = PFI_DID.uri,
        exchangeId = TypeId.generate(MessageKind.rfq.name).toString(),
        closeData = CloseData(closeData, true)
    )

    fun getOrder(
        to: String = PFI_DID.uri,
        from: String = ALICE_DID.uri) = Order.create(
        to = PFI_DID.uri,
        from = ALICE_DID.uri,
        exchangeId = TypeId.generate(MessageKind.rfq.name).toString()
    )

    fun getOrderStatus(
        to: String = ALICE_DID.uri,
        from: String = PFI_DID.uri,
        orderStatus: String = "PENDING"
    ) = OrderStatus.create(
        to = ALICE_DID.uri,
        from = PFI_DID.uri,
        exchangeId = TypeId.generate(MessageKind.rfq.name).toString(),
        orderStatusData = OrderStatusData(orderStatus)
    )

    fun getOrderStatusWithInvalidDid(): OrderStatus {
        val os = OrderStatus.create(
            ALICE, PFI, TypeId.generate(MessageKind.rfq.name).toString(), OrderStatusData("PENDING")
        )

        os.sign(ALICE_DID)
        return os
    }

    private fun buildField(id: String? = null, vararg paths: String): FieldV2 {
        return FieldV2(id = id, path = paths.toList())
    }

    private fun buildPresentationDefinition(
        id: String = "test-pd-id",
        name: String = "simple PD",
        purpose: String = "pd for testing",
        inputDescriptors: List<InputDescriptorV2> = listOf()
    ): PresentationDefinitionV2 {
        return PresentationDefinitionV2(
            id = id,
            name = name,
            purpose = purpose,
            inputDescriptors = inputDescriptors
        )
    }

    private fun buildInputDescriptor(
        id: String = "whatever",
        purpose: String = "id for testing",
        fields: List<FieldV2> = listOf()
    ): InputDescriptorV2 {
        return InputDescriptorV2(
            id = id,
            purpose = purpose,
            constraints = ConstraintsV2(fields = fields)
        )
    }

    private fun requiredPaymentDetailsSchema() = Json.jsonMapper.readTree(
        """
    {
      "${'$'}schema": "http://json-schema.org/draft-07/schema",
      "additionalProperties": false,
      "type": "object",
      "properties": {
        "phoneNumber": {
          "minLength": 12,
          "pattern": "^+2547[0-9]{8}${'$'}",
          "description": "Mobile Money account number of the Recipient",
          "type": "string",
          "title": "Phone Number",
          "maxLength": 12
        },
        "accountHolderName": {
          "pattern": "^[A-Za-zs'-]+${'$'}",
          "description": "Name of the account holder as it appears on the Mobile Money account",
          "type": "string",
          "title": "Account Holder Name",
          "maxLength": 32
        }
      },
      "required": [
        "accountNumber",
        "accountHolderName"
      ]
    }
  """.trimIndent()
    )
}
