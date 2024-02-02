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
    await ExchangesApiProvider.write({ message: rfq})
})

httpApi.submit('order', async (ctx, order) => {
    await ExchangesApiProvider.write({ message: order })
})

httpApi.submit('close', async (ctx, close) => {
    await ExchangesApiProvider.write({ message: close })
})
// :snippet-end:

// :snippet-start: pfiOverviewServerStartJs
const server = httpApi.listen(config.port, () => {
    log.info(`Mock PFI listening on port ${config.port}`)
})
// :snippet-end:

// :snippet-start: pfiOverviewWriteJs
async function write({ message }) {
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

async function getOffering(opts) {
  const [ result ] =  await dataProvider.queryForOffering('offering', opts.id);

  if (!result) {
    return undefined
  }
  return Offering.factory(result.offering)
}


async function getOfferings() {
  const results =  await dataProvider.getOfferings('offering');
  const offerings = []

  for (let result of results) {
    const offering = Offering.factory(result.offering)
    offerings.push(offering)
  }

  return offerings
}
// :snippet-end:

// :snippet-start: pfiOverviewWriteOfferingsJs
async function create(offering) {
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
