import { test, expect, describe, beforeAll, afterAll } from 'vitest';
import { TbdexHttpClient, DevTools, Quote, Order, OrderStatus, Close, Message } from '@tbdex/http-client';
import { DidDht, DidKey } from '@web5/dids';
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

let pfi;
let customerDid;
let server;
let order;
let orderStatusMsg = 'Processing';
let closeReason = 'Transaction complete';

describe('Wallet: Place Order', () => {

  beforeAll(async () => {
    customerDid = await DidKey.create({ 
      options: {
        publish: true 
      }
    })

    pfi = await DidDht.create({
      options:{
        publish  : true,
        services : [{
          type            : 'PFI',
          id              : 'pfi',
          serviceEndpoint : 'http://localhost:9000'
        }]
      }
    })

    order = DevTools.createOrder({
      receiver: pfi,
      sender: customerDid
    });
    await order.sign(customerDid);

    const orderStatus = OrderStatus.create({
      metadata: {
        from: pfi.uri,
        to: customerDid.uri,
        exchangeId: order.exchangeId
      },
      data: {
        orderStatus: orderStatusMsg
      }
    });
    await orderStatus.sign(pfi);

    const close = Close.create({
      metadata: {
        from: pfi.uri,
        to: customerDid.uri,
        exchangeId: order.exchangeId
      },
      data: { reason: closeReason}
    });
    await close.sign(pfi);

    // Mock the response from the PFI
    server = setupServer(
      http.post(new RegExp('http://localhost:9000/exchanges/(.+)/order'), () => {
        return HttpResponse.json({ status: 202 })
      }),
      http.get(new RegExp('http://localhost:9000/exchanges/(.+)'), () => {
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
          from: pfi.uri,
          to: customerDid.uri
        },
        data: DevTools.createQuoteData()
      })

      // :snippet-start: createOrderJS
      const order = Order.create({
        metadata: {
          from: customerDid.uri,         // Customer's DID
          to: quote.metadata.from,       // PFI's DID
          exchangeId: quote.exchangeId  // Exchange ID from the Quote
        }
      });
      // :snippet-end:

      // :snippet-start: signOrderJS
      await order.sign(customerDid);
      // :snippet-end:

      try{
      // :snippet-start: sendOrderJS
      await TbdexHttpClient.sendMessage({ message: order });
      // :snippet-end:
      }catch(e){
        expect.fail(e);
      }
  });

  test('listen for Order Status updates', async () => {
    // :snippet-start: listenForOrderStatusJS
    let orderStatusUpdate;
    let closeMessage;

    while (!closeMessage) {
      const exchange = await TbdexHttpClient.getExchange({
        did: customerDid,
        pfiDid: order.metadata.to,
        exchangeId: order.exchangeId
      });

      for (const message of exchange) {
        if (message instanceof OrderStatus) {
          //a status update to display to your customer
          orderStatusUpdate = message.data.orderStatus;
        }
        else if (message instanceof Close){
          //final message of exchange has been written
          closeMessage = message;
        }
      }
    }
    // :snippet-end:
    expect.soft(orderStatusUpdate).toBe(orderStatusMsg);

    // :snippet-start: getCloseReasonJS
    const reasonForClose = closeMessage.data.reason;
    // :snippet-end:
    expect(reasonForClose).toBe(closeReason);
  });
});
