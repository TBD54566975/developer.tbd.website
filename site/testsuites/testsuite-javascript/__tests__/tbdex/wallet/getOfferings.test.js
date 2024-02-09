import { test, expect, describe, beforeAll } from 'vitest';
import { TbdexHttpClient } from '@tbdex/http-client';
import { DidDhtMethod } from '@web5/dids';

//The URI of the PFI's DID
let pfiDid;

describe('Get Offerings from PFI', () => {
  beforeAll(async () => {
    /*
    TODO: set PFI DID to one that has offerings.
    waiting on the Mock PFI to be updated to include offerings.
    */
    const pfi = await DidDhtMethod.create({
      publish: true,
      services: [{
          id: 'pfi',
          type: 'PFI',
          serviceEndpoint: 'http://localhost:9000'
      }]
    })
    pfiDid = pfi.did;
  });
  
  test('get all offerings', async () => {
    // :snippet-start: walletGetOfferingsJS
    const { data: offerings } = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });
    // :snippet-end:

    //TODO: add tests once the mock PFI is updated to include offerings.
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
      const { data: offerings } = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });

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

    //TODO: add tests once the mock PFI is updated to include offerings.
  });



});