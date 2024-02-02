import tbdex.sdk.httpserver.TbdexHttpServer
import web5.sdk.crypto.AwsKeyManager
import web5.sdk.dids.methods.dht.DidDht
import my.project.ExchangesApiProvider
import my.project.OfferingsApiProvider 

val serverConfig = TbdexHttpServerConfig(
    port = 8080,
    pfiDid = DidDht.create(AwsKeyManager()).uri,
    offeringsApi = ExchangesApiProvider(),
    exchangesApi = OfferingsApiProvider()
  )

val httpApi = TbdexHttpServer(serverConfig)