package website.tbd.developer.site.docs.tbdex.pfi

import tbdex.sdk.httpserver.TbdexHttpServer
import tbdex.sdk.httpserver.TbdexHttpServerConfig
import website.tbd.developer.site.docs.utils.*
import tbdex.sdk.httpserver.models.SubmitKind
import io.ktor.http.*
import io.ktor.server.response.*
import org.junit.jupiter.api.*

class PfiStructureTest {

    private val pfiDid = TestData.PFI_DID
    private lateinit var tbDexServer: TbdexHttpServer
    private lateinit var exchangesApiProvider: ExchangesApiProvider
    private lateinit var offeringsApiProvider: OfferingsApiProvider

    @Test
    fun `PFI initializes server`() {
        // :snippet-start: pfiOverviewConfigKt
        exchangesApiProvider = ExchangesApiProvider()
        offeringsApiProvider = OfferingsApiProvider()

        tbDexServer = TbdexHttpServer(TbdexHttpServerConfig(
            port = 8080,
            pfiDid = pfiDid.uri,
            exchangesApi = exchangesApiProvider,
            offeringsApi = offeringsApiProvider
        ))
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
        //tbDexServer.start()
        // :snippet-end:

      /**
       * ALR suggested TODOs:
       *
       * 1) Check with upstream teams if they're expecting that
       *    tbDexServer.start() is a blocking operation. This is why
       *    the test is hanging above at tbDexServer.start() and why it's uncommented now
       * 2) If so, then the test code here using it needs to fire up the
       *    server in another thread. I can show you how to do this.
       * 3) Then make an HTTP client to issue calls into the server
       *    and put your test assertions in there to ensure that the responses are as expected
       */
    }
}
