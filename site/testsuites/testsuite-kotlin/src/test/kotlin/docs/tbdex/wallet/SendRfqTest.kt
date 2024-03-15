package website.tbd.developer.site.docs.tbdex.wallet

import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.fail
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import tbdex.sdk.httpclient.TbdexHttpClient
import tbdex.sdk.httpclient.models.TbdexResponseException
import tbdex.sdk.protocol.models.Offering
import tbdex.sdk.protocol.models.Rfq
import tbdex.sdk.protocol.models.RfqData
import tbdex.sdk.protocol.models.SelectedPaymentMethod
import java.net.HttpURLConnection
import website.tbd.developer.site.docs.utils.TestData

/**
 * Tests for Wallet: Sending RFQs guide
 */
class SendRfqTest {

    private val pfi = TestData.PFI_DID
    private val customerDid = TestData.ALICE_DID
    private lateinit var selectedOffering: Offering
    private lateinit var server: MockWebServer

    @BeforeEach
    fun setup() {
        selectedOffering = TestData.getOffering(
            pfi.uri,
            TestData.getPresentationDefinition()
        )
        selectedOffering.sign(pfi)

        //Mock PFI Server
        server = MockWebServer()
        server.start(9000) // pfiDid resolves to http://localhost:9000
        server.enqueue(MockResponse().setResponseCode(HttpURLConnection.HTTP_OK))
    }

    @AfterEach
    fun tearDown() {
        server.shutdown()
    }

    @Test
    fun `get all skeleton RFQ - properties`() {
        val skeleton = """
        // :snippet-start: skeletonRfqMessageKt
        val rfq = Rfq.create(
            to,    //metadata
            from,  //metadata
            rfqData = RfqData() //data
        )
        // :snippet-end:
        """

        //no assertions needed; this is just showing how to structure a RFQ
    }

    @Test
    fun `skeleton RFQ - metadata`() {
        val skeleton = """
        // :snippet-start: rfqMetadataKt
        val rfq = Rfq.create(
            //metadata
            //highlight-start
            to = selectedOffering.metadata.from,    // PFI's DID
            from = customerDid.uri,  // Customer DID
            //highlight-end
            //data
            rfqData = RfqData()
        )
        // :snippet-end:
        """

        //no assertions needed; this is just showing how to structure a RFQ
    }

    @Test
    fun `create signed RFQ message and send to PFI`() {
        val BTC_ADDRESS = "bc1q52csjdqa6cq5d2ntkkyz8wk7qh2qevy04dyyfd"
        val selectedCredentials = emptyList<String>()

        // :snippet-start: createRfqMessageKt
        val rfq = Rfq.create(
            to = selectedOffering.metadata.from,  // PFI's DID
            from = customerDid.uri,  // Customer DID
            //highlight-start
            rfqData = RfqData(
                offeringId = selectedOffering.metadata.id, // The ID of the selected offering
                payinAmount = "0.012", // The amount of the payin currency
                payinMethod = SelectedPaymentMethod(
                    "BTC_ADDRESS", // The method of payment
                    mapOf("btcAddress" to BTC_ADDRESS) // Customer's BTC wallet address
                ),
                payoutMethod = SelectedPaymentMethod(
                    "DEBIT_CARD", // The method for receiving payout
                    mapOf(
                        "cvv" to "123",
                        "cardNumber" to "1234567890123456789",
                        "expiryDate" to "05/25",
                        "cardHolderName" to "Alice Doe"
                    )
                ),
                claims = selectedCredentials // Array of signed VCs required by the PFI
            )
            //highlight-end
        )
        // :snippet-end:

        // :snippet-start: signRfqMessageKt
        rfq.sign(customerDid);
        // :snippet-end:

        try{
            // :snippet-start: sendRfqMessageKt
            TbdexHttpClient.createExchange(
                rfq,
                "https://example.com/callback"
            )
            // :snippet-end:

        }catch(e: TbdexResponseException){
            fail("Failed to send RFQ message to PFI: $e")
        }
        assertNotNull(rfq.signature, "RFQ is not signed")
    }
}