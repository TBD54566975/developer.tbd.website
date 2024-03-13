package website.tbd.developer.site.docs.tbdex.pfi

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

// :snippet-start: pfiOnboardingImportsKt
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.crypto.InMemoryKeyManager
import foundation.identity.did.Service
import java.net.URI
// :snippet-end:

/**
 * Tests for PFI Onboarding guide
 */
class PfiOnboardingTest {

  @Test
  fun `create PFI DID`() {
    val keyManager = InMemoryKeyManager()
    // :snippet-start: pfiOnboardingCreateDidKt
    val serviceToAdd = Service.builder()
        .id(URI("pfi"))
        .type("PFI")
        .serviceEndpoint("https://example.com/")
        .build()

    val options = CreateDidDhtOptions(
        publish = true,
        services = listOf(serviceToAdd),
    )

    val pfiDid = DidDht.create(keyManager, options)
    // :snippet-end:

    assertEquals("PFI", pfiDid.didDocument?.services?.get(0)?.type, "DID should start with 'did:key'")
  }
}
