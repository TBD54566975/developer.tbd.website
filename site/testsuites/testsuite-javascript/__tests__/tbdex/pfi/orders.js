import { Order, OrderStatus, Close } from '@tbdex/http-server'
import { DidDhtMethod } from '@web5/dids';

var pfiDid = await DidDhtMethod.create({
    publish: true,
    services: [{
        id: 'pfi',
        type: 'PFI',
        serviceEndpoint: 'tbdex-pfi.tbddev.org'
    }]
})

var senderDid = await DidDhtMethod.create({ publish: true })

var dataProvider = {
    write: (args) => {
        // do nothing
    }
}

var message = Order.create({
    metadata: {
        from: senderDid.did,
        to: pfiDid.did
    }
})

// :snippet-start: pfiOrderStatusJs
if (message.metadata.kind == 'order') {
    const orderStatus = OrderStatus.create({
        metadata: {
            from: pfiDid.did,
            to: message.metadata.from,
            exchangeId: message.metadata.exchangeId
        },
        data: { orderStatus: 'PROCESSING' }
    })
    
    await orderStatus.sign(pfiDid)
    dataProvider.write(orderStatus)
}
// :snippet-end:

// :snippet-start: pfiCloseOrderJs
const closeMessage = Close.create({
    metadata: { 
        from: pfiDid.did, 
        to: message.metadata.from, 
        exchangeId: message.metadata.exchangeId
    },
    data: { reason: 'COMPLETED' }
})
await closeMessage.sign(pfiDid.did)
dataProvider.write(closeMessage)
// :snippet-end:
