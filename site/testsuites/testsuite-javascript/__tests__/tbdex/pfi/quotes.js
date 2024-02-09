import {
    Rfq,
    Quote,
    Offering
} from '@tbdex/http-server';

import { DidDhtMethod } from '@web5/dids';

//---------------------------------------------------------------------------//
// TODO: Refactor this into a common file similar to setup-web5.js. This is  //
// being used in the pfi structure page as well, but with KT tests blocking  //
// I will create a separate PR for doing this setup.                         //
//---------------------------------------------------------------------------//

let sampleOffering = {
  "metadata": {
    "from": "did:ex:pfi",
    "kind": "offering",
    "id": "offering_01ha82y8d0fhstg95hhfjwmgxf",
    "createdAt": "2023-09-13T20:15:22.528Z"
  },
  "data": {
    "description": "Selling BTC for USD",
    "payinCurrency": {
      "currencyCode": "USD"
    },
    "payoutCurrency": {
      "currencyCode": "BTC",
      "maxSubunits": "99952611"
    },
    "payoutUnitsPerPayinUnit": "0.00003826",
    "payinMethods": [
      {
        "kind": "DEBIT_CARD",
        "requiredPaymentDetails": {
          "$schema": "http://json-schema.org/draft-07/schema",
          "type": "object",
          "properties": {
            "cardNumber": {
              "type": "string",
              "description": "The 16-digit debit card number",
              "minLength": 16,
              "maxLength": 16
            },
            "expiryDate": {
              "type": "string",
              "description": "The expiry date of the card in MM/YY format",
              "pattern": "^(0[1-9]|1[0-2])\\/([0-9]{2})$"
            },
            "cardHolderName": {
              "type": "string",
              "description": "Name of the cardholder as it appears on the card"
            },
            "cvv": {
              "type": "string",
              "description": "The 3-digit CVV code",
              "minLength": 3,
              "maxLength": 3
            }
          }
        }
      }
    ],
    "payoutMethods": [
      {
        "kind": "BTC_ADDRESS",
        "requiredPaymentDetails": {
          "$schema": "http://json-schema.org/draft-07/schema",
          "type": "object",
          "properties": {
            "btcAddress": {
              "type": "string",
              "description": "your Bitcoin wallet address"
            }
          },
          "additionalProperties": false
        }
      }
    ],
    "requiredClaims": {
      "id": "7ce4004c-3c38-4853-968b-e411bafcd945",
      "input_descriptors": [
        {
          "id": "bbdb9b7c-5754-4f46-b63b-590bada959e0",
          "constraints": {
            "fields": [
              {
                "path": [
                  "$.type"
                ],
                "filter": {
                  "type": "string",
                  "const": "YoloCredential"
                }
              }
            ]
          }
        }
      ]
    }
  },
  "signature": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa2syc1QyZUtvQWdUUTdzWjY3YTdmRDMzR21jYzZ1UXdaYmlxeWF5Rk1hYkhHI3o2TWtrMnNUMmVLb0FnVFE3c1o2N2E3ZkQzM0dtY2M2dVF3WmJpcXlheUZNYWJIRyJ9..9EBTL3VcajsQzSNOm8GElhcwvYcFGaRp24FTwmC845RCF84Md-ZB-CxdCo7kEjzsAY8OaB55XFSH_8K9vedhAw"
};

// Dummy data provider
class DataProvider {

  async insert(collectionName, data) {
    // no need for an actual implementation
  }

  async get(collectionName, id) {
      return sampleOffering;
  }

  async query(collectionName, searchParam) {
      return [sampleOffering];
  }
}

const dataProvider = new DataProvider();

const exchangesApiProvider = {
  getExchanges: (opts) => {
    // Mock data for getExchanges
    const mockData = [
      [{ message: 'Mock data for getExchanges' }],
      [{ message: 'Another mock data for getExchanges' }]
    ];
    return Promise.resolve(mockData);
  },

  getExchange: (opts) => {
    // Mock data for getExchange
    const mockData = [{ message: 'Mock data for getExchange' }];
    return Promise.resolve(mockData);
  },

  getRfq: (opts) => {
    // Mock data for getRfq
    const mockData = { id: opts.exchangeId, type: 'Rfq' };
    return Promise.resolve(mockData);
  },

  getQuote: (opts) => {
    // Mock data for getQuote
    const mockData = { id: opts.exchangeId, type: 'Quote' };
    return Promise.resolve(mockData);
  },

  getOrder: (opts) => {
    // Mock data for getOrder
    const mockData = { id: opts.exchangeId, type: 'Order' };
    return Promise.resolve(mockData);
  },

  getOrderStatuses: (opts) => {
    // Mock data for getOrderStatuses
    const mockData = [{ status: 'Pending' }, { status: 'Completed' }];
    return Promise.resolve(mockData);
  },

  getClose: (opts) => {
    // Mock data for getClose
    const mockData = { id: opts.exchangeId, type: 'Close' };
    return Promise.resolve(mockData);
  },


  async write({ message }) {
      await dataProvider.insert('exchange', {
              exchangeid: message.exchangeId,
              messagekind: message.kind,
              messageid: message.id,
              subject: message.subject,
              message: JSON.stringify(message)
          });
  }  

};

const offeringsApiProvider = {
  getOffering: (opts) => {
      dataProvider.get('offering', opts.id).then(([result]) => {
          if (!result) {
              return undefined
          }
          return Offering.factory(result.offering)
      });
  },

  getOfferings: (opts) => {
    dataProvider.query('offering', "*").then((results) => {
        const offerings = []

        for (let result of results) {
            const offering = Offering.factory(result.offering)
            offerings.push(offering)
        }

        return offerings
    });
  },


  async create(offering) {
      await dataProvider.insert('offering', {
          offeringid: offering.id,
          payoutcurrency: offering.payoutCurrency.currencyCode,
          payincurrency: offering.payinCurrency.currencyCode,
          offering: JSON.stringify(offering)
      });
  }
  
};  

//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//

async function createQuoteFromRfq(message) {

  const pfiDid = await DidDhtMethod.create({
      publish: true,
      services: [{
          id: 'pfi',
          type: 'PFI',
          serviceEndpoint: 'tbdex-pfi.tbddev.org'
      }]
  })
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
  const offering = await offeringsApiProvider.getOffering(message.offeringId)
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
          from: message.metadata.to,
          to: message.metadata.from,
          exchangeId: message.exchangeId
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

  // :snippet-start: pfiQuotesSignJs
  await quote.sign(pfiDid)
  this.write(quote)
  // :snippet-end:

}