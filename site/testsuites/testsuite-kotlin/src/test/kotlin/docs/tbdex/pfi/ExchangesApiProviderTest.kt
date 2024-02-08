package website.tbd.developer.site.docs.tbdex

import tbdex.sdk.httpserver.models.*
import tbdex.sdk.protocol.models.*

class ExchangesApiProviderTest : ExchangesApi {

    private val fakeExchangesApi = FakeExchangesApi()

    override fun getClose(exchangeId: String): Close {
        return fakeExchangesApi.getClose(exchangeId)
    }

    override fun getExchange(id: String): List<Message> {
        return fakeExchangesApi.getExchange(id)
    }

    override fun getExchanges(filter: GetExchangesFilter?): List<List<Message>> {
        return fakeExchangesApi.getExchanges(filter) ?: emptyList()
    }

    override fun getOrder(exchangeId: String): Order {
        return fakeExchangesApi.getOrder(exchangeId)
    }

    override fun getOrderStatuses(exchangeId: String): List<OrderStatus> {
        return fakeExchangesApi.getOrderStatuses(exchangeId)
    }

    override fun getQuote(exchangeId: String): Quote {
        return fakeExchangesApi.getQuote(exchangeId)
    }

    override fun getRfq(exchangeId: String): Rfq {
        return fakeExchangesApi.getRfq(exchangeId)
    }

    // :snippet-start: pfiOverviewWriteKt
    fun write(message: Message) {
        val data = mapOf(
            "exchangeid" to message.metadata.exchangeId,
            "messagekind" to message.metadata.kind,
            "messageid" to message.metadata.id,
            "subject" to message.metadata.from,
            "message" to message.data
        )
        dataProvider.insert("exchange", data)
    }
    // :snippet-end:
}