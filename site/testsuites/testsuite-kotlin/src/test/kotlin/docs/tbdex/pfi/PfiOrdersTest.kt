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
            publish = false,
            services = listOf(serviceToAdd),
        )
        val senderOptions = CreateDidDhtOptions(publish = false)

        val pfiDid = DidDht.create(InMemoryKeyManager(), pfiOptions)
        val senderDid = DidDht.create(InMemoryKeyManager(), senderOptions)
        val exchangesApiProvider = ExchangesApiProviderTest()

        val message = Order.create(
            to = pfiDid.toString(),
            from = senderDid.toString(),
            exchangeId = TypeId.generate(MessageKind.rfq.name)
        )

        // :snippet-start: pfiOrdersStatusKt
        if (message.metadata.kind == MessageKind.order ) {
            val orderStatus = OrderStatus.create(
                to = pfiDid.toString(),
                from = message.metadata.from,
                exchangeId = message.metadata.exchangeId,
                orderStatusData = OrderStatusData("PROCESSING")
            )

            orderStatus.sign(pfiDid)
            exchangesApiProvider.write(orderStatus)
        }
        // :snippet-end:

        // :snippet-start: pfiCloseOrderKt
        val closeMessage = Close.create(
            to = message.metadata.from,
            from = pfiDid.uri,
            exchangeId = message.metadata.exchangeId,
            closeData = CloseData(reason = "COMPLETED")
        )
        closeMessage.sign(pfiDid)
        exchangesApiProvider.write(closeMessage)
        // :snippet-end:
    }
}

