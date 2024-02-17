package website.tbd.developer.site.docs.web5.build.verifiablecredentials;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*
import web5.sdk.credentials.VerifiableCredential
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.DidDht
import java.time.Instant
import java.util.Date

/**
 * Tests backing the Vc Issuance Guide
 */
internal class VcIssuanceTest {

    @Test
    fun `createEmploymentCredentialKt returns a credential`() {

        val employerDid = DidDht.create(InMemoryKeyManager())
        val employeeDid = DidDht.create(InMemoryKeyManager())

        // :snippet-start: createEmploymentCredentialKt
        data class EmploymentCredential(
            val position: String, 
            val startDate: String, 
            val employmentStatus: String
        )

        val vc = VerifiableCredential.create(
            type = "EmploymentCredential",
            issuer = employerDid.uri,
            subject = employeeDid.uri,
            expirationDate = Date.from(Instant.parse("2023-09-30T12:34:56Z")),
            data = EmploymentCredential(
                position = "Software Developer",
                startDate = "2021-04-01T12:34:56Z",
                employmentStatus = "Contractor"
            )
        )
        // :snippet-end:

        // :snippet-start: signEmploymentCredentialKt
        val signedVcJwt = vc.sign(employerDid)
        // :snippet-end:

        assertNotNull(vc)
        assertEquals("EmploymentCredential", vc.type)
        assertEquals(employerDid.uri, vc.issuer)
        assertEquals(employeeDid.uri, vc.subject)
        assertNotNull(vc.vcDataModel.id)
        assertNotNull(vc.vcDataModel.credentialSubject.id)

        assertNotNull(signedVcJwt)
        assertTrue(signedVcJwt.matches(Regex("^[a-zA-Z0-9-_]+\\.[a-zA-Z0-9-_]+\\.[a-zA-Z0-9-_]+$")))
    }
  
}
