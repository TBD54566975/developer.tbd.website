package website.tbd.developer.site.docs.web5.build.decentralizedidentifiers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

// key manager
import web5.sdk.crypto.InMemoryKeyManager

//did:dht
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.methods.dht.CreateDidDhtOptions

//did:key
import web5.sdk.dids.methods.key.DidKey

/**
 * Tests backing the Create a DID Guide
 */
internal class HowToCreateDidTest {

  @Test
  fun `able to create DidDht`() {

    // :snippet-start: createDidDhtKt
    val keyManager = InMemoryKeyManager()
    val options = CreateDidDhtOptions(publish = true)
    val didDht = DidDht.create(keyManager, options)

    //DID and its associated data which can be exported and used in different contexts/apps
    val portableDID = DidDht.resolve(didDht.uri)

    //DID string
    val did = didDht.uri

    //DID Document
    val didDocument = portableDID.didDocument
    // :snippet-end:

    assertNotNull(did, "DID should not be null")
    assertTrue(did.startsWith("did:"), "DID should start with 'did:'")
    assertNotNull(didDocument, "DID Document should not be null")
  }

  @Test
  fun `able to create DidKey`() {

      // :snippet-start: createDidKeyKt
    // Creates a DID using the did:key method
    val keyManager = InMemoryKeyManager()
    val didKey = DidKey.create(keyManager);

    //DID and its associated data which can be exported and used in different contexts/apps
    val portableDID = didKey.resolve()

    //DID string
    val did = didKey.uri

    //DID Document
    val didDocument = portableDID.didDocument
    // :snippet-end:

    assertNotNull(did, "DID should not be null")
    assertTrue(did.startsWith("did:"), "DID should start with 'did:'")
    assertNotNull(didDocument, "DID Document should not be null")

  }

  @Test
  fun `imports for creating Did`() {
    val requiredImports =
        """
        // :snippet-start: requiredDidImportsKt
        // key manager
        import web5.sdk.crypto.InMemoryKeyManager

        //did:dht
        import web5.sdk.dids.methods.dht.DidDht
        import web5.sdk.dids.methods.dht.CreateDidDhtOptions

        //did:key
        import web5.sdk.dids.methods.key.DidKey

        // :snippet-end:
        """

        assertNotNull(requiredImports, "Required should not be null")
  }

}
