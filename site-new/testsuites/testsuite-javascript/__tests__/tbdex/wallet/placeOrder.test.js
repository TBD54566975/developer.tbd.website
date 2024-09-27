import { test, expect, describe, beforeAll, afterAll } from 'vitest';
import { TbdexHttpClient, DevTools, Quote, Order, OrderStatus, Close, Message } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

let pfiDid;
let customerDid;
let server;
let order;
let orderStatusMsg = 'Processing';
let closeReason = 'Transaction complete';

describe('Wallet: Place Order', () => {

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

    order = Order.create({
      metadata: {
        from       : customerDid.uri,
        to         : pfiDid.uri,
        exchangeId : Message.generateId('rfq'),
        protocol   : "1.0"
      }
    })
    await order.sign(customerDid);

    const orderStatus = OrderStatus.create({
      metadata: {
        from: pfiDid.uri,
        to: customerDid.uri,
        exchangeId: order.exchangeId,
        protocol   : "1.0"
      },
      data: {
        orderStatus: orderStatusMsg
      }
    });
    await orderStatus.sign(pfiDid);

    const close = Close.create({
      metadata: {
        from: pfiDid.uri,
        to: customerDid.uri,
        exchangeId: order.exchangeId,
        protocol   : "1.0"
      },
      data: { 
        reason: closeReason,
        success: true
      }
    });
    await close.sign(pfiDid);

    // Mock responses from the PFI
    server = setupServer(
      http.put(new RegExp('https://localhost:9000/exchanges/(.+)'), () => {
        return HttpResponse.json({ status: 202 })
      }),
      http.post(new RegExp('https://localhost:9000/exchanges/(.+)'), () => {
        return HttpResponse.json({ status: 202 })
      }),
      http.get(new RegExp('https://localhost:9000/exchanges/(.+)'), () => {
        return HttpResponse.json(
          {data: [orderStatus, close]},
          { status: 202 },
        )
      }),
    )
    server.listen({onUnhandledRequest: 'bypass'})
  });

  afterAll(() => {
    server.resetHandlers()
    server.close()
  });

  test('send Order message', async () => {
      const quote = Quote.create({
        metadata: {
          exchangeId : Message.generateId('rfq'),
          from: pfiDid.uri,
          to: customerDid.uri,
          protocol: "1.0"
        },
        data: DevTools.createQuoteData()
      })

      // :snippet-start: createOrderJS
      const order = Order.create({
        metadata: {
          from: customerDid.uri,         // Customer's DID
          to: quote.metadata.from,       // PFI's DID
          exchangeId: quote.exchangeId,  // Exchange ID from the Quote
          protocol: "1.0"                // Version of tbDEX protocol you're using
        }
      });
      // :snippet-end:

      // :snippet-start: signOrderJS
      await order.sign(customerDid);
      // :snippet-end:

      try{
      // :snippet-start: sendOrderJS
      await TbdexHttpClient.submitOrder(order);
      // :snippet-end:
      }catch(e){
        expect.fail(e.message);
      }
  });

  test('listen for Order Status updates', async () => {
    // :snippet-start: listenForOrderStatusJS
    let orderStatusUpdate;
    let close;

    while (!close) {
      const exchange = await TbdexHttpClient.getExchange({
        pfiDid: order.metadata.to,
        did: customerDid,
        exchangeId: order.exchangeId
      });

      for (const message of exchange) {
        if (message instanceof OrderStatus) {
          // a status update to display to your customer
          orderStatusUpdate = message.data.orderStatus;
        }
        else if (message instanceof Close){
          // final message of exchange has been written
          close = message;
          break;
        }
      }
    }
    // :snippet-end:
    expect.soft(orderStatusUpdate).toBe(orderStatusMsg);

    // :snippet-start: getCloseReasonJS
    const isSuccessful = close.data.success;
    const reasonForClose = close.data.reason;
    // :snippet-end:
    expect(reasonForClose).toBe(closeReason);
    expect(isSuccessful).toBe(true);
  });
});
