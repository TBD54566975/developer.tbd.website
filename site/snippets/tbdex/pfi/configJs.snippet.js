import { TbdexHttpServer } from '@tbdex/http-server'

const httpApi = new TbdexHttpServer({ exchangesApi: ExchangesApiProvider, offeringsApi: OfferingsApiProvider })