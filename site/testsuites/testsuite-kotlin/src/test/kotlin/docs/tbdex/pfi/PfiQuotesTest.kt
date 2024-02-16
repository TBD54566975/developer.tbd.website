package website.tbd.developer.site.docs.tbdex

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

class PfiQuotesTest {
  
    fun createQuoteFromRfq() {
        val offeringsApiProvider = OfferingsApiProvider()
        val exchangesApiProvider = ExchangesApiProvider()
        val dataProvider = MockDataProvider()

        val serviceToAdd = Service.builder()
            .id(URI("pfi"))
            .type("PFI")
            .serviceEndpoint("tbdex-pfi.tbddev.org")
            .build()

        val options = CreateDidDhtOptions(
            publish = true,
            services = listOf(serviceToAdd),
        )

        val pfiDid = DidDht.create(InMemoryKeyManager(), options)

        val message: Message = TestData.getRfq(
            to = pfiDid.uri
        )

        dataProvider.setupInsert("exchange", "") { arrayOf<Any>() }
        offeringsApiProvider.setOffering(message.metadata.id.toString(), pfiDid.uri)

        // :snippet-start: pfiQuotesWriteKt
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

        // :snippet-start: pfiQuotesProcessKt
        if (offering is Offering && message is Rfq) {
            try {
                val rfq = message as Rfq
                rfq.verifyOfferingRequirements(offering)
            } catch (e: Exception) {
                println("Failed to verify offering requirements: ${e.message}")
            }
        }
        // :snippet-end:

        // :snippet-start: pfiQuotesSendKt
        val quoteData = QuoteData(
            expiresAt = OffsetDateTime.now().plusDays(10),
            payin = QuoteDetails("BTC", "1000"),
            payout = QuoteDetails("KES", "123456789")
        )

        val quote = Quote.create(
            to = message.metadata.from,
            from = pfiDid.uri,
            exchangeId = message.metadata.exchangeId,
            quoteData = quoteData
        )
        // :snippet-end:

        exchangesApiProvider.setWrite()

        // :snippet-start: pfiQuotesSignKt
        quote.sign(pfiDid)
        exchangesApiProvider.write(quote)
        // :snippet-end:
    }
}