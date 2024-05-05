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
import tbdex.sdk.protocol.models.*
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.didcore.Service
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
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
  private lateinit var rfq: Rfq

  @BeforeEach
  fun setup() {
    selectedOffering = TestData.getOfferingWithNoClaims(pfi.uri)
    selectedOffering.sign(pfi)

    rfq = TestData.getRfq()
    rfq.sign(customerDid)

    //Mock PFI Server
    server = MockWebServer()
    server.start(9000) // pfiDid resolves to https://localhost:9000
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
      rfqData = CreateRfqData(
        offeringId = selectedOffering.metadata.id, // The ID of the selected offering
        payin = CreateSelectedPayinMethod(
          kind = "DEBIT_CARD", // The method of payment
          paymentDetails = mapOf(
            "cvv" to "123",
            "cardNumber" to "1234567890123456",
            "expiryDate" to "05/25",
            "cardHolderName" to "Alice Doe"
          ),
          amount = "500.65", // The amount of the payin currency
        ),
        payout = CreateSelectedPayoutMethod(
          kind = "BTC_ADDRESS", // The method for receiving payout
          paymentDetails = mapOf("btcAddress" to BTC_ADDRESS), // Recipient's BTC wallet address
        ),
        claims = selectedCredentials // List of signed VCs required by the PFI
      )
      //highlight-end
    )
    // :snippet-end:

    // :snippet-start: verifyOfferingRequirementsKt
    try{
      rfq.verifyOfferingRequirements(selectedOffering)
    }catch (e: Exception){
      // handle failed verification
    }
    // :snippet-end:

    // :snippet-start: signRfqMessageKt
    rfq.sign(customerDid);
    // :snippet-end:

    try{
      // :snippet-start: sendRfqMessageKt
      TbdexHttpClient.createExchange(rfq)
      // :snippet-end:

    }catch(e: TbdexResponseException){
      fail("Failed to send RFQ message to PFI: $e")
    }
    assertNotNull(rfq.signature, "RFQ is not signed")
  }

  @Test
  fun `send RFQ message with URL as replyTo`(){
    try {
      // :snippet-start: rfqWithUrlReplyToKt
      TbdexHttpClient.createExchange(
        rfq,
        //highlight-next-line
        "https://example.com/callback"
      )
      // :snippet-end:
    }catch(e: TbdexResponseException){
      fail("Failed to send RFQ with URL replyTo: $e")
    }
  }


  @Test
  fun `send RFQ message with DID as replyTo`(){
    val keyManager = InMemoryKeyManager()

    // :snippet-start: createDidWithTbdexServiceKt
    val serviceToAdd = Service.Builder()
      .id("tbdex")
      //highlight-start
      .type("tbdex")
      .serviceEndpoint(listOf("https://example.com/callback"))
      //highlight-end
      .build()

    val options = CreateDidDhtOptions(
      publish = true,
      services = listOf(serviceToAdd),
    )

    val walletDid = DidDht.create(keyManager, options)
    // :snippet-end:

    try {
      // :snippet-start: rfqWithDidReplyToKt
      TbdexHttpClient.createExchange(
        rfq,
        //highlight-next-line
        walletDid.uri
      )
      // :snippet-end:
    }catch(e: TbdexResponseException){
      fail("Failed to send RFQ with DID replyTo: $e")
    }
  }
}
