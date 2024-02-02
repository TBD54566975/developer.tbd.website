import { TbdexHttpServer } from '@tbdex/http-server'

const httpApi = new TbdexHttpServer({ exchangesApi: exchangesApiProvider, offeringsApi: offeringsApiProvider })