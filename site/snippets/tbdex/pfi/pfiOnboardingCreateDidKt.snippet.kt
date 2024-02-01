import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
import foundation.identity.did.Service
import java.net.URI

val serviceToAdd = Service.builder()
    .id(URI("pfi"))
    .type("PFI")
    .serviceEndpoint("tbdex-pfi.tbddev.org")
    .build()

val options = CreateDidDhtOptions(
    publish = true,
    services = listOf(serviceToAdd),
)

val did = DidDht.create(keyManager, options)