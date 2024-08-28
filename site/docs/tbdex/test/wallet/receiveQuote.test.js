import { test, expect, describe, beforeAll, afterAll } from 'vitest';
import { TbdexHttpClient, DevTools, Quote, Close, Message, Rfq } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

let pfiDid;
let customerDid;
let rfq;
let quote;
let server;


describe('Wallet: Receive Quote', () => {

  beforeAll(async () => {
    customerDid = await DidDht.create({
      options: { publish: true }
    })

    pfiDid = await DidDht.create({
      options:{
        services : [{
          type            : 'PFI',
          id              : 'pfi',
          serviceEndpoint : 'https://localhost:9000'
        }]
      }
    })

    rfq = await Rfq.create({
      metadata: {
        from: customerDid.uri,
        to: pfiDid.uri,
        protocol: '1.0'
      },
      data: await DevTools.createRfqData()
    });
    await rfq.sign(customerDid);


    quote = Quote.create({
      metadata: {
        exchangeId : rfq.metadata.exchangeId,
        from: pfiDid.uri,
        to: customerDid.uri,
        protocol: '1.0'
      },
      data: DevTools.createQuoteData()
    })
    await quote.sign(pfiDid);

    // Mock the response from the PFI
    server = setupServer(
      http.get(new RegExp('https://localhost:9000/exchanges/(.+)'), () => {
        return HttpResponse.json(
          {data: [quote]},
          {status: 200})
      }),
      http.put(new RegExp('https://localhost:9000/exchanges/(.+)'), () => {
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
    let close;

    //Wait for Quote message to appear in the exchange
    while (!quote) {
      const exchange = await TbdexHttpClient.getExchange({
        pfiDid: rfq.metadata.to,
        did: customerDid,
        exchangeId: rfq.exchangeId
      });

      quote = exchange.find(msg => msg instanceof Quote);

      if (!quote) {
        // Make sure the exchange is still open
        close = exchange.find(msg => msg instanceof Close);
        
        if(close) { break; } 
        else {
          // Wait 2 seconds before making another request
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    // :snippet-end:

    expect(quote).toBeDefined()
    expect.soft(quote.exchangeId).toBe(rfq.exchangeId);
    expect(close).toBe(undefined);
  });

  test('cancel exchange', async () => {
    // :snippet-start: cancelExchangeJS
    const close = Close.create({
      metadata: {
        from: customerDid.uri,
        to: quote.metadata.from,
        exchangeId: quote.exchangeId,
        protocol: '1.0'
      },
      data: { reason: 'Canceled by customer'}
    });

    await close.sign(customerDid);
    await TbdexHttpClient.submitClose(close);
    // :snippet-end:

    expect(close.exchangeId).toBe(quote.exchangeId);
  });
});