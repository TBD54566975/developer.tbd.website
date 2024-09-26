package website.tbd.developer.site.docs.web5.build.decentralizedidentifiers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Disabled
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions

// :prepend-start: addServiceToDidDocKT
import web5.sdk.dids.didcore.Service
import web5.sdk.dids.methods.dht.DidDht
// :prepend-end:

/**
 * Tests for the Update a DID guide
 */

internal class HowToUpdateDidTest {
  @Test
  @Disabled
  fun `add service to DID Document`() {
    val keyManager = InMemoryKeyManager()
    var myBearerDid = DidDht.create(keyManager, CreateDidDhtOptions(publish = true))

    // :snippet-start: addServiceToDidDocKT
    // create a new service
    val serviceToAdd = Service.Builder()
      .id("pfi")
      .type("PFI")
      .serviceEndpoint(listOf("https://example.com/"))
      .build()

    // add a service to the DID document
    // BUG: https://github.com/TBD54566975/web5-kt/issues/310
    if(myBearerDid.document.service == null){
     // myBearerDid.document.service = mutableListOf(serviceToAdd);
    }
    else {
     // myBearerDid.document.service.add(serviceToAdd)
    }

    // republish the updated DID document
    DidDht.publish(keyManager, myBearerDid.document)
    // :snippet-end:

    assertEquals(serviceToAdd.type, myBearerDid.document.service?.last()?.type)
  }
}
