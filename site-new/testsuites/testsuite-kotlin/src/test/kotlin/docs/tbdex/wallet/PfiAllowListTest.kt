
package website.tbd.developer.site.docs.tbdex.wallet

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
        ?.service
        ?.any { it.type == "PFI" }
        ?: false
        // :snippet-end:

        assertTrue(isPFI, "DID should have a PFI service")
    }
}
