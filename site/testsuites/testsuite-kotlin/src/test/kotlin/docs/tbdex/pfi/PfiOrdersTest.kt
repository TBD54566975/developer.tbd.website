package website.tbd.developer.site.docs.tbdex.pfi

import de.fxlae.typeid.TypeId
import foundation.identity.did.Service
import tbdex.sdk.httpserver.models.*
import tbdex.sdk.protocol.models.*
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import website.tbd.developer.site.docs.tbdex.*
import java.net.URI

class PfiOrdersTest {
    fun main() {

        // Set up DIDs
        val dataProvider = MockDataProviderTest()
        val serviceToAdd = Service.builder()
            .id(URI("pfi"))
            .type("PFI")
            .serviceEndpoint("tbdex-pfi.tbddev.org")
            .build()

        val pfiOptions = CreateDidDhtOptions(
            publish = true,
            services = listOf(serviceToAdd),
        )
        val senderOptions = CreateDidDhtOptions(publish = true)

        val pfiDid = DidDht.create(InMemoryKeyManager(), pfiOptions)
        val senderDid = DidDht.create(InMemoryKeyManager(), senderOptions)
        val exchangesApiProvider = ExchangesApiProviderTest()

        val orderMessage = Order.create(
            to = pfiDid.uri,
            from = senderDid.uri,
            exchangeId = TypeId.generate(MessageKind.rfq.name)
        )

        // :snippet-start: pfiOrderStatusKt
        if (orderMessage.metadata.kind == MessageKind.order ) {
            val orderStatus = OrderStatus.create(
                to = pfiDid.uri,
                from = orderMessage.metadata.from,
                exchangeId = orderMessage.metadata.exchangeId,
                orderStatusData = OrderStatusData("PROCESSING")
            )

            orderStatus.sign(pfiDid)
            exchangesApiProvider.write(orderStatus)
        }
        // :snippet-end:

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
    }
}

