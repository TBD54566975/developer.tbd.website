package website.tbd.developer.site.docs.tbdex.pfi

import de.fxlae.typeid.TypeId
import foundation.identity.did.Service
import tbdex.sdk.httpserver.models.*
import tbdex.sdk.protocol.models.Order
import tbdex.sdk.protocol.models.OrderStatus
import tbdex.sdk.protocol.models.OrderStatusData
import tbdex.sdk.protocol.models.Close
import tbdex.sdk.protocol.models.CloseData
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import website.tbd.developer.site.docs.tbdex.pfi.*
import website.tbd.developer.site.docs.utils.*
import java.net.URI
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.*

class ProcessingOrdersTest {

    private lateinit var dataProvider: MockDataProvider
    private lateinit var pfiDid: DidDht
    private lateinit var senderDid: DidDht
    private lateinit var exchangesApiProvider: ExchangesApiProvider
    private lateinit var orderMessage: Order

    @BeforeEach
    fun setup() {
        // Set up DIDs
        dataProvider = MockDataProvider()
        val serviceToAdd = Service.builder()
            .id(URI("pfi"))
            .type("PFI")
            .serviceEndpoint("https://example.com/")
            .build()

        val pfiOptions = CreateDidDhtOptions(
            publish = true,
            services = listOf(serviceToAdd),
        )
        val senderOptions = CreateDidDhtOptions(publish = true)

        pfiDid = DidDht.create(InMemoryKeyManager(), pfiOptions)
        senderDid = DidDht.create(InMemoryKeyManager(), senderOptions)
        exchangesApiProvider = ExchangesApiProvider()

        orderMessage = TestData.getOrder(
            to = pfiDid.uri,
            from = senderDid.uri)
    }

    @Test
    fun `PFI creates orderStatus and verifies it`() {
        exchangesApiProvider.setWrite()

        // :snippet-start: pfiOrderStatusKt
            val orderStatus = OrderStatus.create(
                from = pfiDid.uri,
                to = orderMessage.metadata.from,
                exchangeId = orderMessage.metadata.exchangeId,
                orderStatusData = OrderStatusData("PROCESSING")
            )

            orderStatus.sign(pfiDid)
            exchangesApiProvider.write(orderStatus)
        // :snippet-end:

        assertNotNull(orderStatus.verify(), "OrderStatus signature is invalid")
        assertEquals(orderStatus.data.orderStatus, "PROCESSING", "OrderStatus was not correctly set")
    }

    
    @Test
    fun `PFI creates Close and verifies it`() {
        exchangesApiProvider.setWrite()

        // :snippet-start: pfiCloseOrderKt
        val closeMessage = Close.create(
            to = orderMessage.metadata.from,
            from = pfiDid.uri,
            exchangeId = orderMessage.metadata.exchangeId,
            closeData = CloseData(reason = "COMPLETED")
        )
        closeMessage.sign(pfiDid)
        exchangesApiProvider.write(closeMessage)
        // :snippet-end:

        assertNotNull(closeMessage.verify(), "Close signature is invalid")
    }
}

