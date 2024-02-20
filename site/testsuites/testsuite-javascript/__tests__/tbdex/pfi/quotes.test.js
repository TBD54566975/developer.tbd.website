import { Rfq, Quote } from '@tbdex/http-server';
import { DevTools } from '@tbdex/http-client';
import { DidDhtMethod } from '@web5/dids';
import { OfferingsApiProvider } from './offeringsApiProvider'
import { ExchangesApiProvider } from './exchangesApiProvider'
import { MockDataProvider } from '../../utils/mockDataProvider'
import { test, expect, describe, beforeAll } from 'vitest';

let pfiDid;
let message;
let dataProvider = new MockDataProvider();
let offeringsApiProvider;
let exchangesApiProvider;
let mockOffering;

describe('PFI: Quotes', () => {
  beforeAll(async () => {
    // Set up providers and DID
    pfiDid = await DidDhtMethod.create({
        publish: true,
        services: [{
            id: 'pfi',
            type: 'PFI',
            serviceEndpoint: 'https://example.com/service'
        }]
    });

    let senderDid = await DidDhtMethod.create({ publish: true });
    
    offeringsApiProvider = new OfferingsApiProvider(pfiDid);
    exchangesApiProvider = new ExchangesApiProvider();

    // Configure Mocks

    message = DevTools.createRfq({
      sender: senderDid,
      receiver: pfiDid
    });

    let mockOfferingData = DevTools.createOfferingData();
    mockOffering = DevTools.createOffering({
      from: pfiDid.did,
      offeringData: mockOfferingData
    })
    offeringsApiProvider.setOffering(message.offeringId, mockOffering);

    dataProvider.setupInsert("exchange", "", () => { return });
  });
  
  test('PFI verifies offering requirements and should not throw an error', async () => {
    // :snippet-start: pfiQuotesWriteJs
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

    expect(offering).toEqual(mockOffering);
  
    const rfqOptions = {
      data: message.data(), 
      metadata: message.metadata()
    };
  
    const rfq = Rfq.create(rfqOptions);
  
    // :snippet-start: pfiQuotesProcessJs
    try {
      await rfq.verifyOfferingRequirements(offering);
    } catch(e) {
      console.log(`Failed to verify offering requirements: ${e.rfq}`);
    }
    // :snippet-end:
  })

  test('PFI creates and signs quote', async () => {
    // :snippet-start: pfiQuotesSendJs
    var quoteExpiration = new Date();
    quoteExpiration.setDate(quoteExpiration.getDate() + 10);
    const quoteData = DevTools.createQuoteData();
    const quote = Quote.create(
        {
          metadata: {
            from: pfiDid.did,
            to: message.from,
            exchangeId: message.exchangeId
          },
          data: quoteData
        }
    );
    // :snippet-end:
  
    exchangesApiProvider.setWrite();
  
    // :snippet-start: pfiQuotesSignJs
    await quote.sign(pfiDid);
    exchangesApiProvider.write(quote);
    // :snippet-end:
    const signature = await quote.verifySignature();
    expect(signature).not.toBeNull();
  })

})