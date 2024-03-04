
package website.tbd.developer.site.docs.tbdex.wallet

import foundation.identity.did.Service
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
import java.net.URI
import website.tbd.developer.site.docs.utils.TestData
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

// :prepend-start: isPFIKt
import web5.sdk.dids.DidResolvers
// :prepend-end:

/**
 * Tests for Wallet AllowList guide
 */
class PfiAllowListTest {

    @Test
    fun `check if DID has PFI service`() {
        val pfiDid = TestData.PFI_DID.uri
    
        // :snippet-start: isPFIKt
        val isPFI = DidResolvers
        .resolve(pfiDid)
        .didDocument
        ?.services
        ?.any { it.type == "PFI" }
        ?: false
        // :snippet-end:

        assertTrue(isPFI, "DID should have a PFI service")
    }
}
