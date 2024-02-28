import { TbdexHttpServer } from '@tbdex/http-server';
import { DidDht } from '@web5/dids';
import { OfferingsApiProvider } from './offeringsApiProvider'
import { ExchangesApiProvider } from './exchangesApiProvider'
import { vi, test, expect, describe, beforeAll, assert } from 'vitest';

let pfiDid;
let exchangesApiProvider;
let offeringsApiProvider;
let tbDexServer;

describe('PFI: Structure', () => {
    beforeAll(async () => {
        pfiDid = await DidDht.create({
            options:{
                publish: true,
                services: [{
                    id: 'pfi',
                    type: 'PFI',
                    serviceEndpoint: 'https://example.com/'
                }]
            }
          })
    });

    test('PFI initializes server', async () => {
        try {
            // :snippet-start: pfiOverviewConfigJs
            exchangesApiProvider = new ExchangesApiProvider();
            offeringsApiProvider = new OfferingsApiProvider();

            tbDexServer = new TbdexHttpServer({ 
                exchangesApi: exchangesApiProvider, 
                offeringsApi: offeringsApiProvider,
                pfiDid: pfiDid.did 
            })
            // :snippet-end:
        } catch(e) {
            assert.fail(`Failed to initialize server: ${e.message}`);
        }
    });

    test('PFI initializes routes', async () => {
        try {
            // Queue up 3 "ok" responses for the writes
            exchangesApiProvider.setWrite("")
            exchangesApiProvider.setWrite("")
            exchangesApiProvider.setWrite("")

            // :snippet-start: pfiOverviewServerRoutesJs
            tbDexServer.onSubmitRfq(async (ctx, rfq) => {
                await exchangesApiProvider.write({ message: rfq})
            })

            tbDexServer.onSubmitOrder(async (ctx, order) => {
                await exchangesApiProvider.write({ message: order })
            })

            tbDexServer.onSubmitClose(async (ctx, close) => {
                await exchangesApiProvider.write({ message: close })
            })
            // :snippet-end:
        } catch(e) {
            assert.fail(`Failed to set up submit routes: ${e.message}`);
        }
    });

    test('PFI starts server', async () => {
        try {
            // :snippet-start: pfiOverviewServerStartJs
            const server = tbDexServer.listen(8080, () => {
                console.log(`PFI listening on port 8080`)
            })
            // :snippet-end:
        } catch(e) {
            assert.fail(`Failed to start server: ${e.message}`);
        }
    });
});
