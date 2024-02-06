
package website.tbd.developer.site.docs.tbdex.wallet

import foundation.identity.did.Service
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
import java.net.URI

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

/**
 * Tests for Wallet AllowList guide
 */
class PfiAllowListTest {

    @Test
    fun `check if DID has PFI service`() {
        val serviceToAdd = Service.builder()
            .id(URI("pfi"))
            .type("PFI")
            .serviceEndpoint("tbdex-pfi.tbddev.org")
            .build()

        val options = CreateDidDhtOptions(
            publish = true,
            services = listOf(serviceToAdd),
        )

        val pfiDid = DidDht.create(InMemoryKeyManager(), options)
    
    // :snippet-start: isPFIKt
        val isPFI = pfiDid.didDocument?.services?.any { it.type == "PFI" } ?: false
        // :snippet-end:

        assertTrue(isPFI, "DID should have a PFI service")
    }
}
