package website.tbd.developer.site.docs.tbdex.pfi

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

// :snippet-start: pfiOnboardingImportsKt
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.didcore.Service
// :snippet-end:
import web5.sdk.crypto.InMemoryKeyManager

/**
 * Tests for PFI Onboarding guide
 */
class PfiOnboardingTest {

  @Test
  fun `create PFI DID`() {
    val keyManager = InMemoryKeyManager()
    // :snippet-start: pfiOnboardingCreateDidKt
    val serviceToAdd = Service.Builder()
        .id("pfi")
        .type("PFI")
        .serviceEndpoint(listOf("https://example.com/"))
        .build()

    val options = CreateDidDhtOptions(
        publish = true,
        services = listOf(serviceToAdd),
    )

    val pfiDid = DidDht.create(keyManager, options)
    // :snippet-end:

    assertEquals("PFI", pfiDid.document.service?.get(0)?.type, "DID should start with 'did:dht'")
  }
}
