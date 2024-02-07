import tbdex.sdk.httpserver.models.*
import tbdex.sdk.protocol.models.*
import tbdex.sdk.httpserver.TbdexHttpServer
import tbdex.sdk.httpserver.TbdexHttpServerConfig
import web5.sdk.crypto.AwsKeyManager
import web5.sdk.dids.methods.dht.DidDht
import tbdex.sdk.httpserver.models.SubmitKind
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import website.tbd.developer.site.docs.tbdex.*


fun main() {
    val dataProvider = MockDataProvider()

    // :snippet-start: pfiOverviewConfigKt
    val exchangesApiProvider = ExchangesApiProviderTest()
    val offeringsApiProvider = OfferingsApiProviderTest()

    val serverConfig = TbdexHttpServerConfig(
        port = 8080,
        pfiDid = DidDht.create(AwsKeyManager()).uri,
        exchangesApi = exchangesApiProvider,
        offeringsApi = offeringsApiProvider
    )

    val httpApi = TbdexHttpServer(serverConfig)
  // :snippet-end:

  // :snippet-start: pfiOverviewServerRoutesKt
    httpApi.submit(SubmitKind.rfq) { call, message, offering ->
        exchangesApiProvider.write(message)
        call.respond(HttpStatusCode.Accepted)
    }

    httpApi.submit(SubmitKind.order) { call, message, offering ->
        exchangesApiProvider.write(message)
        call.respond(HttpStatusCode.Accepted)
    }

    httpApi.submit(SubmitKind.close) { call, message, offering ->
        exchangesApiProvider.write(message)
        call.respond(HttpStatusCode.Accepted)
    }
    // :snippet-end:

    // :snippet-start: pfiOverviewServerStartKt
    httpApi.start()
    // :snippet-end:
}

