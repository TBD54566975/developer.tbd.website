import { test, expect, describe, beforeAll, afterAll } from 'vitest';
import { TbdexHttpClient, DevTools, Quote, Close, Message } from '@tbdex/http-client';
import { DidDhtMethod, DidKeyMethod } from '@web5/dids';
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

let pfi;
let customerDid;
let rfq;
let quote;
let server;


describe('Wallet: Receive Quote', () => {

  beforeAll(async () => {
    customerDid = await DidKeyMethod.create({ publish: true })

    pfi = await DidDhtMethod.create({
        publish  : true,
        services : [{
          type            : 'PFI',
          id              : 'pfi',
          serviceEndpoint : 'http://localhost:9000'
        }]
    })

    rfq = await DevTools.createRfq({
      sender: customerDid,
      receiver: pfi
    });
    await rfq.sign(customerDid);


    quote = Quote.create({
      metadata: {
        exchangeId : rfq.metadata.exchangeId,
        from: pfi.did,
        to: customerDid.did
      },
      data: DevTools.createQuoteData()
    })
    await quote.sign(pfi);

    // Mock the response from the PFI
    server = setupServer(
      http.get(new RegExp('http://localhost:9000/exchanges/(.+)'), () => {
        return HttpResponse.json(
          {data: [quote]},
          {status: 200})
      }),
      http.post(new RegExp('http://localhost:9000/exchanges/(.+)/close'), () => {
        return HttpResponse.json(
          {status: 200})
      })
    )
    server.listen({onUnhandledRequest: 'bypass'})
  });

  afterAll(() => {
    server.resetHandlers()
    server.close()
  }); 

  test('poll for quote message', async () => {
    // :snippet-start: pollforQuoteJS
    let quote;

    //Wait for Quote message to appear in the exchange
    while (!quote) {
      const exchange = await TbdexHttpClient.getExchange({
        did: customerDid,
        pfiDid: rfq.metadata.to,
        exchangeId: rfq.exchangeId
      });
    
      quote = exchange.find(msg => msg instanceof Quote);
    
      if (!quote) {
        // Wait 2 seconds before making another request
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    // :snippet-end:

    expect(quote.exchangeId).toBe(rfq.exchangeId);
  });

  test('cancel exchange', async () => {
    // :snippet-start: cancelExchangeJS
    const close = Close.create({
      metadata: {
        from: customerDid.did,
        to: quote.metadata.from,
        exchangeId: quote.exchangeId
      },
      data: { reason: 'Canceled by customer'}
    });
    
    await close.sign(customerDid); 
    await TbdexHttpClient.sendMessage({ message: close });
    // :snippet-end:

    expect(close.exchangeId).toBe(quote.exchangeId);
  });
});