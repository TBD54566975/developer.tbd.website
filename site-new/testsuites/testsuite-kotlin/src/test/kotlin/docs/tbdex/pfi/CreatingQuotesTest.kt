package website.tbd.developer.site.docs.tbdex.pfi

import tbdex.sdk.protocol.models.Rfq
import tbdex.sdk.protocol.models.Quote
import tbdex.sdk.protocol.models.*
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.did.BearerDid
import java.time.OffsetDateTime
import website.tbd.developer.site.docs.utils.*
import web5.sdk.dids.didcore.Service
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.*
import java.time.OffsetDateTime.*

class CreatingQuotesTest {

    private lateinit var offeringsApiProvider: OfferingsApiProvider
    private lateinit var exchangesApiProvider: ExchangesApiProvider
    private lateinit var dataProvider: MockDataProvider
    private lateinit var pfiDid: BearerDid
    private lateinit var message: Message

    @BeforeEach
    fun setup() {
        offeringsApiProvider = OfferingsApiProvider()
        exchangesApiProvider = ExchangesApiProvider()
        dataProvider = MockDataProvider()

        val serviceToAdd = Service.Builder()
            .id("pfi")
            .type("PFI")
            .serviceEndpoint(listOf("https://example.com/"))
            .build()

        val options = CreateDidDhtOptions(
            publish = true,
            services = listOf(serviceToAdd),
        )

        pfiDid = DidDht.create(InMemoryKeyManager(), options)

        message = TestData.getRfq(to = pfiDid.uri)
    }

    @Test
    fun `PFI creates and signs quote`() {
        dataProvider.setupInsert("exchange", "") { arrayOf<Any>() }
        offeringsApiProvider.setOffering(message.metadata.id, pfiDid)

        // :snippet-start: pfiWriteOfferingKt
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
        val offering = offeringsApiProvider.getOffering(message.metadata.id)
        //highlight-end
        // :snippet-end:

        // :snippet-start: pfiCreateQuoteKt
        val quote = Quote.create(
            to = message.metadata.from,
            from = pfiDid.uri,
            exchangeId = message.metadata.exchangeId,
            protocol = "1.0",
            quoteData = QuoteData(
                expiresAt = now().plusDays(10),
                payin = QuoteDetails(
                    currencyCode = offering.data.payin.currencyCode,
                    amount = "250",
                    fee = "0.001",
                    paymentInstruction = PaymentInstruction(
                        link = "https://example.com/paymentInstructions",
                        instruction = "Detailed payout instructions"
                    )
                ),
                payout = QuoteDetails(
                    currencyCode = offering.data.payout.currencyCode,
                    amount = "1248.22",
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
