import { Request, Response } from 'express'
import { Close, Message, Offering, Order, OrderStatus, Quote, Rfq } from '@tbdex/protocol'
import { ErrorDetail } from '@tbdex/http-client'
import { TbdexHttpClient, DevTools } from '@tbdex/http-client';
import { MockDataProvider } from './utils/mockdataprovider'

export class ExchangesApiProvider {

    constructor() {
        this.dataProvider = MockDataProvider()
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

    setQuote(exchangeId, messageOptions) {
        this.dataProvider.setupGet("quote", exchangeId, () => {
            return DevTools.createRfq(messageOptions)
        })
    }

    setOrder(exchangeId, messageOptions) {
        this.dataProvider.setupGet("order", exchangeId, () => {
            return DevTools.createRfq(messageOptions)
        })
    }

    setOrderStatuses(exchangeId, messageOptions) {
        this.dataProvider.setupGet("orderstatus", exchangeId, () => {
            return DevTools.createRfq(messageOptions)
        })
    }

    setClose(exchangeId, messageOptions) {
        this.dataProvider.setupGet("close", exchangeId, () => {
            return DevTools.createRfq(messageOptions)
        })
    }

    setWrite() {
        this.dataProvider.insert("exchange", "", () => {
            return
        })
    }

    //---------------------------------------------------------------------------//
    // Other methods
    //---------------------------------------------------------------------------//
    
    // :snippet-start: pfiOverviewWriteJs
    async write(message) {
        await this.dataProvider.insert('exchange', {
                exchangeid: message.exchangeId,
                messagekind: message.kind,
                messageid: message.id,
                subject: message.subject,
                message: JSON.stringify(message)
            });
    }  
    // :snippet-end:
  
  };