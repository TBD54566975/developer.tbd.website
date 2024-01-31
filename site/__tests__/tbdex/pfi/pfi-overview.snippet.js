// :snippet-start: configJs
import { TbdexHttpServer } from '@tbdex/http-server'

const httpApi = new TbdexHttpServer({ exchangesApi: ExchangesApiProvider, offeringsApi: OfferingsApiProvider })
// :snippet-end:

// :snippet-start: serverRoutesJs
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
// :snippet-end:

// :snippet-start: server-start
const server = httpApi.listen(config.port, () => {
    log.info(`Mock PFI listening on port ${config.port}`)
})
// :snippet-end:

// :snippet-start: exchanges-api

// :snippet-end:

// :snippet-start: offerings-api

// :snippet-end:


