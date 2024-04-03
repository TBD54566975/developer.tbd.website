
package website.tbd.developer.site.docs.tbdex.wallet

import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import tbdex.sdk.httpclient.TbdexHttpClient
import tbdex.sdk.protocol.models.Offering
import tbdex.sdk.protocol.serialization.Json
import java.net.HttpURLConnection
import website.tbd.developer.site.docs.utils.*

import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*

/**
 * Tests for Wallet: Get Offerings guide
 */
class GetOfferingsTest {

    private lateinit var server: MockWebServer
    private val pfi = TestData.PFI_DID
    private val pfiDid = pfi.uri

    @BeforeEach
    fun setup() {
        server = MockWebServer()
        server.start(9000) // pfiDid resolves to http://localhost:9000

        val offering = TestData.getOffering(pfiDid, TestData.getPresentationDefinition())
        offering.sign(pfi)
        val mockOfferings = listOf(offering)
        val mockResponseString = Json.jsonMapper.writeValueAsString(mapOf("data" to mockOfferings))
        server.enqueue(MockResponse().setBody(mockResponseString).setResponseCode(HttpURLConnection.HTTP_OK))
    }

    @AfterEach
    fun tearDown() {
        server.shutdown()
    }

    @Test
    fun `get all offerings`() {
        // :snippet-start: walletGetOfferingsKt
        val offerings =  TbdexHttpClient.getOfferings(pfiDid)
        // :snippet-end:

        assertNotEquals(0, offerings.size, "No offerings found from PFI")
    }

    @Test
    fun `find matching offerings`() {
        val pfiDids = arrayOf(pfiDid)

        // :snippet-start: walletFindMatchingOfferingsKt
        val payinCurrencyCode = "USD"; // Desired payin currency code
        val payoutCurrencyCode = "KES"; // Desired payout currency code

        val matchedOfferings = ArrayList<Offering>() // Array to store the matched offerings

        // Loop through the all PFIs in your network
        for (pfiDid in pfiDids) {

            // Makes a request to the PFI to get their offerings
            val offerings = TbdexHttpClient.getOfferings(pfiDid)

            // Filter offerings based on the currency pair
            val filteredOfferings = offerings.filter { offering ->
                offering.data.payin.currencyCode == payinCurrencyCode &&
                offering.data.payout.currencyCode == payoutCurrencyCode
            }

            matchedOfferings.addAll(filteredOfferings)
        }
        // :snippet-end:

        assertNotEquals(0, matchedOfferings.size, "No matching offerings found")
    }
}
