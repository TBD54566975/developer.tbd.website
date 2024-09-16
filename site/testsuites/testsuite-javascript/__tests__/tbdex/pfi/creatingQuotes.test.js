import { Rfq, Quote, Parser } from '@tbdex/http-server';
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

    message = await DevTools.createRfq({
      sender: senderDid,
      receiver: pfiDid
    });
    await message.sign(senderDid);
 
    mockOffering = DevTools.createOffering({
      from: pfiDid.uri,
      offeringData: DevTools.createOfferingData()
    })
    await mockOffering.sign(pfiDid);


    message.offeringId = mockOffering.id;
    offeringsApiProvider.setOffering(mockOffering);


    dataProvider.setupInsert("exchange", "", () => { return });
  });
  
  test('PFI creates offering', async () => {
    // :snippet-start: pfiWriteOfferingJs
    // Write the message to your exchanges database
    await dataProvider.insert('exchange', {
      exchangeid: message.exchangeId,
      messagekind: message.kind,
      messageid: message.id,
      subject: message.subject,
      message: await Parser.parseMessage(message)
    });
  
    //highlight-start
    const offering = await offeringsApiProvider.getOffering(message.offeringId);
    //highlight-end
    // :snippet-end:
  })

  test('PFI creates and signs quote', async () => {
    const offering = mockOffering

    // :snippet-start: pfiCreateQuoteJs
    // Set the Quote's expiration date for 1 day from now
    var quoteExpiration = new Date();
    quoteExpiration.setDate(quoteExpiration.getDate() + 1);

    const quote = Quote.create({
      metadata: {
        from: pfiDid.uri,
        to: message.from,
        exchangeId: message.exchangeId,
        protocol: '1.0'
      },
      data: {
        expiresAt: quoteExpiration.toLocaleDateString('en-us'),
        payin: {
          currencyCode: offering.data.payin.currencyCode,
          amount: '0.01',
          fee: '0.0001',
          paymentInstruction : {
            link: 'https://example.com/paymentInstructions',
            instruction: 'Detailed payment instructions'
          }
        },
        payout: {
          currencyCode: offering.data.payout.currencyCode,
          amount: '1000.00',
          paymentInstruction : {
            link: 'https://example.com/paymentInstructions',
            instruction: 'Detailed payout instructions'
          }
        }
      }
    });
    // :snippet-end:
  
    exchangesApiProvider.setWrite();
  
    // :snippet-start: pfiSignQuoteJs
    await quote.sign(pfiDid);
    dataProvider.insert(quote);
    // :snippet-end:

    const signature = await quote.verifySignature();
    expect(signature).toBeDefined();
  })

})