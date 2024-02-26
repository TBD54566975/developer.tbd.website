package website.tbd.developer.site.docs.tbdex.pfi

import foundation.identity.did.Service
import tbdex.sdk.httpserver.models.*
import tbdex.sdk.protocol.models.*
import tbdex.sdk.httpserver.TbdexHttpServer
import tbdex.sdk.httpserver.TbdexHttpServerConfig
import website.tbd.developer.site.docs.utils.*
import web5.sdk.dids.methods.dht.DidDht
import tbdex.sdk.httpserver.models.SubmitKind
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import java.net.URI


class PfiStructureTest {
    fun main() {
        val dataProvider = MockDataProvider()
        val serviceToAdd = Service.builder()
            .id(URI("pfi"))
            .type("PFI")
            .serviceEndpoint("https://example.com/")
            .build()

        val options = CreateDidDhtOptions(
            publish = false,
            services = listOf(serviceToAdd),
        )

        val pfiDid = DidDht.create(InMemoryKeyManager(), options)

        // :snippet-start: pfiOverviewConfigKt
        val exchangesApiProvider = ExchangesApiProvider()
        val offeringsApiProvider = OfferingsApiProvider()

        val serverConfig = TbdexHttpServerConfig(
            port = 8080,
            pfiDid = pfiDid.uri,
            exchangesApi = exchangesApiProvider,
            offeringsApi = offeringsApiProvider
        )

        val tbDexServer = TbdexHttpServer(serverConfig)
      // :snippet-end:

        exchangesApiProvider.setWrite()
        exchangesApiProvider.setWrite()
        exchangesApiProvider.setWrite()

      // :snippet-start: pfiOverviewServerRoutesKt
        tbDexServer.submit(SubmitKind.rfq) { call, message, offering ->
            exchangesApiProvider.write(message)
            call.respond(HttpStatusCode.Accepted)
        }

        tbDexServer.submit(SubmitKind.order) { call, message, offering ->
            exchangesApiProvider.write(message)
            call.respond(HttpStatusCode.Accepted)
        }

        tbDexServer.submit(SubmitKind.close) { call, message, offering ->
            exchangesApiProvider.write(message)
            call.respond(HttpStatusCode.Accepted)
        }
        // :snippet-end:

        // :snippet-start: pfiOverviewServerStartKt
        tbDexServer.start()
        // :snippet-end:
    }
}