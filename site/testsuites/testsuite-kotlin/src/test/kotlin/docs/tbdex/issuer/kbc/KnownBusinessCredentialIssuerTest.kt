package website.tbd.developer.site.docs.web5.build.verifiablecredentials;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*
import web5.sdk.credentials.VerifiableCredential
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.didcore.Service
import java.time.Instant
import web5.sdk.credentials.CredentialSchema
import java.util.Date

/**
 * Tests backing the KBC Issuance Guide
 */
internal class VcIssuanceTest {
    @Test
    fun `createEmploymentCredentialKt returns a credential`() {
    val serviceToAdd = Service.Builder()
        .id("pfi")
        .type("PFI")
        .serviceEndpoint(listOf("https://example.com/"))
        .build()

        val options = CreateDidDhtOptions(
            publish = true,
            services = listOf(serviceToAdd),
        )

        val pfiDid = DidDht.create(InMemoryKeyManager())
        val subjectDid = DidDht.create(InMemoryKeyManager())
        val subjectDidUri = subjectDid.uri

        // :snippet-start: issueKbcKt
        val kbc = VerifiableCredential.create(
            issuer = pfiDid.uri, // Issuers's DID URI
            subject = subjectDidUri, // Wallet app's DID URI
            expirationDate = Date.from(Instant.parse("2025-09-30T12:34:56Z")), // Date the KBC should expire
            data = (), // Optional: Custom attributes for the KBC
            credentialSchema = CredentialSchema(
                type: "JsonSchema", // Format type of the schema used for the KBC
                 id: "https://vc.schemas.host/kbc.schema.json" // URL to the schema used for the KBC
            )
        )
        val signedKbc = kbc.sign(employerDid)
       // :snippet-end:
       assertNotNull(vc)
       assertEquals(employerDid.uri, vc.issuer)
       assertEquals(employeeDid.uri, vc.subject)

       assertNotNull(signedKbc)
       assertTrue(signedKbc.matches(Regex("^[a-zA-Z0-9-_]+\\.[a-zA-Z0-9-_]+\\.[a-zA-Z0-9-_]+$")))
    }
}