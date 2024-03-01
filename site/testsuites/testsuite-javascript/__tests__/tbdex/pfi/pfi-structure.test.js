import { TbdexHttpServer } from '@tbdex/http-server';
import { TbdexHttpClient } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';
import { OfferingsApiProvider } from './offeringsApiProvider'
import { ExchangesApiProvider } from './exchangesApiProvider'
import { vi, test, expect, describe, beforeAll, assert } from 'vitest';
import http from 'http';

let pfiDid;
let exchangesApiProvider;
let offeringsApiProvider;
let tbDexServer;
let customerDid;

describe('PFI: Structure', () => {
    beforeAll(async () => {
        pfiDid = await DidDht.create({
            options:{
                services: [{
                    id: 'pfi',
                    type: 'PFI',
                    serviceEndpoint: 'https://example.com/'
                }]
            }
          })

        customerDid = await DidDht.create();
    });

    test('PFI initializes server', async () => {
        try {
            // :snippet-start: pfiOverviewConfigJs
            exchangesApiProvider = new ExchangesApiProvider();
            offeringsApiProvider = new OfferingsApiProvider();

            tbDexServer = new TbdexHttpServer({ 
                exchangesApi: exchangesApiProvider, 
                offeringsApi: offeringsApiProvider,
                pfiDid: pfiDid.uri 
            })
            // :snippet-end:

            assert(tbDexServer != null, "Failed to initialize server")
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

            assert(tbDexServer.callbacks != null, "Did not correctly set callbacks")
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

            // Wait for the server to start listening
            await new Promise((resolve, reject) => {
                server.on('listening', () => {
                    resolve();
                });

                server.on('error', (error) => {
                    assert.fail(`Failed to start server: ${error}`)
                });
            });

            const requestToken = await TbdexHttpClient.generateRequestToken({ requesterDid: customerDid, pfiDid: pfiDid });

            const options = {
                hostname: 'localhost',
                port: 8080,
                path: '/exchanges',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer: ${requestToken}`
                }
              };
            
            await new Promise((resolve, reject) => {
                // Send the HTTP request
                const req = http.request(options, (res) => {
                    // Check if the response status code indicates success (2xx range)
                    if (res.statusCode > 200 && res.statusCode >= 400) {
                        assert.fail("Failed to start server");
                    }
                    resolve();
                });

                // Handle request errors
                req.on('error', (error) => {
                    assert.fail("Failed to start server");
                });

                // End the request
                req.end();
            });

        } catch(e) {
            assert.fail(`Failed to start server: ${e.message}`);
        }
    });
});
