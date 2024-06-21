package website.tbd.developer.site.docs.utils

import tbdex.sdk.httpserver.models.*
import tbdex.sdk.protocol.models.*
import de.fxlae.typeid.TypeId

open class MockExchangesApiProvider: ExchangesApi {
    val dataProvider = MockDataProvider()

    //---------------------------------------------------------------------------//
    // Implementation of interface
    //---------------------------------------------------------------------------//

    override fun getExchanges(filter: GetExchangesFilter?): List<List<Message>> {
        val messages = mutableListOf<List<Message>>()
        val exchangeIds = filter?.exchangeIds ?: listOf<String>()
        for (exchange in exchangeIds) {
            val exchange = dataProvider.query("exchanges", exchange) as List<Message> ?: listOf<Message>()
            messages.toMutableList().apply { set(0, exchange) }
        }
        return messages
    }

    override fun getExchange(id: String, requesterDid: String): List<Message> {
        return dataProvider.get("exchanges", id) as? List<Message> ?: emptyList()
    }

    override fun getRfq(exchangeId: String): Rfq {
        return dataProvider.get("rfq", exchangeId) as Rfq ?: TestData.getRfq()
    }

    override fun getQuote(exchangeId: String): Quote {
        return dataProvider.get("quote", exchangeId) as? Quote ?: TestData.getQuote()
    }

    override fun getOrder(exchangeId: String): Order {
        return dataProvider.get("order", exchangeId) as? Order ?: TestData.getOrder()
    }

    override fun getOrderStatuses(exchangeId: String): List<OrderStatus> {
        return dataProvider.query("orderstatus", exchangeId) as? List<OrderStatus> ?: listOf(TestData.getOrderStatus())
    }

    override fun getClose(exchangeId: String): Close {
        return dataProvider.get("close", exchangeId) as? Close ?: TestData.getClose()
    }

    //---------------------------------------------------------------------------//
    // Setup Methods
    //---------------------------------------------------------------------------//

    fun setExchanges(filter: GetExchangesFilter?) {
        dataProvider.setupQuery("exchanges", filter) { listOf(listOf<Message>()) }
    }

    fun setExchange(id: String) {
        dataProvider.setupGet("exchanges", id) { listOf<Message>() }
    }

    fun setRfq(
        exchangeId: String,
        to: String,
        from: String,
        offeringId: TypeId = TypeId.generate(ResourceKind.offering.name),
        claims: List<String> = emptyList()) {
        dataProvider.setupGet("rfq", exchangeId) {
            TestData.getRfq(
                to = to,
                from = from,
                offeringId = offeringId,
                claims = claims)
        }
    }

    fun setQuote(
        exchangeId: String,
        to: String,
        from: String) {
        dataProvider.setupGet("quote", exchangeId) {
            TestData.getQuote(
                to = to,
                from = from)
        }
    }

    fun setOrder(
        exchangeId: String,
        to: String,
        from: String) {
        dataProvider.setupGet("order", exchangeId) {
            TestData.getOrder(
                to = to,
                from = from)
        }
    }

    fun setOrderStatus(
        exchangeId: String,
        to: String,
        from: String,
        orderStatus: String
    ) {
        dataProvider.setupGet("orderstatus", exchangeId) {
            TestData.getOrderStatus(
                to = to,
                from = from,
                orderStatus = orderStatus)
        }
    }

    fun setClose(
        exchangeId: String,
        to: String,
        from: String,
        closeData: String
    ) {
        dataProvider.setupGet("close", exchangeId) {
            TestData.getClose(
                to = to,
                from = from,
                closeData = closeData)
        }
    }

    fun setWrite() {
        dataProvider.setupInsert("exchange", "") { listOf<Any?>() }
    }
}
