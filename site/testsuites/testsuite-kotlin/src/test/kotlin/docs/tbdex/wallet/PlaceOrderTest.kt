package website.tbd.developer.site.docs.tbdex.wallet

import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*
import tbdex.sdk.httpclient.TbdexHttpClient
import tbdex.sdk.httpclient.models.TbdexResponseException
import tbdex.sdk.protocol.models.Close
import tbdex.sdk.protocol.models.Order
import tbdex.sdk.protocol.models.OrderStatus
import tbdex.sdk.protocol.serialization.Json
import java.net.HttpURLConnection
import website.tbd.developer.site.docs.utils.*


/**
 * Tests for Wallet: Placing Orders guide
 */
class PlaceOrderTest {

    private val pfi = TestData.PFI_DID
    private val customerDid = TestData.ALICE_DID
    private lateinit var server: MockWebServer
    private lateinit var getExchangeResponse: String

    @BeforeEach
    fun setup(){
        server = MockWebServer()
        server.start(9000)
    }

    @AfterEach
    fun tearDown() {
        server.shutdown()
    }

    @Test
    fun `send Order message`() {
        server.enqueue(MockResponse().setResponseCode(HttpURLConnection.HTTP_OK))

        val quote = TestData.getQuote()
        // :snippet-start: createOrderKt
        val order = Order.create(
            from = customerDid.uri,                 // Customer's DID
            to = quote.metadata.from,               // PFI's DID
            exchangeId = quote.metadata.exchangeId // Exchange ID from the Quote
        )
        // :snippet-end:

        // :snippet-start: signOrderKt
        order.sign(customerDid)
        // :snippet-end:

        try {
            // :snippet-start: sendOrderKt
            TbdexHttpClient.submitOrder(order)
            // :snippet-end:
        } catch (e: TbdexResponseException) {
            Assertions.fail("Failed to send Order message to PFI: $e")
        }
    }

    @Test
    fun `listen for Order Status updates`() {
        val order = TestData.getOrder().apply { sign(customerDid) }
        val orderStatus = TestData.getOrderStatus().apply { sign(pfi) }
        val close = TestData.getClose().apply { sign(pfi) }

        val orderStatusMsg = orderStatus.data.orderStatus;
        val closeReason = close.data.reason

        val mockExchange = listOf(orderStatus, close)
        getExchangeResponse = Json.jsonMapper.writeValueAsString(mapOf("data" to mockExchange))
        server.enqueue(MockResponse().setBody(getExchangeResponse).setResponseCode(HttpURLConnection.HTTP_OK))

        // :snippet-start: listenForOrderStatusKt
        var orderStatusUpdate: String? = ""
        var closeMessage: Close? = null

        while (closeMessage == null) {
            val exchange = TbdexHttpClient.getExchange(
                pfiDid = order.metadata.to,
                requesterDid = customerDid,
                exchangeId = order.metadata.exchangeId.toString()
            )

            for (message in exchange) {
                when (message) {
                    is OrderStatus -> {
                        // a status update to display to your customer
                        orderStatusUpdate = message.data.orderStatus
                    }
                    is Close -> {
                        // final message of exchange has been written
                        closeMessage = message
                    }
                    else -> {}
                }
            }
        }
        // :snippet-end:
        assertEquals(orderStatusMsg, orderStatusUpdate, "Order Status message is incorrect")

        // :snippet-start: getCloseReasonKt
        val reasonForClose = closeMessage.data.reason
        // :snippet-end:
        assertEquals(closeReason, reasonForClose, "Close reason is incorrect")
    }
}