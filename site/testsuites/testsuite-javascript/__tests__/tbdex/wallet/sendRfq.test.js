import { vi, test, expect, describe, beforeAll, afterAll } from 'vitest';
import { TbdexHttpClient, DevTools } from '@tbdex/http-client';
import { DidDhtMethod, DidKeyMethod } from '@web5/dids';
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'

let pfi;
let pfiDid; //The URI of the PFI's DID
let customer;
let server;
let selectedOffering;

describe('Send RFQ to PFI', () => {

  beforeAll(async () => {
    customer = await DidKeyMethod.create({ publish: true })

    pfi = await DidDhtMethod.create({
        publish  : true,
        services : [{
          type            : 'PFI',
          id              : 'pfi',
          serviceEndpoint : 'https://localhost:9000'
        }]
    })
    pfiDid = pfi.did  

    // Mock the response from the PFI
    selectedOffering = DevTools.createOffering({
      from: pfiDid
    });  
    await mockOffering.sign(pfi)

    server = setupServer(
      http.get(`https://localhost:9000/offerings?id:${mockOffering.id}`, () => {
        return HttpResponse.json(
          { data: [mockOffering] }, 
          { status: 200 }
        )
      }),
    )
    server.listen({onUnhandledRequest: 'bypass'})
  });

  afterAll(() => {
    server.resetHandlers()
    server.close()
  }); 
  
  test('send RFQ message to PFI', async () => {

    const BTC_ADDRESS = 'bc1q52csjdqa6cq5d2ntkkyz8wk7qh2qevy04dyyfd'
    const selectedCredentials = []

    // :snippet-start: createRfqMessageJS
    const rfq = Rfq.create({
      metadata: {
        from: customer.did, // Customer DID
        to: selectedOffering.metadata.from // PFI's DID
      },
      data: {
        offeringId: selectedOffering.metadata.id,   // The ID of the selected offering
        payinSubunits: '0.012',  // The amount of the payin currency
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
    });
    // :snippet-end:

    // :snippet-start: signRfqMessageJS
    await rfq.sign(customer); 
    // :snippet-end:
    expect(rfq).toHaveProperty('signature');

    // :snippet-start: sendRfqMessageJS
    const rfqResponse = await TbdexHttpClient.sendMessage({
      message: rfq,
      replyTo: 'https://example.com/callback'
    });
    // :snippet-end:
    expect(rfqResponse).toHaveProperty('status', '202');
  });
});