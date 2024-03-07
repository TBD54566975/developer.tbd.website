import { Rfq, Quote } from '@tbdex/http-server';
import { DevTools } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';
import { OfferingsApiProvider } from './offeringsApiProvider'
import { ExchangesApiProvider } from './exchangesApiProvider'
import { MockDataProvider } from '../../utils/mockDataProvider'
import { vi, test, expect, describe, beforeAll } from 'vitest';

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
    })
    
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
      from: pfiDid.uri,
      offeringData: mockOfferingData
    })

    offeringsApiProvider.setOffering(message.offeringId, mockOfferingData);

    dataProvider.setupInsert("exchange", "", () => { return });
  });
  
  test('PFI creates offering', async () => {
    // :snippet-start: pfiCreateOfferingJs
    // Write the message to your exchanges database
    await dataProvider.insert('exchange', {
      exchangeid: message.exchangeId,
      messagekind: message.kind,
      messageid: message.id,
      subject: message.subject,
      message: JSON.stringify(message)
    });
  
    //highlight-start
    const offering = await offeringsApiProvider.getOffering(message.offeringId);
    //highlight-end
    // :snippet-end:

    expect(offering.data).toEqual(mockOffering.data);
  })

  test('PFI verifies required claims', async () => {
    const offering = DevTools.createOffering({
      from: pfiDid.did
    });

    const rfq = Rfq.create({
      metadata: {
        from: pfiDid.uri,
        to: senderDid.uri
      },
      data: await DevTools.createRfqData({
        sender: senderDid
      })
    });
    //change RFQ to have the same offering id
    rfq.data.offeringId = offering.id;

    const consoleSpy = vi.spyOn(console, 'log');

    // :snippet-start: pfiRfqVerifyOfferingRequirementsJs
    try {
      await rfq.verifyOfferingRequirements(offering);
    } catch(e) {
      console.log(`Failed to verify offering requirements: ${e.message}`);
    }
    // :snippet-end:

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test('PFI creates and signs quote', async () => {
    // :snippet-start: pfiCreateQuoteJs
    // Set the Quote's expiration date for 10 days from now
    var quoteExpiration = new Date();
    quoteExpiration.setDate(quoteExpiration.getDate() + 10);

    const quote = Quote.create({
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
            link: 'https://example.pfi.io/instructions',
            instruction: 'Detailed payment instructions'
          }
        },
        payout: {
          currencyCode: 'USD',
          amount: '1000.00',
          paymentInstruction : {
            link: 'https://example.pfi.io/instructions',
            instruction: 'Detailed payout instructions'
          }
        }
      }
    });
    // :snippet-end:
  
    exchangesApiProvider.setWrite();
  
    // :snippet-start: pfiSignQuoteJs
    await quote.sign(pfiDid);
    exchangesApiProvider.write(quote);
    // :snippet-end:
    const signature = await quote.verifySignature();
    expect(signature).toBeDefined();
  })

})