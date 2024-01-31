// :snippet-start: configKt
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

val tbdexServer = TbdexHttpServer(serverConfig)
// :snippet-end:

// :snippet-start: serverRoutesKt
import tbdex.sdk.httpserver.models.SubmitKind

tbdexServer.submit(SubmitKind.rfq) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}

tbdexServer.submit(SubmitKind.order) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}

tbdexServer.submit(SubmitKind.close) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}
// :snippet-end:

// :snippet-start: server-start
tbdexServer.start()
// :snippet-end:

// :snippet-start: exchanges-api

// :snippet-end:

// :snippet-start: offerings-api

// :snippet-end:


