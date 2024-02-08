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
import web5.sdk.dids.methods.jwk.DidJwk
import java.time.OffsetDateTime
import website.tbd.developer.site.docs.tbdex.*

class PfiQuotesTest {
  
  suspend fun createQuoteFromRfq(message: Message) {
    val offeringsApiProvider = OfferingsApiProviderTest()
    val exchangesApiProvider = ExchangesApiProviderTest()
    val pfiDid = DidJwk.create(InMemoryKeyManager())
    val dataProvider = MockDataProviderTest()

    // :snippet-start: pfiQuotesWriteKt
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
        to = message.metadata.to,
        from = message.metadata.from,
        exchangeId = message.metadata.exchangeId,
        quoteData = quoteData
    )
    // :snippet-end:

    // :snippet-start: pfiQuotesSignKt
    quote.sign(pfiDid)
    exchangesApiProvider.write(quote)
    // :snippet-end:
  }
}