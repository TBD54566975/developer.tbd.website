import { 
  TbdexHttpServer, 
  Offering,
  Rfq, 
  Quote, 
  Order, 
  OrderStatus, 
  Close, 
  CallbackError, 
  ErrorDetail 
} from '@tbdex/http-server';

import { DidDhtMethod } from '@web5/dids';

var pfiDid;

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

class ExchangesApiProvider {
  getExchanges(opts) {
    // Mock data for getExchanges
    const mockData = [
      [{ message: 'Mock data for getExchanges' }],
      [{ message: 'Another mock data for getExchanges' }]
    ];
    return Promise.resolve(mockData);
  }

  getExchange(opts) {
    // Mock data for getExchange
    const mockData = [{ message: 'Mock data for getExchange' }];
    return Promise.resolve(mockData);
  }

  getRfq(opts) {
    // Mock data for getRfq
    const mockData = { id: opts.exchangeId, type: 'Rfq' };
    return Promise.resolve(mockData);
  }

  getQuote(opts) {
    // Mock data for getQuote
    const mockData = { id: opts.exchangeId, type: 'Quote' };
    return Promise.resolve(mockData);
  }

  getOrder(opts) {
    // Mock data for getOrder
    const mockData = { id: opts.exchangeId, type: 'Order' };
    return Promise.resolve(mockData);
  }

  getOrderStatuses(opts) {
    // Mock data for getOrderStatuses
    const mockData = [{ status: 'Pending' }, { status: 'Completed' }];
    return Promise.resolve(mockData);
  }

  getClose(opts) {
    // Mock data for getClose
    const mockData = { id: opts.exchangeId, type: 'Close' };
    return Promise.resolve(mockData);
  }

  // :snippet-start: pfiOverviewWriteJs
  async write({ message }) {
      await dataProvider.insert('exchange', {
              exchangeid: message.exchangeId,
              messagekind: message.kind,
              messageid: message.id,
              subject: message.subject,
              message: JSON.stringify(message)
          });
  }  
  // :snippet-end:
};

// :snippet-start: pfiOverviewReadOfferingsJs
class OfferingsApiProvider {
  getOffering(opts) {
      dataProvider.get('offering', opts.id).then(([result]) => {
          if (!result) {
              return undefined
          }
          return Offering.create({
            metadata: { from: this.pfiDid },
            data: result.offering
          })
      });
  }

  getOfferings(opts) {
    dataProvider.query('offering', "*").then((results) => {
        const offerings = []
  
        for (let result of results) {
            const offering = Offering.create({
              metadata: { from: this.pfiDid },
              data: result.offering
            })
            offerings.push(offering)
        }
    
        return offerings
    });
  }

  // :snippet-end:

  // :snippet-start: pfiOverviewWriteOfferingsJs
  async create(offering) {
      await dataProvider.insert('offering', {
          offeringid: offering.id,
          payoutcurrency: offering.payoutCurrency.currencyCode,
          payincurrency: offering.payinCurrency.currencyCode,
          offering: JSON.stringify(offering)
      });
  }
    // :snippet-end:
};  

this.pfiDid = await DidDhtMethod.create({
  publish: true,
  services: [{
      id: 'pfi',
      type: 'PFI',
      serviceEndpoint: 'https://example.com/'
  }]
})

// :snippet-start: pfiOverviewConfigJs
var exchangesApiProvider = ExchangesApiProvider();
var offeringsApiProvider = OfferingsApiProvider();

const tbDexServer = new TbdexHttpServer({ 
  exchangesApi: exchangesApiProvider, 
  offeringsApi: offeringsApiProvider,
  pfiDid: pfiDid.did 
})
// :snippet-end:

// :snippet-start: pfiOverviewServerRoutesJs
tbDexServer.submit('rfq', async (ctx, rfq) => {
    await exchangesApiProvider.write({ message: rfq})
})

tbDexServer.submit('order', async (ctx, order) => {
    await exchangesApiProvider.write({ message: order })
})

tbDexServer.submit('close', async (ctx, close) => {
    await exchangesApiProvider.write({ message: close })
})
// :snippet-end:

// :snippet-start: pfiOverviewServerStartJs
const server = tbDexServer.listen(8080, () => {
    console.log(`PFI listening on port ${8080}`)
})
// :snippet-end:
