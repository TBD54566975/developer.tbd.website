package website.tbd.developer.site.docs.tbdex.pfi

import foundation.identity.did.Service
import tbdex.sdk.httpserver.models.*
import tbdex.sdk.protocol.models.*
import tbdex.sdk.httpserver.TbdexHttpServer
import tbdex.sdk.httpserver.TbdexHttpServerConfig
import web5.sdk.dids.methods.dht.DidDht
import tbdex.sdk.httpserver.models.SubmitKind
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import website.tbd.developer.site.docs.tbdex.*
import java.net.URI
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions

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
    
        // :snippet-start: pfiOrdersStatusKt
        if (message.kind == 'order') {
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
    }
}

