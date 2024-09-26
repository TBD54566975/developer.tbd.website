import { TbdexHttpServer } from '@tbdex/http-server';
import { TbdexHttpClient, Offering } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';
import { OfferingsApiProvider } from './offeringsApiProvider'
import { ExchangesApiProvider } from './exchangesApiProvider'
import { test, expect, describe, beforeAll, assert } from 'vitest';
import http from 'http';

let pfiDid;
let exchangesApiProvider;
let offeringsApiProvider;
let tbDexServer;
let customerDid;

describe('PFI: Structure', () => {
    beforeAll(async () => {

        //:snippet-start:pfiOverviewCreateDid
        pfiDid = await DidDht.create({
            options:{
                services: [{
                    id: 'pfi',
                    type: 'PFI',
                    serviceEndpoint: 'https://example.com'
                }]
            }
        });
        //:snippet-end:

        customerDid = await DidDht.create();
    });

    test('PFI initializes server', async () => {
        try {
            // :snippet-start: pfiOverviewConfigJs
            exchangesApiProvider = new ExchangesApiProvider();
            offeringsApiProvider = new OfferingsApiProvider(pfiDid);

            tbDexServer = new TbdexHttpServer({
                exchangesApi: exchangesApiProvider,
                offeringsApi: offeringsApiProvider,
                pfiDid: pfiDid.uri
            })
            // :snippet-end:

            expect(tbDexServer).toBeDefined()
            expect.soft(tbDexServer.exchangesApi).toBe(exchangesApiProvider)
            expect.soft(tbDexServer.offeringsApi).toBe(offeringsApiProvider)
            expect.soft(tbDexServer.pfiDid).toBe(pfiDid.uri)
        } catch(e) {
            assert.fail(`Failed to initialize server: ${e.message}`);
        }
    });

    test('PFI initializes routes', async () => {
        try {
            // :snippet-start: pfiOverviewServerRoutesJs
            tbDexServer.onCreateExchange(async (ctx, rfq, opts) => {
                await exchangesApiProvider.write({ message: rfq, replyTo: opts.replyTo })
            })

            tbDexServer.onSubmitOrder(async (ctx, order, opts) => {
                await exchangesApiProvider.write({ message: order, replyTo: opts.replyTo })
            })

            tbDexServer.onSubmitClose(async (ctx, close, opts) => {
                await exchangesApiProvider.write({ message: close, replyTo: opts.replyTo })
            })
            // :snippet-end:

            expect.soft(Object.keys(tbDexServer.callbacks).length).toBe(3)
            expect.soft(tbDexServer.callbacks.createExchange).toBeDefined()
            expect.soft(tbDexServer.callbacks.submitOrder).toBeDefined()
            expect.soft(tbDexServer.callbacks.submitClose).toBeDefined()
        } catch(e) {
            assert.fail(`Failed to set up submit routes: ${e.message}`);
        }
    });

    test('PFI starts server', async () => {
        try {
            // :snippet-start: pfiOverviewServerStartJs
            const server = tbDexServer.listen(8080, () => {})
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

            const requestToken = await TbdexHttpClient.generateRequestToken({
                requesterDid: customerDid, pfiDid: pfiDid
            });

            const options = {
                hostname: 'localhost',
                port: 8080,
                path: '/offerings',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer: ${requestToken}`
                }
              };
            // :snippet-start: pfiCreateQuickstartOfferingJs
            const offering = Offering.create({
              metadata: {
                  from: pfiDid.uri,
                  protocol: "1.0"
              },
              data: {
                description: "Exchange USD to KES",
                payin: {
                    currencyCode: "USD",
                    methods: [{
                      kind: "USD_LEDGER",
                      requiredPaymentDetails: {}
                    }]
                },
                payout: {
                    currencyCode: 'KES',
                    methods: [
                        {
                          kind: "MOMO_MPESA",
                          requiredPaymentDetails: {
                            $schema: "http://json-schema.org/draft-07/schema#",
                            title: "Mobile Money Required Payment Details",
                            type: "object",
                            required: [
                              "phoneNumber",
                              "reason"
                            ],
                            additionalProperties: false,
                            properties: {
                              phoneNumber: {
                                title: "Mobile money phone number",
                                description: "Phone number",
                                type: "string"
                              },
                              reason: {
                                title: "Reason for sending",
                                description: "Required for legal reasons",
                                type: "string"
                              }
                            }
                          },
                          estimatedSettlementTime: 10
                        },
                        {
                          kind: "BANK_FIRSTBANK",
                          requiredPaymentDetails: {
                            $schema: "http://json-schema.org/draft-07/schema#",
                            title: "Bank Transfer Required Payment Details",
                            type: "object",
                            required: [
                              "accountNumber",
                              "reason"
                          ],
                          additionalProperties: false,
                          properties: {
                            accountNumber: {
                              title: "Bank account number",
                              description: "Recepient bank account",
                              type: "string"
                            },
                            reason: {
                              title: "Reason for sending",
                              description: "Required for legal reasons",
                              type: "string"
                            }
                          }
                        },
                      estimatedSettlementTime: 10
                    }
                  ]
                },
                payoutUnitsPerPayinUnit: '0.0069',
                requiredClaims: {
                  "id": "7ce4004c-3c38-4853-968b-e411bafcd945",
                  "input_descriptors": [
                    {
                      "id": "bbdb9b7c-5754-4f46-b63b-590bada959e0",
                      "constraints": {
                        "fields": [
                          {
                            "path": [
                              "$.type[*]"
                            ],
                            "filter": {
                              "type": "string",
                              "pattern": "^SanctionCredential$"
                            }
                          },
                          {
                            "path": [
                              "$.issuer"
                            ],
                            "filter": {
                              "type": "string",
                              "const": "did:dht:bawc7n1sc4k89d8fyyayhjuk7dqmbtzt4pu58f8eam9fwq9qqp9y"
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              },
            });
            // :snippet-end:

            await offering.sign(pfiDid);

            offeringsApiProvider.setOfferings([offering]);

            await new Promise((resolve, reject) => {
                // Send the HTTP request
                const req = http.request(options, (res) => {
                    expect(res.statusCode).toBe(200);
                    resolve();
                });

                // Handle request errors
                req.on('error', (error) => {
                    assert.fail(`Failed to start server: ${error}`);
                });

                // End the request
                req.end();
            });
        } catch(e) {
            assert.fail(`Failed to start server: ${e.message}`);
        }
    });
});
