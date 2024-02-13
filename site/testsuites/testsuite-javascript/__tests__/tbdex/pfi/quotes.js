import { Rfq, Quote } from '@tbdex/http-server';
import { DevTools } from '@tbdex/http-client';
import { DidDhtMethod } from '@web5/dids';
import { OfferingsApiProvider } from './offeringsApiProvider'
import { ExchangesApiProvider } from './exchangesApiProvider'
import { MockDataProvider } from '../utils/mockDataProvider'

async function createQuoteFromRfq(message) {

  // Set up providers and DID
  const pfiDid = await DidDhtMethod.create({
      publish: true,
      services: [{
          id: 'pfi',
          type: 'PFI',
          serviceEndpoint: 'https://example.com/service'
      }]
  })
  const dataProvider = MockDataProvider()
  const offeringsApiProvider = OfferingsApiProvider() 
  const exchangesApiProvider = ExchangesApiProvider() 

  // Configure Mocks
  const defaultOfferingData = DevTools.createOfferingData()
  offeringsApiProvider.setOffering(message.metadata.id, {
    from: pfiDid,
    offeringData: {
        ...defaultOfferingData,
        payinCurrency: {
            ...defaultOfferingData.payinCurrency,
            currencyCode: 'USD'
        },
        payoutCurrency: {
            ...defaultOfferingData.payoutCurrency,
            currencyCode: 'KES'
        }
      }
  })

  dataProvider.setupInsert("exchange", "", () => { return })

  // :snippet-start: pfiQuotesWriteJs
  // Write the message to your exchanges database
  await dataProvider.insert('exchange', {
      exchangeid: message.metadata.exchangeId,
      messagekind: message.metadata.kind,
      messageid: message.metadata.id,
      subject: message.metadata.subject,
      message: JSON.stringify(message)
  });

  //highlight-start
  const offering = await offeringsApiProvider.getOffering(message.metadata.offeringId)
  //highlight-end
  // :snippet-end:

  const rfqOptions = {
      data: message.data(), 
      metadata: message.metadata()
  };

  const rfq = Rfq.create(rfqOptions)

  // :snippet-start: pfiQuotesProcessJs
  try {
      await rfq.verifyOfferingRequirements(offering)
  } catch(e) {
      console.log(`Failed to verify offering requirements: ${e.rfq}`)
  }
  // :snippet-end:

  // :snippet-start: pfiQuotesSendJs
  var quoteExpiration = new Date()
  quoteExpiration.setDate(quoteExpiration.getDate() + 10)
  const quote = Quote.create(
      {
        metadata: {
          from: pfiDid.did,
          to: message.metadata.from,
          exchangeId: message.metadata.exchangeId
        },
        data: {
          expiresAt: quoteExpiration.toLocaleDateString('en-us'),
          payin: {
            currencyCode: 'BTC',
            amountSubunits: '1000'
          },
          payout: {
            currencyCode: 'KES',
            amountSubunits: '123456789'
          }
        }
      }
  );
  // :snippet-end:

  exchangesApiProvider.setWrite()

  // :snippet-start: pfiQuotesSignJs
  await quote.sign(pfiDid)
  exchangesApiProvider.write(quote)
  // :snippet-end:

}