package docs.tbdex

import com.danubetech.verifiablecredentials.CredentialSubject
import de.fxlae.typeid.TypeId
import foundation.identity.did.Service
import tbdex.sdk.protocol.models.*
import tbdex.sdk.protocol.serialization.Json
import web5.sdk.credentials.VcDataModel
import web5.sdk.credentials.VerifiableCredential
import web5.sdk.credentials.model.ConstraintsV2
import web5.sdk.credentials.model.FieldV2
import web5.sdk.credentials.model.InputDescriptorV2
import web5.sdk.credentials.model.PresentationDefinitionV2
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.Did
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
import java.net.URI
import java.time.OffsetDateTime
import java.util.*

object TestData {
    const val ALICE = "alice"
    const val PFI = "pfi"
    private val aliceKeyManager = InMemoryKeyManager()
    val ALICE_DID: Did = DidDht.create(aliceKeyManager)

    val serviceToAdd = Service.builder()
        .id(URI("pfi"))
        .type("PFI")
        .serviceEndpoint("http://localhost:9000")
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

    fun getOffering(from: String = PFI_DID.uri, requiredClaims: PresentationDefinitionV2 = getPresentationDefinition()) =
        Offering.create(
            from = from,
            OfferingData(
                description = "A sample offering",
                payoutUnitsPerPayinUnit = "1",
                payinCurrency = CurrencyDetails("USD", "0.01", "100.00"),
                payoutCurrency = CurrencyDetails("KES"),
                payinMethods = listOf(
                    PaymentMethod(
                        kind = "BTC_ADDRESS",
                        requiredPaymentDetails = requiredPaymentDetailsSchema()
                    )
                ),
                payoutMethods = listOf(
                    PaymentMethod(
                        kind = "MOMO",
                        requiredPaymentDetails = requiredPaymentDetailsSchema()
                    )
                ),
                requiredClaims = requiredClaims
            )
        )

    fun getRfq(
        offeringId: TypeId = TypeId.generate(ResourceKind.offering.name),
        claims: List<String> = emptyList()
    ) = Rfq.create(
        to = PFI_DID.uri,
        from = ALICE_DID.uri,
        rfqData = RfqData(
            offeringId = offeringId,
            payinAmount = "10.00",
            payinMethod = SelectedPaymentMethod("BTC_ADDRESS", mapOf("address" to "123456")),
            payoutMethod = SelectedPaymentMethod(
                "MOMO", mapOf(
                    "phoneNumber" to "+254712345678",
                    "accountHolderName" to "Alfred Holder"
                )
            ),
            claims = claims
        )
    )

    fun getQuote() = Quote.create(
        ALICE_DID.uri, PFI_DID.uri, TypeId.generate(MessageKind.rfq.name),
        QuoteData(
            expiresAt = OffsetDateTime.now().plusDays(1),
            payin = QuoteDetails("AUD", "10.00", "0.01"),
            payout = QuoteDetails("BTC", "0.12", "0.02"),
        )
    )

    fun getClose() = Close.create(
        to = ALICE_DID.uri,
        from = PFI_DID.uri,
        exchangeId = TypeId.generate(MessageKind.rfq.name),
        closeData = CloseData("test reason")
    )

    fun getOrder() = Order.create(
        to = PFI_DID.uri,
        from = ALICE_DID.uri,
        exchangeId = TypeId.generate(MessageKind.rfq.name)
    )

    fun getOrderStatus() = OrderStatus.create(
        to = ALICE_DID.uri,
        from = PFI_DID.uri,
        exchangeId = TypeId.generate(MessageKind.rfq.name),
        orderStatusData = OrderStatusData("PENDING")
    )

    fun getOrderStatusWithInvalidDid(): OrderStatus {
        val os = OrderStatus.create(
            "alice", "pfi", TypeId.generate(MessageKind.rfq.name), OrderStatusData("PENDING")
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
