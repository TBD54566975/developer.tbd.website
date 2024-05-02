package website.tbd.developer.site.docs.web5.build.decentralizedidentifiers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.methods.dht.CreateDidDhtOptions

// :prepend-start: resolveDidKT
import web5.sdk.dids.DidResolvers
// :prepend-end:

/**
 * Tests backing the Resolve a DID Guide
 */

internal class HowToResolveDidTest {
  @Test
  fun `resolve a DID`() {
    val did = DidDht.create(InMemoryKeyManager(), CreateDidDhtOptions(publish = true))
    val didUri = did.uri

    // :snippet-start: resolveDidKT
    // resolve any DID
    val resolvedDid = DidResolvers.resolve(didUri)
    val didDocument = resolvedDid.didDocument
    // :snippet-end:

    assertNotNull(didDocument, "DID Document should not be null") 
    assertNotNull(didDocument?.verificationMethod, "DID Document should have verification methods")  
  }
}