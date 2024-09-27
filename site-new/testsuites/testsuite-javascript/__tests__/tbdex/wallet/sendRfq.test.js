import { test, expect, describe, beforeAll, afterAll } from 'vitest';
import { TbdexHttpClient, DevTools, Rfq, Offering } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

let pfiDid;
let customerDid;
let server;
let rfq;
let offering;
let selectedOffering;

describe('Wallet: Send RFQ', () => {

  beforeAll(async () => {
    customerDid = await DidDht.create({
      options: { publish: true }
    })

    pfiDid = await DidDht.create({
      options:{
        publish: true,
        services : [{
          type            : 'PFI',
          id              : 'pfi',
          serviceEndpoint : 'https://localhost:9000'
        }]
      }
    })

    // Offering with claims (non-replyTo test)
    selectedOffering = DevTools.createOffering({
      from: pfiDid.uri
    });
    await selectedOffering.sign(pfiDid)

    // Offering and RFQ (without claims) for replyTo tests
    offering = Offering.create({
      metadata: { from: pfiDid.uri },
      data: {
        id: '1234',
        description: 'A test offering',
        payin: {currencyCode: 'USD', methods: [{kind: 'DEBIT_CARD'}]},
        payout: {currencyCode: 'BTC', methods: [{kind: 'BTC_ADDRESS', estimatedSettlementTime: 60}]},
        payoutUnitsPerPayinUnit: '0.0001'
      }
    });
    await offering.sign(pfiDid)

    rfq = Rfq.create({
      metadata: {
        to: pfiDid.uri,
        from: customerDid.uri,
        protocol: '1.0'
      },
      data: {
        offeringId: offering.metadata.id,
        payin: {amount: '500.65', kind: 'DEBIT_CARD'},
        payout: {kind: 'BTC_ADDRESS'},
      }
    })
    await rfq.sign(customerDid)
  

    // Mock the response from the PFI
    server = setupServer(
      http.post(new RegExp('https://localhost:9000/exchanges'), () => {
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
          to: selectedOffering.metadata.from,  // PFI's DID
          from: customerDid.uri,               // Customer's DID
          protocol: '1.0'                      // Version of tbDEX protocol you're using
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
    const yoloCredential = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpqd2s6ZXlKamNuWWlPaUpGWkRJMU5URTVJaXdpYTNSNUlqb2lUMHRRSWl3aWVDSTZJalJ2WTE5eGRuVkZPVzEyUldkNFpXRmZlbVJYY1MxUlZVUlJRemswZWpGTlZVbFhaa1F6V1V4b2JVa2lMQ0pyYVdRaU9pSmtZazF3V25OT1ZHcE9ZbmQ2WW5OMFZXOVVTbU5aZFRKS1RIQkNhR2xCUnpRd1JYcDRORXRHVWsxbklpd2lZV3huSWpvaVJXUkVVMEVpZlEjMCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiWW9sb0NyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDo4YjBmNjA3Zi1mMTdlLTRjNDktODczNS02YzU2MmU2N2U1NDEiLCJpc3N1ZXIiOiJkaWQ6andrOmV5SmpjbllpT2lKRlpESTFOVEU1SWl3aWEzUjVJam9pVDB0UUlpd2llQ0k2SWpSdlkxOXhkblZGT1cxMlJXZDRaV0ZmZW1SWGNTMVJWVVJSUXprMGVqRk5WVWxYWmtReldVeG9iVWtpTENKcmFXUWlPaUprWWsxd1duTk9WR3BPWW5kNlluTjBWVzlVU21OWmRUSktUSEJDYUdsQlJ6UXdSWHA0TkV0R1VrMW5JaXdpWVd4bklqb2lSV1JFVTBFaWZRIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wNS0wMlQwNDoyNTo0NFoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpqd2s6ZXlKamNuWWlPaUpGWkRJMU5URTVJaXdpYTNSNUlqb2lUMHRRSWl3aWVDSTZJalJ2WTE5eGRuVkZPVzEyUldkNFpXRmZlbVJYY1MxUlZVUlJRemswZWpGTlZVbFhaa1F6V1V4b2JVa2lMQ0pyYVdRaU9pSmtZazF3V25OT1ZHcE9ZbmQ2WW5OMFZXOVVTbU5aZFRKS1RIQkNhR2xCUnpRd1JYcDRORXRHVWsxbklpd2lZV3huSWpvaVJXUkVVMEVpZlEiLCJiZWVwIjoiYm9vcCJ9fSwibmJmIjoxNzE0NjIzOTQ0LCJqdGkiOiJ1cm46dXVpZDo4YjBmNjA3Zi1mMTdlLTRjNDktODczNS02YzU2MmU2N2U1NDEiLCJpc3MiOiJkaWQ6andrOmV5SmpjbllpT2lKRlpESTFOVEU1SWl3aWEzUjVJam9pVDB0UUlpd2llQ0k2SWpSdlkxOXhkblZGT1cxMlJXZDRaV0ZmZW1SWGNTMVJWVVJSUXprMGVqRk5WVWxYWmtReldVeG9iVWtpTENKcmFXUWlPaUprWWsxd1duTk9WR3BPWW5kNlluTjBWVzlVU21OWmRUSktUSEJDYUdsQlJ6UXdSWHA0TkV0R1VrMW5JaXdpWVd4bklqb2lSV1JFVTBFaWZRIiwic3ViIjoiZGlkOmp3azpleUpqY25ZaU9pSkZaREkxTlRFNUlpd2lhM1I1SWpvaVQwdFFJaXdpZUNJNklqUnZZMTl4ZG5WRk9XMTJSV2Q0WldGZmVtUlhjUzFSVlVSUlF6azBlakZOVlVsWFprUXpXVXhvYlVraUxDSnJhV1FpT2lKa1lrMXdXbk5PVkdwT1luZDZZbk4wVlc5VVNtTlpkVEpLVEhCQ2FHbEJSelF3UlhwNE5FdEdVazFuSWl3aVlXeG5Jam9pUldSRVUwRWlmUSIsImlhdCI6MTcxNDYyMzk0NH0.CMZVBfNCq5aYgWmRcJVFN5fXiuPlgrwiGAsmYOZsFLHaRfqiA5gxqPDjBAQ1Ra7gK5X6_tZm5ue6kU6hN_7ZAA"
    const selectedCredentials = [yoloCredential] 

    // :snippet-start: createRfqMessageJS
    const rfq = Rfq.create({
      metadata: {
        to: selectedOffering.metadata.from, // PFI's DID
        from: customerDid.uri,              // Customer DID
        protocol: '1.0'                     // Version of tbDEX protocol you're using
      },
      //highlight-start
      data: {
        offeringId: selectedOffering.metadata.id,   // The ID of the selected offering
        payin: {
          kind: 'DEBIT_CARD',                       // The method of payment
          amount: '500.65',                         // The amount of the payin currency 
          paymentDetails: {
            cardNumber: '1234567890123456',
            expiryDate: '05/25',
            cardHolderName: 'Alice Doe',
            cvv: '123'
          }
        },
        payout: {
          kind: 'BTC_ADDRESS',                      // The method for receiving payout                         
          paymentDetails: {
            btcAddress: BTC_ADDRESS                 // Recipient's BTC wallet address
          }
        },
        claims: selectedCredentials  // Array of signed VCs required by the PFI
      }
      //highlight-end
    });
    // :snippet-end:

    expect(() => {
      // :snippet-start: verifyOfferingRequirementsJS
      try{
        rfq.verifyOfferingRequirements(selectedOffering);
      } catch (e) {
        // handle failed verification
      }
      // :snippet-end:
    }).not.toThrow();

    // :snippet-start: signRfqMessageJS
    await rfq.sign(customerDid);
    // :snippet-end:

    try{
      // :snippet-start: sendRfqMessageJS
      await TbdexHttpClient.createExchange(rfq);
      // :snippet-end:
    }
    catch (e) {
      expect.fail(`Failed to send RFQ message to PFI: ${e.message}`)
     }
    expect(rfq.signature).toBeDefined();
  });

  test('send RFQ message with URL as replyTo', async () => {
    try{
      // :snippet-start: rfqWithUrlReplyToJS
      await TbdexHttpClient.createExchange(
        rfq,
        //highlight-next-line
        { replyTo: 'https://example.com/callback' }
      );
      // :snippet-end:
    }
    catch (e) {
      expect.fail(`Failed to send RFQ with URL replyTo: ${e.message}`)
     }
  });

  test('send RFQ message with DID as replyTo', async () => {
    // :snippet-start: createDidWithTbdexServiceJS
    const walletDid = await DidDht.create({
      options: {
        publish: true,
        services: [
          {
            id: 'tbdex',
            //highlight-start
            type: 'tbdex',
            serviceEndpoint: 'https://example.com/callback'
            //highlight-end
          },
        ],
      },
    });
    // :snippet-end:

    try{
      // :snippet-start: rfqWithDidReplyToJS
      await TbdexHttpClient.createExchange(
        rfq,
        //highlight-next-line
        { replyTo: walletDid.uri }
      );
      // :snippet-end:
    }
    catch (e) {
      expect.fail(`Failed to send RFQ message with DID as replyTo: ${e.message}`)
     }
  });
});
