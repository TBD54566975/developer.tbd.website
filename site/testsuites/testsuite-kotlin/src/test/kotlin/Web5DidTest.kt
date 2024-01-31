package website.tbd.developer.site

import foundation.identity.did.DID
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.findAssertionMethodById
import web5.sdk.dids.methods.key.DidKey

/**
 * A test ALR stole from the Web5 DIDs TestSuite to validate we can run Web5
 * DID operations in this test environment
 */
class Web5DidTest {
    @Test
    fun `findAssertionMethodById works with default`() {
        // :snippet-start: findAssertionMethodById
        val manager = InMemoryKeyManager()
        val did = DidKey.create(manager)

        val verificationMethod = did.resolve()
            .didDocument!!
                .findAssertionMethodById()
        // :snippet-end:

        assertEquals("${did.uri}#${DID.fromString(did.uri).methodSpecificId}", verificationMethod.id.toString())
    }

}
