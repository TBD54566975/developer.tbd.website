import { TbdexHttpServer } from '@tbdex/http-server';
import { DidDhtMethod } from '@web5/dids';
import { OfferingsApiProvider } from './offeringsApiProvider'
import { ExchangesApiProvider } from './exchangesApiProvider'
var pfiDid = await DidDhtMethod.create({
  publish: true,
  services: [{
      id: 'pfi',
      type: 'PFI',
      serviceEndpoint: 'https://example.com/'
  }]
})

// Queue up 3 "ok" responses for the writes
exchangesApiProvider.setWrite("")
exchangesApiProvider.setWrite("")
exchangesApiProvider.setWrite("")

// :snippet-start: pfiOverviewConfigJs
var exchangesApiProvider = ExchangesApiProvider();
var offeringsApiProvider = OfferingsApiProvider();

const tbDexServer = new TbdexHttpServer({ 
  exchangesApi: exchangesApiProvider, 
  offeringsApi: offeringsApiProvider,
  pfiDid: pfiDid.did 
})
// :snippet-end:

// :snippet-start: pfiOverviewServerRoutesJs
tbDexServer.submit('rfq', async (ctx, rfq) => {
    await exchangesApiProvider.write({ message: rfq})
})

tbDexServer.submit('order', async (ctx, order) => {
    await exchangesApiProvider.write({ message: order })
})

tbDexServer.submit('close', async (ctx, close) => {
    await exchangesApiProvider.write({ message: close })
})
// :snippet-end:

// :snippet-start: pfiOverviewServerStartJs
const server = tbDexServer.listen(8080, () => {
    console.log(`PFI listening on port 8080`)
})
// :snippet-end:
