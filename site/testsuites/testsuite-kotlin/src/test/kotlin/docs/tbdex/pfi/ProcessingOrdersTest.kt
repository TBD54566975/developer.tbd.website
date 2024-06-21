package website.tbd.developer.site.docs.tbdex.pfi

import tbdex.sdk.protocol.models.Order
import tbdex.sdk.protocol.models.OrderStatus
import tbdex.sdk.protocol.models.OrderStatusData
import tbdex.sdk.protocol.models.Close
import tbdex.sdk.protocol.models.CloseData
import website.tbd.developer.site.docs.utils.*
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.*

class ProcessingOrdersTest {

    private lateinit var dataProvider: MockDataProvider
    private val pfiDid = TestData.PFI_DID
    private val customerDid = TestData.ALICE_DID
    private lateinit var exchangesApiProvider: ExchangesApiProvider
    private lateinit var orderMessage: Order

    @BeforeEach
    fun setup() {
        dataProvider = MockDataProvider()
        exchangesApiProvider = ExchangesApiProvider()

        orderMessage = TestData.getOrder(
            to = pfiDid.uri,
            from = customerDid.uri
        )
    }

  @Test
  fun `PFI Accesses Private Data`() {
    val rfq = TestData.getRfq()

    // :snippet-start: pfiAccessPrivateDataKt
    val creditCardNumber = rfq.privateData!!.payin!!.paymentDetails!!["cardNumber"]
    // :snippet-end:

    assertNotNull(creditCardNumber)
  }
    @Test
    fun `PFI creates orderStatus and verifies it`() {
        exchangesApiProvider.setWrite()

        // :snippet-start: pfiOrderStatusKt
        val orderStatus = OrderStatus.create(
            from = pfiDid.uri,
            to = orderMessage.metadata.from,
            exchangeId = orderMessage.metadata.exchangeId,
            protocol = "1.0",
            orderStatusData = OrderStatusData("PROCESSING")
        )

        orderStatus.sign(pfiDid)
        exchangesApiProvider.write(orderStatus)
        // :snippet-end:

        assertEquals(orderStatus.data.orderStatus, "PROCESSING", "OrderStatus was not correctly set")
        assertNotNull(orderStatus.verify(), "OrderStatus signature is invalid")
    }


    @Test
    fun `PFI creates Close and verifies it`() {
        exchangesApiProvider.setWrite()

        // :snippet-start: pfiCloseOrderKt
        val closeMessage = Close.create(
            to = orderMessage.metadata.from,
            from = pfiDid.uri,
            exchangeId = orderMessage.metadata.exchangeId,
            protocol = "1.0",
            closeData = CloseData(
                reason = "COMPLETED",
                success = true // Indicates the transaction was successful
            )
        )

        closeMessage.sign(pfiDid)
        exchangesApiProvider.write(closeMessage)
        // :snippet-end:

        assertEquals(closeMessage.data.reason, "COMPLETED", "Close reason was not correctly set")
        assertNotNull(closeMessage.verify(), "Close signature is invalid")
    }
}
