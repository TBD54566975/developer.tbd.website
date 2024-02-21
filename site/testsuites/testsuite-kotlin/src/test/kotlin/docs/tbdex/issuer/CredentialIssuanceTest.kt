package website.tbd.developer.site.docs.tbdex

import com.nimbusds.jwt.JWTClaimsSet
import org.junit.jupiter.api.Assertions.*
import com.nimbusds.jwt.JWTParser
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.http.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import web5.sdk.dids.Did
import web5.sdk.credentials.VerifiableCredential
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
import java.security.SignatureException
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.http.*


// :snippet-start: sanctionsCredentialClassKt
data class SanctionsCredential(val listsCleared: List<String>)
// :snippet-end:
// :snippet-start: checkSacntionsListsFunctionAndSanctionsListResultClassKt
fun checkSanctionsList(): SanctionsListResult {
    // Implement sanctions list check logic
    return SanctionsListResult(
        isSanctioned = false, 
        listsCleared = listOf(
            "FBI's Most Wanted", "USA Watchlist", "EU Watchlist"
            )
        )
}

// sanctionsListResult class 
data class SanctionsListResult(val isSanctioned: Boolean, val listsCleared: List<String>)
// :snippet-end:

class CredentialIssuanceTest {

    @Test
    fun `create() creates a credential with expected fields`() {
        val issuerDid = generateTestDid()
        val subjectDid = "did:dht:aq5ek9jbf8kota7ufcbgnnc4ikkfpd8b1u9on1b1n7k7wdcapbgo"

        val sanctionsListResult = SanctionsListResult(
            isSanctioned = false,
            listsCleared = listOf("FBI's Most Wanted", "USA Watchlist", "EU Watchlist")
        )

        val createdCredential = VerifiableCredential.create(
            type = "SanctionsCredential",
            issuer = issuerDid.uri.toString(),
            subject = subjectDid,
            data = sanctionsListResult
        )

        assertNotNull(createdCredential, "The created credential should not be null.")
        assertEquals("SanctionsCredential", createdCredential.type, "The credential type should match.")
        assertEquals(issuerDid.uri.toString(), createdCredential.issuer, "The issuer should match.")
    }

    @Test
    fun `sign() method signs the credential and returns a non-empty string`() {
        val issuerDid = generateTestDid()
        val subjectDid = "did:dht:aq5ek9jbf8kota7ufcbgnnc4ikkfpd8b1u9on1b1n7k7wdcapbgo"

        val sanctionsListResult = SanctionsListResult(
            isSanctioned = false,
            listsCleared = listOf("FBI's Most Wanted, USA Watchlist", "EU Watchlist")
        )

        val sanctionsCredential = VerifiableCredential.create(
            type = "SanctionsCredential",
            issuer = issuerDid.uri.toString(),
            subject = subjectDid,
            data = sanctionsListResult
        )

        val signedCredential = sanctionsCredential.sign(issuerDid)

        assertTrue(signedCredential.isNotEmpty(), "The signed credential should not be an empty string.")
    }

    @Test
    fun `verify() does not throw an exception for a valid JWT`() {
        val validJwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3djSmkzeVVONDJFZ1N2cmNHRlFyQzRKY1pkenlWWkhQOVdmMXFRZWRuVlRQI3o2TWt3Y0ppM3lVTjQyRWdTdnJjR0ZRckM0SmNaZHp5VlpIUDlXZjFxUWVkblZUUCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSWRlbnRpZmljYXRpb25DcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6MDQ3ZTg0ZWItY2NhMS00NjFlLWFjZjAtMGMyZGE5ZDczOTNhIiwiaXNzdWVyIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJpc3N1YW5jZURhdGUiOiIyMDI0LTAyLTE1VDE5OjMyOjE2WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJuYW1lIjoiam9obiJ9fSwiaXNzIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJzdWIiOiJkaWQ6a2V5Ono2TWt3Y0ppM3lVTjQyRWdTdnJjR0ZRckM0SmNaZHp5VlpIUDlXZjFxUWVkblZUUCJ9.7oFAPckx-vxCbbzKSk9bU7eXlnjBFvMborl9woHCbcvWaLt0LvTRuDfvGDPC24V9D1K5OFpTnnBiN5jtIOmbBg" 

        assertDoesNotThrow {
            VerifiableCredential.verify(validJwt)
        }
    }


    private fun generateTestDid(): Did {
        val issuerDid = DidDht.create(InMemoryKeyManager(), CreateDidDhtOptions(publish = true))
        return issuerDid
    }

    private fun Application.configureRouting() {
        val issuerDid = generateTestDid()
        // :snippet-start: checkSanctionsEndpointKt
        routing {
            get("/check-sanctions") {
                try {
                    val authHeader = call.request.header("Authorization")

                    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                        call.respond(HttpStatusCode.Unauthorized, "Authorization header required")
                        return@get
                    }

                    val compactJwt = authHeader.removePrefix("Bearer ")
                    var signerDid: String? = null

                    try {
                        VerifiableCredential.verify(compactJwt)

                        // Assuming the user signed the JWT, this is their DID
                        val claimsSet: JWTClaimsSet = JWTParser.parse(compactJwt).jwtClaimsSet
                        signerDid = claimsSet.subject
                    } catch (e: SignatureException) {
                        println("JWT Verification failed: ${e.message}")
                        call.respond(HttpStatusCode.Unauthorized, "Invalid token")
                        return@get
                    }

                    signerDid?.let { did ->
                        // Perform the sanctions check and get the result
                        val sanctionsListResult = checkSanctionsList()
                        // :snippet-end:

                        //:snippet-start: createVerifiableCredentialWithSanctionsListResultKt
                        // Check if the sanctions list result is valid for credential creation
                        if (sanctionsListResult.isSanctioned) {
                            call.respond(
                                HttpStatusCode.Forbidden,
                                "User is not eligible for a credential due to sanctions"
                            )
                            return@get
                        }

                        //highlight-start
                        val sanctionsCredential = VerifiableCredential.create(
                            type = "SanctionsCredential",
                            issuer = issuerDid.uri.toString(),
                            subject = did,
                            data = SanctionsCredential(sanctionsListResult.listsCleared)
                        )
                        //highlight-end
                        //:snippet-end:

                        // :snippet-start: signCreatedSanctionsCredentialKt
                        
                        //highlight-start
                        // Sign the credential
                        val credentialToken = sanctionsCredential.sign(issuerDid)
                        //highlight-end

                        call.respond(
                            HttpStatusCode.OK, 
                            "Signed Credential Token: $credentialToken"
                        )
                    } ?: run {
                        call.respond(
                            HttpStatusCode.BadRequest, 
                            "Signer DID could not be determined from the JWT"
                        )
                    }

                } catch (e: Exception) {
                    println("An unexpected error occurred: ${e.message}")
                    call.respond(
                        HttpStatusCode.InternalServerError, 
                        "An unexpected error occurred: ${e.message}"
                    )
                }
            }
        }
        //:snippet-end:
    }

}











