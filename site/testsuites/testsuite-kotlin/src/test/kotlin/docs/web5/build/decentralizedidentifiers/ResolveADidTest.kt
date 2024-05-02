package website.tbd.developer.site.docs.web5.build.decentralizedidentifiers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.methods.dht.CreateDidDhtOptions

// :prepend-start: resolveADidKT
import web5.sdk.dids.DidResolvers
// :prepend-end:

/**
 * Tests backing the Resolve a DID Guide
 */

internal class HowToResolveADidTest {
  @Test
  fun `resolve a DID`() {
    val userDid = DidDht.create(InMemoryKeyManager(), CreateDidDhtOptions(publish = true))
    val userDidUri = userDid.uri

    // :snippet-start: resolveADidKT
    val resolvedDid = DidResolvers.resolve(userDidUri)
    // access DID Document
    val didDocument = resolvedDid.didDocument
    // :snippet-end:

    assertNotNull(didDocument, "DID Document should not be null") 
    assertNotNull(didDocument?.verificationMethod, "DID Document should have verification methods")  
  }
}