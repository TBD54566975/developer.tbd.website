package website.tbd.developer.site.docs.tbdex.pfi

import tbdex.sdk.protocol.models.Rfq
import tbdex.sdk.protocol.models.Quote
import de.fxlae.typeid.TypeId
import tbdex.sdk.httpserver.models.*
import java.util.NoSuchElementException
import tbdex.sdk.protocol.models.*
import tbdex.sdk.httpserver.TbdexHttpServer
import tbdex.sdk.httpserver.TbdexHttpServerConfig
import web5.sdk.crypto.AwsKeyManager
import web5.sdk.dids.methods.dht.DidDht
import tbdex.sdk.httpserver.models.SubmitKind
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.Did
import java.time.OffsetDateTime
import website.tbd.developer.site.docs.tbdex.pfi.*
import website.tbd.developer.site.docs.utils.*
import foundation.identity.did.Service
import java.net.URI
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.*

class CreatingQuotesTest {

    private lateinit var offeringsApiProvider: OfferingsApiProvider
    private lateinit var exchangesApiProvider: ExchangesApiProvider
    private lateinit var dataProvider: MockDataProvider
    private lateinit var pfiDid: DidDht
    private lateinit var message: Message

    @BeforeEach
    fun setup() {
        offeringsApiProvider = OfferingsApiProvider()
        exchangesApiProvider = ExchangesApiProvider()
        dataProvider = MockDataProvider()

        val serviceToAdd = Service.builder()
            .id(URI("pfi"))
            .type("PFI")
            .serviceEndpoint("https://example.com/")
            .build()

        val options = CreateDidDhtOptions(
            publish = true,
            services = listOf(serviceToAdd),
        )

        pfiDid = DidDht.create(InMemoryKeyManager(), options)

        message = TestData.getRfq(to = pfiDid.uri)
    }

    @Test
    fun `PFI verifies offering requirements and should not throw an error`() {
        dataProvider.setupInsert("exchange", "") { arrayOf<Any>() }
        offeringsApiProvider.setOffering(message.metadata.id, pfiDid.uri)

        // :snippet-start: pfiCreateOfferingKt
        // Write the message to your exchanges database
        val data = mapOf(
            "exchangeid" to message.metadata.exchangeId,
            "messagekind" to message.metadata.kind,
            "messageid" to message.metadata.id,
            "subject" to message.metadata.from,
            "message" to message.data
        )

        dataProvider.insert("exchange", data)
        //highlight-start
        val offering = offeringsApiProvider.getOffering(message.metadata.id.toString())
        //highlight-end
        // :snippet-end:

        // :snippet-start: pfiRfqVerifyOfferingRequirementsKt
        if (offering is Offering && message is Rfq) {
            try {
                val rfq = message as Rfq
                rfq.verifyOfferingRequirements(offering)
            } catch (e: Exception) {
                println("Failed to verify offering requirements: ${e.message}")
            }
        }
        // :snippet-end:
    }

    @Test
    fun `PFI creates and signs quote`() {
        // :snippet-start: pfiCreateQuoteKt
        val quote = Quote.create(
            to = message.metadata.from,
            from = pfiDid.uri,
            exchangeId = message.metadata.exchangeId,
            quoteData = QuoteData(
                expiresAt = OffsetDateTime.now().plusDays(10),
                payin = QuoteDetails(
                    currencyCode = "BTC", 
                    amount = "1000.0",
                    paymentInstruction = PaymentInstruction(
                        link = "https://example.com/paymentInstructions",
                        instruction = "Detailed payout instructions"
                    )
                ),
                payout = QuoteDetails(
                    currencyCode = "KES", 
                    amount = "123456789.0",
                    paymentInstruction = PaymentInstruction(
                        link = "https://example.com/paymentInstructions",
                        instruction = "Detailed payout instructions"
                    )
                )
            )
        )
        // :snippet-end:

        exchangesApiProvider.setWrite()

        // :snippet-start: pfiSignQuoteKt
        quote.sign(pfiDid)
        exchangesApiProvider.write(quote)
        // :snippet-end:

        assertNotNull(quote.verify(), "Quote signature is invalid")
    }
}