import {
    Rfq,
    Order,
    Close
} from '@tbdex/http-server'

httpApi.submit('rfq', async (ctx, rfq) => {
    await ExchangesApiProvider.write({ message: rfq as Rfq })
})

httpApi.submit('order', async (ctx, order) => {
    await ExchangesApiProvider.write({ message: order as Order })
})

httpApi.submit('close', async (ctx, close) => {
    await ExchangesApiProvider.write({ message: close as Close })
})