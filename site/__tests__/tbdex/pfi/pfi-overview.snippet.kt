// :snippet-start: pfiOverviewConfigKt
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
// :snippet-end:

// :snippet-start: pfiOverviewServerRoutesKt
import tbdex.sdk.httpserver.models.SubmitKind

httpApi.submit(SubmitKind.rfq) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}

httpApi.submit(SubmitKind.order) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}

httpApi.submit(SubmitKind.close) { call, messageKind, offering ->
    ExchangesApiProvider.write(offering)
    call.respond(HttpStatusCode.Accepted)
}
// :snippet-end:

// :snippet-start: pfiOverviewServerStartKt
httpApi.start()
// :snippet-end:

// :snippet-start: pfiOverviewWriteKt

// :snippet-end:

// :snippet-start: pfiOverviewReadOfferingsKt

// :snippet-end:

// :snippet-start: pfiOverviewWriteOfferingsKt

// :snippet-end:


