import { vi, test, expect, describe, beforeAll, afterAll } from 'vitest';
import { TbdexHttpClient, DevTools } from '@tbdex/http-client';
import { DidDhtMethod } from '@web5/dids';
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'

let pfi;
let pfiDid; //The URI of the PFI's DID
let server;
let mockOffering;

describe('Get Offerings from PFI', () => {

  beforeAll(async () => {
    pfi = await DidDhtMethod.create({
      publish: true,
      services: [{
          id: 'pfi',
          type: 'PFI',
          serviceEndpoint: 'http://localhost:9000'
      }]
    })
    pfiDid = pfi.did;

    // Mock the response from the PFI
    const defaultOfferingData = DevTools.createOfferingData()
    mockOffering = DevTools.createOffering({
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
    });  
    await mockOffering.sign(pfi)

    server = setupServer(
      http.get('http://localhost:9000/offerings', () => {
        return HttpResponse.json({ data: [mockOffering] }, {
          status: 200
        })
      }),
    )
    server.listen({onUnhandledRequest: 'bypass'})
  });

  afterAll(() => {
    server.resetHandlers()
    server.close()
  }); 
  
  test('get all offerings', async () => {
    // :snippet-start: walletGetOfferingsJS
    const offerings  = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });
    // :snippet-end:
    expect(offerings).toEqual([mockOffering]);
  });

  test('find matching offerings', async () => {
    const pfiDids = [pfiDid];

    // :snippet-start: walletFindMatchingOfferingsJS
    const payinCurrencyCode = 'USD'; // Desired payin currency code
    const payoutCurrencyCode = 'KES'; // Desired payout currency code

    const matchedOfferings = []; // Array to store the matched offerings

    // Loop through the all PFIs in your network
    for (const pfiDid of pfiDids) {

      //Makes a request to the PFI to get their offerings
      const offerings = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });

      // Filter offerings based on the currency pair
      if(offerings){
        const filteredOfferings = offerings.filter(offering =>
          offering.data.payinCurrency.currencyCode === payinCurrencyCode &&
          offering.data.payoutCurrency.currencyCode === payoutCurrencyCode
        );
        matchedOfferings.push(...filteredOfferings);
      }
    }
    // :snippet-end:

    expect(matchedOfferings).toEqual([mockOffering]);
  });
});