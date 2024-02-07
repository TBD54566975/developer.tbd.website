package website.tbd.developer.site.docs.web5.build.decentralizedidentifiers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.key.DidKey

/**
 * Tests backing the Create a DID Guide
 */
internal class HowToCreateDidTest {

  @Test
  fun `create DidDht`() {

    // :snippet-start: createDidDht
    //Creates a DID using the DHT method and publishes the DID Document to the DHT
    val didDht = DidDht.create(InMemoryKeyManager(), CreateDidDhtOptions(publish = true))

    //DID and its associated data which can be exported and used in different contexts/apps
    val portableDid = DidDht.resolve(didDht.uri)

    //DID string
    val did = didDht.uri

    //DID Document
    val didDocument = portableDid.didDocument
    // :snippet-end:

    assertNotNull(did, "DID should not be null")
    assertTrue(did.startsWith("did:dht"), "DID should start with 'did:dht'")
    assertEquals(did.toString(), didDocument?.id!!.toString(), "id of DID Document should match DID")

  }

  @Test
  fun `create DidKey`() {
    // :snippet-start: createDidKey
    // Creates a DID using the did:key method
    val didKey = DidKey.create(InMemoryKeyManager());

    //DID and its associated data which can be exported and used in different contexts/apps
    val portableDid = didKey.resolve()

    //DID string
    val did = didKey.uri

    //DID Document
    val didDocument = portableDid.didDocument
    // :snippet-end:

    assertNotNull(did, "DID should not be null")
    assertTrue(did.startsWith("did:key"), "DID should start with 'did:key'")
    assertNotNull(didDocument, "DID Document should not be null")
    assertEquals(did.toString(), didDocument?.id!!.toString(), "id of DID Document should match DID")
  }

  @Test
  fun `imports for creating Did`() {
    val requiredImports =
        """
        // :snippet-start: requiredDidImportsKt
        //did:dht
        import web5.sdk.dids.methods.dht.DidDht
        import web5.sdk.dids.methods.dht.CreateDidDhtOptions

        //did:key
        import web5.sdk.dids.methods.key.DidKey

        // key manager
        import web5.sdk.crypto.InMemoryKeyManager
        // :snippet-end:
        """
  }

}
