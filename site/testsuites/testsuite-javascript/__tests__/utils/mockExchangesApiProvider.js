import { Close, OrderStatus, Quote } from '@tbdex/protocol'
import { DevTools } from '@tbdex/http-client';
import { MockDataProvider } from './mockDataProvider'

export class MockExchangesApiProvider {

    constructor() {
        this.dataProvider = new MockDataProvider()
    }

    //---------------------------------------------------------------------------//
    // Implementation of interface
    //---------------------------------------------------------------------------//

    async getExchanges(filter) {
        return await this.dataProvider.query("exchanges", filter)
    }

    async getExchange(id) {
        return await this.dataProvider.get("exchanges", id)
    }

    async getRfq(exchangeId) {
        return await this.dataProvider.get("rfq", exchangeId)
    }

    async getQuote(exchangeId) {
        return await this.dataProvider.get("quote", exchangeId)
    }

    async getOrder(exchangeId) {
        return await this.dataProvider.get("order", exchangeId)
    }

    async getOrderStatuses(exchangeId) {
        return await this.dataProvider.get("orderstatus", exchangeId)
    }

    async getClose(exchangeId) {
        return await this.dataProvider.get("close", exchangeId)
    }  

    //---------------------------------------------------------------------------//
    // Setup Methods
    //---------------------------------------------------------------------------//

    setExchanges(filter) {
        this.dataProvider.setupQuery("exchanges", filter, () => {
            
        })
    }

    setExchange(id) {
        this.dataProvider.setupGet("exchanges", id, () => {

        })
    }

    setRfq(exchangeId, messageOptions) {
        this.dataProvider.setupGet("rfq", exchangeId, () => {
            return DevTools.createRfq(messageOptions)
        })
    }

    setQuote(exchangeId, metadata) {
        this.dataProvider.setupGet("quote", exchangeId, () => {
            let quoteData = DevTools.createQuoteData()
            return Quote.create({
                metadata: metadata,
                data: quoteData
            })
        })
    }

    setOrder(exchangeId, messageOptions) {
        this.dataProvider.setupGet("order", exchangeId, () => {
            return DevTools.createOrder(messageOptions)
        })
    }

    setOrderStatus(exchangeId, status,  metadata) {
        this.dataProvider.setupGet("orderstatus", exchangeId, () => {
            return OrderStatus.create({
                data: { orderStatus: status },
                metadata: metadata
            })
        })
    }

    setClose(exchangeId, data) {
        this.dataProvider.setupGet("close", exchangeId, () => {
            return Close.create(data)
        })
    }

    setWrite() {
        this.dataProvider.setupInsert("exchange", "", () => {
            return
        })
    }  
};