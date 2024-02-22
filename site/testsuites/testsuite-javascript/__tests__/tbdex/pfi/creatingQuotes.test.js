import { Rfq, Quote } from '@tbdex/http-server';
import { DevTools } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';
import { OfferingsApiProvider } from './offeringsApiProvider'
import { ExchangesApiProvider } from './exchangesApiProvider'
import { MockDataProvider } from '../../utils/mockDataProvider'
import { test, expect, describe, beforeAll } from 'vitest';

let pfiDid;
let senderDid;
let message;
let dataProvider = new MockDataProvider();
let offeringsApiProvider;
let exchangesApiProvider;
let mockOffering;

describe('PFI: Quotes', () => {
  beforeAll(async () => {
    // Set up providers and DID
    pfiDid = await DidDht.create({
        publish: true,
        services: [{
            id: 'pfi',
            type: 'PFI',
            serviceEndpoint: 'https://example.com/service'
        }]
    });

    senderDid = await DidDht.create({ publish: true });
    
    offeringsApiProvider = new OfferingsApiProvider(pfiDid);
    exchangesApiProvider = new ExchangesApiProvider();

    // Configure Mocks

    message = DevTools.createRfq({
      sender: senderDid,
      receiver: pfiDid
    });
    message.offeringId = "someOffering"

    let mockOfferingData = DevTools.createOfferingData();
    mockOffering = DevTools.createOffering({
      from: pfiDid.did,
      offeringData: mockOfferingData
    })

    offeringsApiProvider.setOffering(message.offeringId, mockOfferingData);

    dataProvider.setupInsert("exchange", "", () => { return });
  });
  
  test('PFI verifies offering requirements and should not throw an error', async () => {
    // :snippet-start: pfiWriteRfqGetOfferingJs
    // Write the message to your exchanges database
    await dataProvider.insert('exchange', {
      exchangeid: message.exchangeId,
      messagekind: message.kind,
      messageid: message.id,
      subject: message.subject,
      message: JSON.stringify(message)
    });
  
    //highlight-start
    let offering = await offeringsApiProvider.getOffering(message.offeringId);
    //highlight-end
    // :snippet-end:

    expect(offering.data).toEqual(mockOffering.data);
    mockOffering = offering
  
    const rfqOptions = {
      sender: senderDid,
      receiver: pfiDid
    };
  
    const rfqData = await DevTools.createRfqData(rfqOptions);
    rfqData.offeringId = offering.id;

    const rfq = Rfq.create({
      metadata: {
        from: pfiDid.did,
        to: senderDid.did
      },
      data: rfqData
    })
    expect(async () => {
      // :snippet-start: pfiRfqVerifyOfferingRequirementsJs
      try {
        await rfq.verifyOfferingRequirements(offering);
      } catch(e) {
        console.log(`Failed to verify offering requirements: ${e.rfq}`);
      }
      // :snippet-end:
    }).not.toThrow();
  })

  test('PFI creates and signs quote', async () => {
    // :snippet-start: pfiCreateQuoteJs
    var quoteExpiration = new Date();
    quoteExpiration.setDate(quoteExpiration.getDate() + 10);
    const quote = Quote.create(
        {
          metadata: {
            from: pfiDid.uri,
            to: message.from,
            exchangeId: message.exchangeId
          },
          data: {
            expiresAt: quoteExpiration.toLocaleDateString('en-us'),
            payin: {
              currencyCode: 'BTC',
              amount: '0.01',
              fee: '0.0001',
              paymentInstruction : {
                link: 'tbdex.io/example',
                instruction: 'Detailed payment instructions'
              }
            },
            payout: {
              currencyCode: 'USD',
              amount: '1000.00',
              paymentInstruction : {
                link: 'tbdex.io/example',
                instruction: 'Detailed payout instructions'
              }
            }
          }
        }
    );
    // :snippet-end:
  
    exchangesApiProvider.setWrite();
  
    // :snippet-start: pfiSignQuoteJs
    await quote.sign(pfiDid);
    exchangesApiProvider.write(quote);
    // :snippet-end:
    const signature = await quote.verifySignature();
    expect(signature).not.toBeNull();
  })

})