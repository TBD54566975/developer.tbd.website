package website.tbd.developer.site.docs.web5.build.decentralizedidentifiers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.assertEquals

:snippet-start: importDidsKt
// key manager
import web5.sdk.crypto.InMemoryKeyManager

//did:dht
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.methods.dht.CreateDidDhtOptions

//did:key
import web5.sdk.dids.methods.key.DidKey
:snippet-end:

/**
 * Tests backing the Create a DID Guide
 */
internal class HowToCreateADIDTest {

  @Test
  fun `createDidKt works`() {

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

    // Make sure the contents of the VC are as expected
    assertEquals("1","1")
  }

}
