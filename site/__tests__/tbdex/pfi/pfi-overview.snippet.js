// :snippet-start: pfiOverviewConfigJs
import { TbdexHttpServer } from '@tbdex/http-server'

const httpApi = new TbdexHttpServer({ exchangesApi: ExchangesApiProvider, offeringsApi: OfferingsApiProvider })
// :snippet-end:

// :snippet-start: pfiOverviewServerRoutesJs
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

// :snippet-start: pfiOverviewServerStartJs
const server = httpApi.listen(config.port, () => {
    log.info(`Mock PFI listening on port ${config.port}`)
})
// :snippet-end:

// :snippet-start: pfiOverviewWriteJs
async write(opts: { message: MessageKindClass }) {
    const result = await dataProvider.insert(
        'exchange',
    {
        exchangeid: message.exchangeId,
        messagekind: message.kind,
        messageid: message.id,
        subject,
        message: JSON.stringify(message)
    });
}  
// :snippet-end:

// :snippet-start: pfiOverviewReadOfferingsJs
import { Offering } from '@tbdex/http-server'

async getOffering(opts: {id: string}): Promise<Offering> {
  const [ result ] =  await dataProvider.queryForOffering('offering', opts.id);

  if (!result) {
    return undefined
  }
  return Offering.factory(result.offering)
}

async getOfferings(): Promise<Offering[]> {
  const results =  await dataProvider.getOfferings('offering');
  const offerings: Offering[] = []

  for (let result of results) {
    const offering = Offering.factory(result.offering)
    offerings.push(offering)
  }

  return offerings
}
// :snippet-end:

// :snippet-start: pfiOverviewWriteOfferingsJs
async create(offering: Offering) {
    let result = await dataProvider.insert(
        'offering',
        {
        offeringid: offering.id,
        payoutcurrency: offering.payoutCurrency.currencyCode,
        payincurrency: offering.payinCurrency.currencyCode,
        offering: JSON.stringify(offering)
    });
}
// :snippet-end:

