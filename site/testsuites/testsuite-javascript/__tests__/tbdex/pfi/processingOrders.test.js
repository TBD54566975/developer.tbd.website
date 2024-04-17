import { Order, OrderStatus, Close  } from '@tbdex/http-server';
import { DevTools } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';
import { MockDataProvider } from '../../utils/mockDataProvider';
import { test, expect, describe, beforeAll, assert } from 'vitest';

let pfiDid;
let senderDid;
let dataProvider;
let orderMessage;

describe('PFI: Orders', () => {
    beforeAll(async () => {
        // Set up providers and DID
        pfiDid = await DidDht.create({
            options:{
                publish: true,
                services: [{
                    id: 'pfi',
                    type: 'PFI',
                    serviceEndpoint: 'https://example.com/'
                }]
            }
        });

        senderDid = await DidDht.create({
            options: { publish: true }
        });

        dataProvider = new MockDataProvider();
        orderMessage = Order.create({
            metadata: {
                from: senderDid.uri,
                to: pfiDid.uri,
                exchangeId: "MyExchange"
            }
        });
    });

    test('PFI Accesses Private Data', async () => {
        const rfq = await DevTools.createRfq({
            sender: senderDid,
            receiver: pfiDid
        });
        
        // :snippet-start: pfiAccessPrivateDataJs
        const creditCardNumber = rfq.privateData.payin.paymentDetails.cardNumber
        // :snippet-end:

        expect(creditCardNumber).toBeDefined();
    });

    test('PFI Creates OrderStatus', async () => {
        // :snippet-start: pfiOrderStatusJs
        const orderStatus = OrderStatus.create({
            metadata: {
                from: pfiDid.uri,
                to: orderMessage.metadata.from,
                exchangeId: orderMessage.metadata.exchangeId
            },
            data: { orderStatus: 'PROCESSING' }
        })
        
        await orderStatus.sign(pfiDid)
        dataProvider.insert(orderStatus)
        // :snippet-end:

        expect.soft(orderStatus.data.orderStatus).toBe('PROCESSING');

        try {
            await orderStatus.verifySignature();
            await orderStatus.verify();
        } catch(e) {
            assert.fail(`Failed to verify offering requirements: : ${e.message}`);
        }
    });

    test('PFI Creates Close', async () => {
        // :snippet-start: pfiCloseOrderJs
        const closeMessage = Close.create({
            metadata: { 
                from: pfiDid.uri, 
                to: orderMessage.metadata.from, 
                exchangeId: orderMessage.metadata.exchangeId
            },
            data: { 
                reason: 'COMPLETED',
                success: true // Indicates the transaction was successful
            }
        })
        
        await closeMessage.sign(pfiDid)
        dataProvider.insert(closeMessage)
        // :snippet-end:

        expect.soft(closeMessage.data.reason).toBe('COMPLETED');

        try {
            await closeMessage.verifySignature();
            await closeMessage.verify();
        } catch(e) {
            assert.fail(`Failed to verify offering requirements: ${e.message}`);
        }
    });
});