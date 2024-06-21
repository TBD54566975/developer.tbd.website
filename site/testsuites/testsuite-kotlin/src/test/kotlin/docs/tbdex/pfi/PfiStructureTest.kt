package website.tbd.developer.site.docs.tbdex.pfi

import tbdex.sdk.httpserver.TbdexHttpServer
import tbdex.sdk.httpserver.TbdexHttpServerConfig
import java.net.HttpURLConnection
import java.net.URI
import kotlin.concurrent.thread
import website.tbd.developer.site.docs.utils.*
import io.ktor.http.*
import io.ktor.server.response.*
import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PfiStructureTest {

    private val pfiDid = TestData.PFI_DID
    private lateinit var tbDexServer: TbdexHttpServer
    private lateinit var exchangesApiProvider: ExchangesApiProvider
    private lateinit var offeringsApiProvider: OfferingsApiProvider

    @BeforeAll
    fun setup(): Unit {
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
    }

    @AfterAll
    fun tearDown(): Unit {
        tbDexServer.stop()
    }

    @Test
    fun `PFI server is initialized`() {
        assertNotNull(tbDexServer, "Server should not be null")
    }

    @Test
    fun `PFI initializes routes`() {
        // :snippet-start: pfiOverviewServerRoutesKt
        tbDexServer.onCreateExchange { call, message, offering, replyTo ->
            exchangesApiProvider.write(message, replyTo ?: "")
            call.respond(HttpStatusCode.Accepted)
        }

        tbDexServer.onSubmitOrder { call, order ->
            exchangesApiProvider.write(order)
            call.respond(HttpStatusCode.Accepted)
        }

        tbDexServer.onSubmitClose { call, close ->
            exchangesApiProvider.write(close)
            call.respond(HttpStatusCode.Accepted)
        }
        // :snippet-end:

        val actualCallbacks = tbDexServer.callbacks
        assertNotNull(actualCallbacks.createExchange, "Should contain createExchange callback.")
        assertNotNull(actualCallbacks.submitOrder, "Should contain submitOrder callback.")
        assertNotNull(actualCallbacks.submitClose, "Should contain submitClose callback.")
    }

    @Test
    fun `PFI server is started`() {
        thread {
            // :snippet-start: pfiOverviewServerStartKt
            tbDexServer.start()
            // :snippet-end:
        }

        // Delay to ensure the server has started
        Thread.sleep(1000)

        // Test calls against the server
        val url = URI.create("http://localhost:8080/").toURL()
        val connection = url.openConnection() as HttpURLConnection
        connection.requestMethod = "GET"
        connection.disconnect()

        assertEquals(connection.responseCode, HttpURLConnection.HTTP_OK, "Server should be running")
    }
}
