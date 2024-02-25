package website.tbd.developer.site.java.docs.web5.build.decentralizedidentifiers;

import foundation.identity.did.DIDDocument;
import org.junit.jupiter.api.Test;
import web5.sdk.crypto.InMemoryKeyManager;
import web5.sdk.dids.DidResolutionResult;
import web5.sdk.dids.methods.dht.CreateDidDhtOptions;
import web5.sdk.dids.methods.dht.DidDht;
import web5.sdk.dids.methods.jwk.DidJwk;
import web5.sdk.dids.methods.key.DidKey;

import static org.junit.jupiter.api.Assertions.*;

class HowToCreateDidTest
{

  @Test
  void createDidDht(){

    // :snippet-start: createDidDhtJava
    // Creates a DID using the DHT method and publishes the DID Document to the DHT
    final DidDht didDht = DidDht.Default.create(
      new InMemoryKeyManager(),
      new CreateDidDhtOptions(null,null,true,null,null));

    // DID String
    final String did = didDht.getUri();

    // DID and its associated data which can be exported and used in different contexts/apps
    final DidResolutionResult portableDid = DidDht.Default.resolve(did,null);

    // DID Document
    final DIDDocument didDocument = portableDid.getDidDocument();
    // :snippet-end:

    assertNotNull(did,"DID should not be null");
    assertTrue(did.startsWith("did:dht"),"Did should start with 'did:dht'");
    assertEquals(did, didDocument.getId().toString(),"ID of DID Document should match DID");
  }

  @Test
  void createDidJwt() {
    // :snippet-start: createDidJwkJava
    // Creates a DID using the did:jwk method
    final DidJwk didJwk = DidJwk.Companion.create(new InMemoryKeyManager(), null);

    // DID and its associated data which can be exported and used in different contexts/apps
    final DidResolutionResult portableDid = didJwk.resolve();

    // DID String
    final String did = didJwk.getUri();

    // DID Document
    final DIDDocument didDocument = portableDid.getDidDocument();
    // :snippet-end:

    assertNotNull(did, "DID should not be null");
    assertTrue(did.startsWith("did:jwk"), "DID should start with 'did:jwk'");
    assertNotNull(didDocument, "DID Document should not be null");
    assertEquals(did, didDocument.getId().toString(),"ID od DID Document should match DID");
  }

}
