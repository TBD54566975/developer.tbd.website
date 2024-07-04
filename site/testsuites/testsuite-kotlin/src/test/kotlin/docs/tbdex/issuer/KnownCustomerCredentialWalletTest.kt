package website.tbd.developer.site.docs.tbdex


import org.junit.jupiter.api.Assertions.*
import com.nimbusds.jwt.JWTParser
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.http.*
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import web5.sdk.dids.did.BearerDid
import java.net.URL
import com.nimbusds.jwt.JWTClaimsSet
import java.net.HttpURLConnection
import web5.sdk.credentials.VerifiableCredential

// :prepend-start: knownCustomerCredentialhandleSiopRequestWalletKT
import web5.sdk.credentials.PresentationExchange
import web5.sdk.jose.jwt.Jwt
import web5.sdk.credentials.VerifiablePresentation
import web5.sdk.credentials.model.PresentationDefinitionV2
import web5.sdk.jose.jwt.JwtClaimsSet
// :prepend-end:

import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions

// :prepend-start: knownCustomerCredentialResolveIssuerDidKT
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.methods.jwk.DidJwk
import web5.sdk.dids.DidResolvers
// :prepend-end:

import kotlinx.coroutines.delay
import java.security.SignatureException
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.client.statement.*
import kotlinx.serialization.json.jsonPrimitive

import java.util.concurrent.ConcurrentHashMap
import java.text.SimpleDateFormat
import java.util.Date
import java.net.URLEncoder
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.add
import kotlinx.serialization.json.addJsonObject
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.Serializable
import java.util.UUID
import kotlinx.serialization.json.*
import java.net.URLDecoder
import java.util.*
import io.ktor.http.HttpStatusCode
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.serialization.encodeToString
import java.io.OutputStreamWriter

import web5.sdk.credentials.model.FieldV2
import web5.sdk.credentials.model.ConstraintsV2

import web5.sdk.credentials.model.InputDescriptorV2
import web5.sdk.credentials.model.PresentationSubmission
import com.fasterxml.jackson.databind.ObjectMapper

class KnownCustomerCredentialWalletTest {
    val userBearerDid = DidDht.create(InMemoryKeyManager())
    val issuerDid = DidDht.create(InMemoryKeyManager())
    val issuerDidUri = issuerDid.uri

    val nameCredentialJwt =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSURDYXJkQ3JlZGVudGlhbFBhcnQxIl0sImlkIjoidXJuOnV1aWQ6NTdhNWU4ZWUtYmZlMC00YjQwLWJmMDAtZTA4MTY5ZDk5Y2Q1IiwiaXNzdWVyIjoiZGlkOmRodDpmYzZyNmJnNjl0Nms4dTl1OXN1NTNhYWY2anUxeGRwd2R6dXcza2p1OHNzYW1iM3Bwc3VvIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMy0yMVQyMToyMTo1MVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byIsImdpdmVuX25hbWUiOiJBbGljZSIsImZhbWlseV9uYW1lIjoiU21pdGgifX0sImlzcyI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byIsInN1YiI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byJ9.kt0rKEgZ1_U4eTUNDgUU9LzmFViHsx_1z6llfFAqCdpzwIsKKYbqfbtgckJDsoV9xqgG5TYAVPxeLo5hCAguDA";
    
    val idCredentialJwt =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSURDYXJkQ3JlZGVudGlhbFBhcnQyIl0sImlkIjoidXJuOnV1aWQ6YTM5ZmQ3NjgtNjVjMy00MDZhLWIwMGItMTg1MjIxM2ExYzhjIiwiaXNzdWVyIjoiZGlkOmRodDpmYzZyNmJnNjl0Nms4dTl1OXN1NTNhYWY2anUxeGRwd2R6dXcza2p1OHNzYW1iM3Bwc3VvIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMy0yMVQyMToyMTo1MVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byIsImJpcnRoZGF0ZSI6IjE5OTAtMDEtMDEiLCJuYXRpb25hbF9pZGVudGlmaWVyIjoiMTIzLTQ1LTY3ODkifX0sImlzcyI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byIsInN1YiI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byJ9.lQOBdE3LGQ_rLz69SQoI_auOsFpsOESBIbHNf9HpYTGYTT2aYw8WrKd1rXQuRqzgELcv92iWQRpWoVm193x3CQ";
    
    val userVcJwts = listOf(nameCredentialJwt, idCredentialJwt)

    val presentationDefinition = PresentationDefinitionV2(
        id = "IDCardCredentials",
        inputDescriptors = listOf(
            // Given Name Verification
            InputDescriptorV2(
                id = "givenNameVerification",
                purpose = "We need to verify your given name.",
                constraints = ConstraintsV2(
                    fields = listOf(FieldV2(
                        path = listOf("$.vc.credentialSubject.given_name"),
                        filterJson = ObjectMapper().readTree("""{"type": "string"}""")
                    ))
                )
            ),
            // Family Name Verification
            InputDescriptorV2(
                id = "familyNameVerification",
                purpose = "We need to verify your family name.",
                constraints = ConstraintsV2(
                    fields = listOf(FieldV2(
                        path = listOf("$.vc.credentialSubject.family_name"),
                        filterJson = ObjectMapper().readTree("""{"type": "string"}""")
                    ))
                )
            ),
            // Birthdate Verification
            InputDescriptorV2(
                id = "birthdateVerification",
                purpose = "We need to verify your birthdate.",
                constraints = ConstraintsV2(
                    fields = listOf(FieldV2(
                        path = listOf("$.vc.credentialSubject.birthdate"),
                        filterJson = ObjectMapper().readTree("""{"type": "string", "format": "date"}""")
                    ))
                )
            ),
            // National Identifier Verification
            InputDescriptorV2(
                id = "nationalIdentifierVerification",
                purpose = "We need to verify your national identifier.",
                constraints = ConstraintsV2(
                    fields = listOf(FieldV2(
                        path = listOf("$.vc.credentialSubject.national_identifier"),
                        filterJson = ObjectMapper().readTree("""{"type": "string"}""")
                    ))
                )
            )
        )
    )

    @Test
    fun `presentation exchange selects(), satisfies() and creates() VP`() {
        val selectedCredentials = PresentationExchange.selectCredentials(
            vcJwts = userVcJwts,
            presentationDefinition = presentationDefinition
        )
        val presentationResult = PresentationExchange.createPresentationFromCredentials(
            vcJwts = selectedCredentials,
            presentationDefinition = presentationDefinition
        )

        val vp = VerifiablePresentation.create(
            vcJwts = selectedCredentials,
            holder = userBearerDid.uri,
            additionalData = mapOf("presentation_submission" to presentationResult)
        )

        assertNotNull(selectedCredentials, "Selected credentials should not be null")
        assertTrue(selectedCredentials is List<*>, "Selected credentials should be a list")
        assertEquals(2, selectedCredentials.size, "Selected credentials should contain 2 items")
        assertNotNull(vp, "Verifiable Presentation should not be null")
        assertEquals(userBearerDid.uri, vp.holder, "Holder DID should match")
    }

    @Test
    fun `JwtUtil sign() works with a valid payload and bearer DID`() {
        val idTokenPayload = JwtClaimsSet.Builder()
            .subject(userBearerDid.uri.toString()) 
            .issuer(issuerDidUri) 
            .issueTime(System.currentTimeMillis() / 1000) // Issued time
            .expirationTime((System.currentTimeMillis() / 1000) + 86400) // Expiration time 
            .build()

        try {
            val idToken = Jwt.sign(userBearerDid, idTokenPayload)

            assertNotNull(idToken, "idtoken should not be null")
            assertTrue(idToken.isNotEmpty(), "idtoken should not be empty")
        } catch (e: Exception) {
            fail("Signing should not throw an exception")
        }
    }

    // :snippet-start: knownCustomerCredentialResolveIssuerDidKT
    private suspend fun resolveIssuerDid(issuerDidUri: String): String {
        try {
            /****************************************
            * Resolve DID & Get IDV Service Endpoint
            ****************************************/
            val resolvedDid = DidResolvers.resolve(issuerDidUri)
            val didDocument = resolvedDid.didDocument ?: throw Exception(
                "DID Document is null"
            )

            val idvService = didDocument.service?.find { service ->
                service.type == "IDV"
            } ?: throw Exception("IDV service not found in DID Document")

            return idvService.serviceEndpoint.firstOrNull() ?: throw Exception(
                "Service endpoint not found in IDV service"
            )
        } catch (error: Exception) {
            throw Exception("Error resolving DID: ${error.message}")
        }
    }
    // :snippet-end:

    // :snippet-start: knownCustomerCredentialSendRequestToIdvServiceEndpointKT
    private suspend fun sendRequestToIdvServiceEndpoint(idvServiceEndpoint: String) 
    = coroutineScope {
        val client = HttpClient() 

        try {
            val response: HttpResponse = client.get(idvServiceEndpoint)
            
            if (response.status.value !in 200..299) {
                throw Exception("Network response was not ok: ${response.status}")
            }
            
            val encodedSiopRequest = response.bodyAsText()
            handleSiopRequest(encodedSiopRequest) // function shown in next step
        } catch (error: Exception) {
            throw Exception("There was a problem with the fetch operation: ${error.message}")
        } finally {
            client.close()
        }
    }
    // :snippet-end:

    // :snippet-start: knownCustomerCredentialhandleSiopRequestWalletKT
    private suspend fun handleSiopRequest(encodedSiopRequest: String) {
        /*******************************************************
        * Decode the JAR from the encoded URI string
        *******************************************************/
        val params = encodedSiopRequest.split("&").associate { 
            val (key, value) = it.split("=")
            key to URLDecoder.decode(value, "UTF-8")
        }

        val jwtRequest = params["request"] ?: throw Exception("JWT request missing in SIOP request")

        /************************************************************
        // Verify the JWT, decode its payload & Process SIOP Request
        ************************************************************/
        try {
            VerifiableCredential.verify(jwtRequest)
        } catch (e: Exception) {
            throw Exception("Failed to verify JWT: ${e.message}")
        }

        val claimsSet = JWTParser.parse(jwtRequest).jwtClaimsSet
        val payloadJson = Json.parseToJsonElement(claimsSet.toJSONObject().toString()).jsonObject

        val siopRequest = payloadJson["request"]?.jsonObject ?: throw Exception("Request data not found in JWT payload")

        val clientId = siopRequest["client_id"]?.jsonPrimitive?.content ?: throw Exception("Client ID missing in SIOP request")
        val nonce = siopRequest["nonce"]?.jsonPrimitive?.content ?: throw Exception("Nonce missing in SIOP request")

        /*******************************************************
        * Generate & sign id_token
        *******************************************************/
        val idTokenPayload = JwtClaimsSet.Builder()
            .subject(userBearerDid.uri) // user's DID string
            .issuer(userBearerDid.uri)
            .audience(clientId)
            .issueTime(System.currentTimeMillis() / 1000) // Issued time
            .expirationTime((System.currentTimeMillis() / 1000) + 86400) // Expiration time 
            .misc("nonce", nonce)
            .build()

        val idToken = try {
            Jwt.sign(userBearerDid, idTokenPayload)
        } catch (e: Exception) {
            throw Exception("Failed to sign id_token: ${e.message}")
        }

        var vpToken: String? = null
        if ("vp_token" in siopRequest["response_type"].toString()) {
            /*******************************************************
            * Parse the presentation definition from SIOP request
            *******************************************************/
            val presentationDefinition = Json.decodeFromString<PresentationDefinitionV2>(
                siopRequest["presentation_definition"].toString()
            )

            /*******************************************************
            * Select Credentials based on the Presentation Definition
            *******************************************************/
            val selectedCredentials = PresentationExchange.selectCredentials(
                vcJwts = userVcJwts, // Array of VC JWTs stored in the user's Wallet
                presentationDefinition = presentationDefinition
            )
            try {
                PresentationExchange.satisfiesPresentationDefinition(
                    vcJwts = selectedCredentials,
                    presentationDefinition = presentationDefinition
                )
            } catch (e: Exception) {
                throw Exception("Presentation definition not satisfied: ${e.message}")
            }

            /*******************************************************
            * Generate & sign vp_token
            *******************************************************/
            val presentationResult = PresentationExchange.createPresentationFromCredentials(
                vcJwts = selectedCredentials,
                presentationDefinition = presentationDefinition
            )

            val vp = VerifiablePresentation.create(
                vcJwts = selectedCredentials,
                holder = userBearerDid.uri,
                additionalData = mapOf("presentation_submission" to presentationResult)
            )
            
            val vpClaims = JwtClaimsSet.Builder()
                .subject(userBearerDid.uri) 
                .issuer(userBearerDid.uri) 
                .issueTime(System.currentTimeMillis() / 1000) // Issued time
                .expirationTime((System.currentTimeMillis() / 1000) + 86400) // Expiration time 
                .misc("holder", vp.holder)
                .misc("presentation_submission", presentationResult)
                .build()

            vpToken = try {
                Jwt.sign(userBearerDid, vpClaims) 
            } catch (e: Exception) {
                throw Exception("Failed to sign vp_token: ${e.message}")
            }
        }

        /*******************************************************
        * POST SIOPv2 Authorization response to the response_uri
        *******************************************************/
        val responsePayload = buildJsonObject {
            put("id_token", idToken)
            vpToken?.let { put("vp_token", it) }
        }

        val responseUri = siopRequest["response_uri"]?.jsonPrimitive?.content ?: throw Exception(
            "Response URI missing in SIOP request"
        )
        postSiopResponse(responseUri, responsePayload.toString()) // function shown in next step
    }
// :snippet-end:

    // :snippet-start: knownCustomerCredentialIssuerResponseClassKT
    @Serializable
    data class IssuerResponse(
        val credential_offer: CredentialOffer? = null,
        val url: String? = null
    )

    @Serializable
    data class CredentialOffer(
        val credential_issuer: String,
        val credential_configuration_ids: List<String>,
        val grants: JsonObject
    )
    // :snippet-end:


    // :snippet-start: knownCustomerCredentialpostSiopResponseKT
    private suspend fun postSiopResponse(responseUri: String, responsePayload: String) {
        val url = URL(responseUri)
        val connection = url.openConnection() as HttpURLConnection
        connection.requestMethod = "POST"
        connection.setRequestProperty("Content-Type", "application/json; utf-8")
        connection.setRequestProperty("Accept", "application/json")
        connection.doOutput = true

        try {
            OutputStreamWriter(connection.outputStream).use { outputStreamWriter ->
                outputStreamWriter.write(responsePayload)
                outputStreamWriter.flush()
            }

            // Check for successful response code or throw error
            if (connection.responseCode == HttpURLConnection.HTTP_OK) {
                val response = connection.inputStream.bufferedReader().use { it.readText() }
                val responseData = Json.decodeFromString<IssuerResponse>(response)

                handleIssuerResponse(responseData) // function shown in next step
            } else {
                throw Exception("Failed to send SIOP response. HTTP error code: ${connection.responseCode}")
            }
        } finally {
            connection.disconnect()
        }
    }
    // :snippet-end:

    // :snippet-start: knownCustomerCredentialHandleIssuerResponseWalletKT
    object WalletStorage {
        var credentialIssuer: String? = null
        var preAuthorizedCode: String? = null
        var credentialEndpoint: String? = null
        var tokenEndpoint: String? = null
        var accessToken: String? = null
        var cNonce: String? = null
    }

    private suspend fun handleIssuerResponse(issuerResponse: IssuerResponse) {
        issuerResponse.credential_offer?.let { credentialOffer ->
            val credentialIssuer = credentialOffer.credential_issuer
            val preAuthorizedCode = credentialOffer.grants[
                "urn:ietf:params:oauth:grant-type:pre-authorized_code"
            ]?.jsonPrimitive?.content


            /***********************************************************************
            * Store the credential_issuer URL and pre_authorized_code for future use
            ************************************************************************/
            WalletStorage.credentialIssuer = credentialIssuer
            WalletStorage.preAuthorizedCode = preAuthorizedCode

            // Direct the user to this URL to complete their Identity Verification
            issuerResponse.url?.let { url ->
                openIdvForm(url)
            } ?: fetchIssuerMetadata() // function shown in next step
        }
    }
    // :snippet-end:

    // dummy function for testing 
    private fun openIdvForm(url: String) {
        println("Opening IDV form at URL: $url")  
    }

    // :snippet-start: knownCustomerCredentialFetchIssuerMetadataWalletKT
    private suspend fun fetchIssuerMetadata() {
        val client = HttpClient() 
        val issuerMetadataUrl = "${WalletStorage.credentialIssuer}/.well-known/openid-credential-issuer"

        try {
            val httpResponse: HttpResponse = client.get(issuerMetadataUrl)
            val responseText: String = httpResponse.bodyAsText()

            val issuerMetadata = Json.parseToJsonElement(responseText).jsonObject            
            /**********************************************
            * Store the credential endpoint for future use
            **********************************************/
            WalletStorage.credentialEndpoint = issuerMetadata[
                "credential_endpoint"
            ]?.jsonPrimitive?.content
                ?: throw Exception("credential_endpoint is missing in issuer metadata")
    
            fetchAuthServerMetadata() // function shown in next step
        } catch (e: Exception) {
            println("Error in fetching issuer metadata: ${e.message}")
        } finally {
            client.close()
        }
    }
    // :snippet-end:

    // :snippet-start: knownCustomerCredentialFetchAuthServerMetadataWalletKT
    private suspend fun fetchAuthServerMetadata() {
        val client = HttpClient()
        val authServerMetadataUrl = "${WalletStorage.credentialIssuer}/.well-known/oauth-authorization-server"
        try {
            val httpResponse: HttpResponse = client.get(authServerMetadataUrl)
            val responseText: String = httpResponse.bodyAsText()

            val json = Json.parseToJsonElement(responseText).jsonObject
            val tokenEndpoint = json["token_endpoint"]?.jsonPrimitive?.content

            if (tokenEndpoint != null) {
            /****************************************************
            * Extract and store the token_endpoint for future use
            *****************************************************/    
                WalletStorage.tokenEndpoint = tokenEndpoint

                fetchAccessToken(
                    WalletStorage.preAuthorizedCode, 
                    WalletStorage.tokenEndpoint) // function shown in next step
            } else {
                println("Token endpoint not found in the authorization server's metadata.")
            }
        } catch (e: Exception) {
            println("Error in fetching authorization server metadata: ${e.message}")
        } finally {
            client.close()
        }
    }
    // :snippet-end:

    // :snippet-start: knownCustomerCredentialFetchAccessTokenWalletKT
    private suspend fun fetchAccessToken(preAuthorizationCode: String?, tokenEndpoint: String?, retryDelay: Long = 10000L) {
        val client = HttpClient()

        val requestBody = buildJsonObject {
            put("grant_type", "urn:ietf:params:oauth:grant-type:pre-authorized_code")
            put("code", preAuthorizationCode)
            put("client_id", userBearerDid.uri) // user's DID string
        }

        try {
            val httpResponse: HttpResponse = client.post(tokenEndpoint ?: 
            throw IllegalArgumentException("tokenEndpoint cannot be null")
            ) {
                contentType(ContentType.Application.Json)
                setBody(requestBody.toString())
            }

            if (!httpResponse.status.isSuccess()) {
                throw Exception("HTTP error! Status: ${httpResponse.status}")
            }

            val responseText: String = httpResponse.bodyAsText()
            val json = Json.parseToJsonElement(responseText).jsonObject

            /*******************************************
            * Handle the "authorization_pending" error
            ********************************************/
            json["error"]?.jsonPrimitive?.content?.let { error ->
                if (error == "authorization_pending") {
                    displayNotification("Hang tight, we're still waiting for IDV to complete.")
                    delay(retryDelay)

                    return fetchAccessToken(preAuthorizationCode, tokenEndpoint, retryDelay)
                } else {
                    throw Exception("Error from server: $error")
                }
            } ?: run {
            /*************************************************
            * Store the access token & c_nonce for future use
            **************************************************/
                WalletStorage.accessToken = json["access_token"]?.jsonPrimitive?.content
                WalletStorage.cNonce = json["c_nonce"]?.jsonPrimitive?.content
                WalletStorage.credentialEndpoint?.let { credentialEndpoint ->
                    WalletStorage.accessToken?.let { accessToken ->
                        requestKnownCustomerCredential(
                            credentialEndpoint, 
                            accessToken) // function shown in next step
                    }
                }

            }
        } catch (e: Exception) {
            println("Error fetching access token: ${e.message}")
        } finally {
            client.close()
        }
    }
    // :snippet-end:

    private fun displayNotification(message: String) {
        println(message)
    }
    private fun secureStoreCredential(credential: String) {
        println("Credential securely stored: $credential")
    }

    // :snippet-start: knownCustomerCredentialRequestCredentialWalletKT
    private suspend fun requestKnownCustomerCredential(credentialEndpoint: String?, accessToken: String?) {
            val client = HttpClient()

            val cNonce = WalletStorage.cNonce 
            if (cNonce == null) {
                throw Exception("cNonce is missing in Wallet storage")
            }

            /*************************************************
            * Construct & sign the JWT payload
            **************************************************/
            val jwtPayload = JwtClaimsSet.Builder()
                .issuer(userBearerDid.uri) // user's DID string
                .audience(issuerDidUri) // Issuer's DID string 
                .issueTime(System.currentTimeMillis() / 1000) // Issued time
                .misc("nonce", cNonce)
                .build()
            
            credentialEndpoint?.let { endpoint ->
            accessToken?.let { token ->
            try {
                val signedJwt = Jwt.sign(userBearerDid, jwtPayload)

                val requestBody = buildJsonObject {
                    putJsonObject("proof") {
                        put("proof_type", "jwt")
                        put("jwt", signedJwt)
                    }
                }

                /*************************************************
                * Request & securely store KCC
                **************************************************/
                val response: HttpResponse = client.post(endpoint) {
                    // Include the access token in the Authorization header
                    header(HttpHeaders.Authorization, "Bearer $token")
                    contentType(ContentType.Application.Json)
                    setBody(requestBody.toString())
                }

                if (!response.status.isSuccess()) {
                    throw Exception(
                        "Network response was not ok: ${response.status.description}"
                    )
                }

                val responseData = Json.parseToJsonElement(response.bodyAsText()).jsonObject
                responseData["credential"]?.jsonPrimitive?.content?.let { signedKccJwt ->
                    secureStoreCredential(signedKccJwt)
                } ?: throw Exception("Signed credential not found in the response")
                    
            } catch (e: Exception) {
                println("Error requesting KCC: ${e.message}")
            } finally {
                client.close()
            }
        } ?: throw IllegalArgumentException("accessToken cannot be null")
        } ?: throw IllegalArgumentException("credentialEndpoint cannot be null") 
    }
    // :snippet-end:
}