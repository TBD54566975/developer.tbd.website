package website.tbd.developer.site.docs.tbdex.pfi

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

// :snippet-start: pfiOnboardingImportsKt
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.didcore.Service
import java.net.URI
// :snippet-end:

/**
 * Tests for PFI Onboarding guide
 */
class PfiOnboardingTest {

  @Test
  fun `create PFI DID`() {

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

    val pfiDid = DidDht.create(InMemoryKeyManager(), options)
    // :snippet-end:

    assertEquals("PFI", pfiDid.didDocument?.service?.get(0)?.type, "DID should start with 'did:dht'")
  }
}
