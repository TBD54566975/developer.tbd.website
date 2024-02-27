import { Order, OrderStatus, Close } from '@tbdex/http-server'
import { DidDht } from '@web5/dids';
import { MockDataProvider } from '../../utils/mockDataProvider'
import { vi, test, expect, describe, beforeAll } from 'vitest';

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
            options: {
                publish: true 
            }
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

        try {
            await orderStatus.verifySignature();
            await orderStatus.verify();
        } catch(e) {
            console.log(`Failed to verify offering requirements: ${e.message}`);
        }
 
 
    });

    test('PFI Creates Close', async () => {
        const consoleSpy = vi.spyOn(console, 'log');

        // :snippet-start: pfiCloseOrderJs
        const closeMessage = Close.create({
            metadata: { 
                from: pfiDid.uri, 
                to: orderMessage.metadata.from, 
                exchangeId: orderMessage.metadata.exchangeId
            },
            data: { reason: 'COMPLETED' }
        })
        await closeMessage.sign(pfiDid)
        dataProvider.insert(closeMessage)
        // :snippet-end:

        try {
            await closeMessage.verifySignature();
            await closeMessage.verify();
        } catch(e) {
            console.log(`Failed to verify offering requirements: ${e.message}`);
        }
 
 
    });
});