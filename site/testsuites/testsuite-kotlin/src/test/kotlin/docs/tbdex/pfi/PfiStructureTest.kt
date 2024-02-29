package website.tbd.developer.site.docs.tbdex.pfi

import tbdex.sdk.httpserver.TbdexHttpServer
import tbdex.sdk.httpserver.TbdexHttpServerConfig
import java.net.HttpURLConnection
import java.net.URL
import kotlin.concurrent.thread
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

        thread {
            // :snippet-start: pfiOverviewServerStartKt
            tbDexServer.start()
            // :snippet-end:
        }

        // Delay to ensure the server has started
        Thread.sleep(1000)

        // Test calls against the server
        val url = URL("http://localhost:8080/")
        val connection = url.openConnection() as HttpURLConnection
        connection.requestMethod = "GET"

        val responseCode = connection.responseCode
        if (responseCode != HttpURLConnection.HTTP_OK) {
            fail("http response failed")
        }

        connection.disconnect()
    }
}
