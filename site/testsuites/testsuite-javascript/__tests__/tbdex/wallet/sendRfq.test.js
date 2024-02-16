import { test, expect, describe, beforeAll, afterAll } from 'vitest';
import { TbdexHttpClient, DevTools, Rfq } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

let pfi;
let customerDid;
let server;
let selectedOffering;

describe('Wallet: Send RFQ', () => {

  beforeAll(async () => {
    customerDid = await DidDht.create({ 
      options: {
        publish: true 
      }
    })

    pfi = await DidDht.create({
      options:{
        publish  : true,
        services : [{
          type            : 'PFI',
          id              : 'pfi',
          serviceEndpoint : 'http://localhost:9000'
        }]
      }
    })

    selectedOffering = DevTools.createOffering({
      from: pfi.uri
    });
    await selectedOffering.sign(pfi)

    // Mock the response from the PFI
    server = setupServer(
      http.post(new RegExp('http://localhost:9000/exchanges/(.+)/rfq'), () => {
        return HttpResponse.json({
          status: 202
        })
      })
    )
    server.listen({onUnhandledRequest: 'bypass'})
  });

  afterAll(() => {
    server.resetHandlers()
    server.close()
  });

  test('skeleton RFQ: properties', async () => {
    try{
      // :snippet-start: skeletonRfqMessageJS
      const rfq = Rfq.create({
        metadata: {},
        data: {},
      });
      // :snippet-end:

    } catch (e) {
      //no assertions needed; this is just showing how to structure a RFQ
    }
  });

  test('skeleton RFQ: metadata', async () => {
    try{
      // :snippet-start: rfqMetadataJS
      const rfq = Rfq.create({
        //highlight-start
        metadata: {
          from: customerDid.uri, // Customer DID
          to: selectedOffering.metadata.from    // PFI's DID
        },
        //highlight-end
        data: {}
      });
      // :snippet-end:

    } catch (e) {
      //no assertions needed; this is just showing how to structure a RFQ
    }
  });

  test('create signed RFQ message and send to PFI', async () => {

    const BTC_ADDRESS = 'bc1q52csjdqa6cq5d2ntkkyz8wk7qh2qevy04dyyfd'
    const selectedCredentials = []

    // :snippet-start: createRfqMessageJS
    const rfq = Rfq.create({
      metadata: {
        from: customerDid.uri, // Customer DID
        to: selectedOffering.metadata.from // PFI's DID
      },
      //highlight-start
      data: {
        offeringId: selectedOffering.metadata.id,   // The ID of the selected offering
        payinAmount: '0.012',  // The amount of the payin currency
        payinMethod: {
          kind: 'BTC_WALLET_ADDRESS',   // The method of payment
          paymentDetails: {
            btcAddress: BTC_ADDRESS       // Customer's BTC wallet address
          }
        },
        payoutMethod: {
          kind: 'DEBIT_CARD',  // The method for receiving payout
          paymentDetails: {
            cvv: '123',
            cardNumber: '1234567890123456789',
            expiryDate: '05/25',
            cardHolderName: 'Alice Doe'
          }
        },
        claims: selectedCredentials  // Array of signed VCs required by the PFI
      }
      //highlight-end
    });
    // :snippet-end:

    // :snippet-start: signRfqMessageJS
    await rfq.sign(customerDid);
    // :snippet-end:

    try{
      // :snippet-start: sendRfqMessageJS
      await TbdexHttpClient.sendMessage({
        message: rfq,
        replyTo: 'https://example.com/callback'
      });
      // :snippet-end:
    }
    catch (e) {
      expect.fail(`Failed to send RFQ message to PFI: ${e.message}`)
     }
    expect(rfq.signature).toBeDefined();
  });
});