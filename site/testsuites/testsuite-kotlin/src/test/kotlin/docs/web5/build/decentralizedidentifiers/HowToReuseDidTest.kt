package website.tbd.developer.site.docs.web5.build.decentralizedidentifiers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.crypto.InMemoryKeyManager

// :prepend-start: exportDidKt
import web5.sdk.dids.methods.jwk.DidJwk
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.did.BearerDid
// :prepend-end:

/**
 * Tests backing the Import a DID Guide
 */

internal class HowToImportDidTest {
  @Test
  fun `export DID`() {
    val keyManager = InMemoryKeyManager()
    val didDht = DidDht.create(keyManager, CreateDidDhtOptions(publish = true))
    val didJwk = DidJwk.create(keyManager)

    // :snippet-start: exportDidKt
    // export did:dht DID
    val portableDhtDid = didDht.export()
    // export did:jwk DID
    val portableJwkDid = didJwk.export()
    // :snippet-end:

    assertEquals(portableDhtDid.document.id, didDht.uri, "PortableDid DHT should be the same as DID uri")
    assertEquals(portableJwkDid.document.id, didJwk.uri, "PortableDid JWK should be the same as DID uri")
  }
  @Test
  fun `import DID`() {
    val keyManager = InMemoryKeyManager()
    val didDht = DidDht.create(keyManager, CreateDidDhtOptions(publish = true))
    val didJwk = DidJwk.create(keyManager)

    val portableDhtDid = didDht.export()
    val portableJwkDid = didJwk.export()


    // :snippet-start: importDidKt
    // import did:dht DID
    val bearerDidDht = BearerDid.import(portableDhtDid)
    // import did:jwk DID
    val bearerDidJwk = BearerDid.import(portableJwkDid)
    // :snippet-end:

    assertEquals(portableDhtDid.document.id, bearerDidDht.uri, "PortableDid DHT should be the same as Bearer DID uri")
    assertEquals(portableJwkDid.document.id, bearerDidJwk.uri, "PortableDid JWK should be the same as Bearer DID uri")
  }
}
