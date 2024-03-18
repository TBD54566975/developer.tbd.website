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
        publish  : true,
        services : [{
          type            : 'PFI',
          id              : 'pfi',
          serviceEndpoint : 'http://localhost:9000'
        }]
      }
    })

    rfq = await Rfq.create({
      metadata: {
        from: customerDid.uri,
        to: pfiDid.uri
      },
      data: await DevTools.createRfqData()
    });
    await rfq.sign(customerDid);


    quote = Quote.create({
      metadata: {
        exchangeId : rfq.metadata.exchangeId,
        from: pfiDid.uri,
        to: customerDid.uri
      },
      data: DevTools.createQuoteData()
    })
    await quote.sign(pfiDid);

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
        pfiDid: rfq.metadata.to,
        did: customerDid,
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
        from: customerDid.uri,
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