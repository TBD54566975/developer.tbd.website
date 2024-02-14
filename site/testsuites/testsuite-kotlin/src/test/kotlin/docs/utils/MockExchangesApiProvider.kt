package website.tbd.developer.site.docs.utils

import website.tbd.developer.site.docs.utils.MockDataProvider
import tbdex.sdk.httpserver.models.*
import tbdex.sdk.protocol.models.*

open class MockExchangesApiProviderTest: ExchangesApi {
    private val dataProvider = MockDataProvider()

    //---------------------------------------------------------------------------//
    // Implementation of interface
    //---------------------------------------------------------------------------//

    override fun getExchanges(filter: GetExchangesFilter?): List<List<Message>> {
        return dataProvider.query("exchanges", filter)
    }

    override fun getExchange(id: String): List<Message> {
        return dataProvider.get("exchanges", id)
    }

    override fun getRfq(exchangeId: String): Rfq {
        return dataProvider.get("rfq", exchangeId)
    }

    override fun getQuote(exchangeId: String): Quote {
        return dataProvider.get("quote", exchangeId)
    }

    override fun getOrder(exchangeId: String): Order {
        return dataProvider.get("order", exchangeId)
    }

    override fun getOrderStatuses(exchangeId: String): List<OrderStatus> {
        return dataProvider.get("orderstatus", exchangeId)
    }

    override fun getClose(exchangeId: String): Close { {
        return dataProvider.get("close", exchangeId)
    }

    //---------------------------------------------------------------------------//
    // Setup Methods
    //---------------------------------------------------------------------------//

    fun setExchanges(filter: GetExchangesFilter?) {
        dataProvider.setupQuery("exchanges", filter) { return arrayOf() }
    }

    fun setExchange(id: String) {
        dataProvider.setupGet("exchanges", id) { return arrayOf() }
    }

    fun setRfq(
        exchangeId: String, 
        to: String,
        from: String,
        offeringId: TypeId = TypeId.generate(ResourceKind.offering.name),
        claims: List<String> = emptyList()) {
        dataProvider.setupGet("rfq", exchangeId) {
            return TestData.getRfq(
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
            return TestData.getQuote(
                to = to, 
                from = from)
        }
    }

    fun setOrder(
        exchangeId: String,
        to: String,
        from: String) {
        dataProvider.setupGet("order", exchangeId) {
            return TestData.getOrder(
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
            return TestData.getOrderStatus(
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
            return TestData.getClose(
                to = to, 
                from = from,
                closeData = closeData)
        }
    }

    fun setWrite() {
        dataProvider.setupInsert("exchange", "") { return arrayOf() }
    }
}