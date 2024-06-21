package website.tbd.developer.site.docs.tbdex.wallet

import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import tbdex.sdk.httpclient.TbdexHttpClient
import tbdex.sdk.protocol.models.*
import tbdex.sdk.protocol.serialization.Json
import java.net.HttpURLConnection
import website.tbd.developer.site.docs.utils.*
/**
 * Tests for Wallet: Receiving Quotes guide
 */
class ReceiveQuoteTest {

    private val pfi = TestData.PFI_DID
    private val customerDid = TestData.ALICE_DID
    private lateinit var rfq: Rfq
    private lateinit var quote: Quote
    private lateinit var server: MockWebServer

    @BeforeEach
    fun setup() {
        server = MockWebServer()
        server.start(9000)

        rfq = TestData.getRfq()
        rfq.sign(customerDid)

        quote = Quote.create(
            exchangeId = rfq.metadata.exchangeId,
            from = pfi.uri,
            to = customerDid.uri,
            quoteData = TestData.getQuote().data
        )
        quote.sign(pfi)

        val mockExchange = listOf(rfq, quote)
        val mockRfqResponse = Json.jsonMapper.writeValueAsString(mapOf("data" to mockExchange))
        server.enqueue(MockResponse().setBody(mockRfqResponse).setResponseCode(HttpURLConnection.HTTP_OK))
        server.enqueue(MockResponse().setResponseCode(HttpURLConnection.HTTP_OK))
    }

    @AfterEach
    fun tearDown() {
        server.shutdown()
    }

    @Test
    fun `poll for quote message`() {
      // :snippet-start: pollforQuoteKt
      var quote: Quote? = null
      var close: Close? = null

      //Wait for Quote message to appear in the exchange
      while (quote == null) {
        val exchange = TbdexHttpClient.getExchange(
          pfiDid = rfq.metadata.to,
          requesterDid = customerDid,
          exchangeId = rfq.metadata.exchangeId
        )

        quote = exchange.find { it is Quote } as Quote?

        if (quote == null) {
          // Make sure the exchange is still open
          close = exchange.find { it is Close } as Close?

          if (close != null) { break }
          else {
            // Wait 2 seconds before making another request
            Thread.sleep(2000)
          }
        }
        // :snippet-end:
      }

      assertEquals(rfq.metadata.exchangeId, quote?.metadata?.exchangeId)
      assertNull(close)
    }

    @Test
    fun `cancel exchange`() {
        // :snippet-start: cancelExchangeKt
        val close = Close.create(
            from = customerDid.uri,
            to = quote.metadata.from,
            exchangeId = quote.metadata.exchangeId,
            closeData = CloseData(reason = "Canceled by customer")
        )

        close.sign(customerDid)
        TbdexHttpClient.submitClose(close)
        // :snippet-end:

        assertEquals(close.metadata.exchangeId, quote.metadata.exchangeId)
    }
}
