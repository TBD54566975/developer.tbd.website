import { Order, OrderStatus } from '@tbdex/http-server'
import { DidDhtMethod } from '@web5/dids';

var pfiDid = await DidDhtMethod.create({
    publish: false,
    services: [{
        id: 'pfi',
        type: 'PFI',
        serviceEndpoint: 'tbdex-pfi.tbddev.org'
    }]
})

var senderDid = await DidDhtMethod.create({ publish: false })

var config = {
    did: pfiDid    
}

var dataProvider = {
    write: (args) => {
        // do nothing
    }
}

var message = Order.create({
    metadata: {
        from: senderDid,
        to: pfiDid
    }
})

// :snippet-start: pfiOrdersStatusJs
if (message.metadat.kind == 'order') {
    const orderStatus = OrderStatus.create(
    {
        metadata: {
            from: config.did.id,
            to: message.metadata.from,
            exchangeId: message.metadata.exchangeId
        },
        data: {
        orderStatus: 'PROCESSING'
        }
    })
    
    await orderStatus.sign(config.did.privateKey, config.did.kid)
    dataProvider.write(orderStatus)
}
// :snippet-end: