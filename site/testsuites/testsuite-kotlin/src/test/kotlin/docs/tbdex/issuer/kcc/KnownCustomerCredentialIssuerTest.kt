package website.tbd.developer.site.docs.tbdex


import web5.sdk.jose.jwt.JwtClaimsSet
import org.junit.jupiter.api.Assertions.*
import com.nimbusds.jwt.JWTParser
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.http.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import web5.sdk.dids.did.BearerDid
import web5.sdk.credentials.VerifiableCredential
// :prepend-start: KnownCustomerCredentialsClassKT
import web5.sdk.credentials.CredentialSchema
// :prepend-end:
import web5.sdk.jose.jwt.Jwt
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
import java.security.SignatureException
import io.ktor.server.routing.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.http.*

import kotlinx.serialization.json.*
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
import java.util.UUID
import io.ktor.http.HttpStatusCode


class KnownCustomerCredentialIssuerTest {

    // :snippet-start: KnownCustomerCredentialsClassKT
    data class KccCredential(val countryOfResidence: String, val tier: String?, val jurisdiction: String?)
    data class Evidence(val kind: String, val checks: List<String>)
    // :snippet-end:

    /* 
    Have to add tests separately because the big snippets are
    contained within the ktor app and the objects within
    are outside of the function's scope to be tested 
    */
 
    @Test
    fun `create() creates credential & sign() creates JWT`() {
        val issuerBearerDid = generateTestDid()
        val customerBearerDid = generateTestDid()
        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
        val expirationDate: Date = dateFormat.parse("2026-05-19T08:02:04Z")
        val evidence = listOf(
            Evidence(
                kind = "document_verification",
                checks = listOf("passport", "utility_bill")
                ),
            Evidence(
                kind = "sanction_screening",
                checks = listOf("PEP")
                )
            )

        val knownCustomerCredential = VerifiableCredential.create(
            type = "VerifiableCredential",
            issuer = issuerBearerDid.uri.toString(),
            subject = customerBearerDid.uri.toString(),
            expirationDate = expirationDate,
            data = KccCredential("US" , "Gold", "US"),
            evidence = evidence,
            credentialSchema = CredentialSchema(
                id = "https://vc.schemas.host/kcc.schema.json",
                type = "JsonSchema"
            ),
        )

        val credentialToken = knownCustomerCredential.sign(issuerBearerDid)

        assertTrue(credentialToken.isNotEmpty(), "The signed credential should not be an empty string.")
    }

    @Test
    fun `JwtUtil sign() works with a valid payload and bearer DID`() {
        val issuerBearerDid = generateTestDid()
        val customerBearerDid = generateTestDid()
        val currentTimeInSeconds = System.currentTimeMillis() / 1000 
        val expirationTimeInSeconds = currentTimeInSeconds + 86400 

        val accessTokenPayload = JwtClaimsSet.Builder()
            .subject(customerBearerDid.uri.toString()) 
            .issuer(issuerBearerDid.uri.toString()) 
            .issueTime(currentTimeInSeconds) 
            .expirationTime(expirationTimeInSeconds)
            .build()

        try {
            val accessToken = Jwt.sign(issuerBearerDid, accessTokenPayload)

            assertNotNull(accessToken, "Access token should not be null")
            assertTrue(accessToken.isNotEmpty(), "Access token should not be empty")
        } catch (e: Exception) {
            fail("Signing should not throw an exception")
        }
    }

    @Test
    fun `verify() does not throw an exception for a valid JWT`() {
        val validJwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3djSmkzeVVONDJFZ1N2cmNHRlFyQzRKY1pkenlWWkhQOVdmMXFRZWRuVlRQI3o2TWt3Y0ppM3lVTjQyRWdTdnJjR0ZRckM0SmNaZHp5VlpIUDlXZjFxUWVkblZUUCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSWRlbnRpZmljYXRpb25DcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6MDQ3ZTg0ZWItY2NhMS00NjFlLWFjZjAtMGMyZGE5ZDczOTNhIiwiaXNzdWVyIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJpc3N1YW5jZURhdGUiOiIyMDI0LTAyLTE1VDE5OjMyOjE2WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJuYW1lIjoiam9obiJ9fSwiaXNzIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJzdWIiOiJkaWQ6a2V5Ono2TWt3Y0ppM3lVTjQyRWdTdnJjR0ZRckM0SmNaZHp5VlpIUDlXZjFxUWVkblZUUCJ9.7oFAPckx-vxCbbzKSk9bU7eXlnjBFvMborl9woHCbcvWaLt0LvTRuDfvGDPC24V9D1K5OFpTnnBiN5jtIOmbBg" 

        assertDoesNotThrow {
            VerifiableCredential.verify(validJwt)
        }
    }
       
    private fun generateTestDid(): BearerDid {
        val issuerDid = DidDht.create(InMemoryKeyManager(), CreateDidDhtOptions(publish = true))
        return issuerDid
    }

    private fun validateSignedCNonce(jwt: String, expectedNonce: String, customersDidUri: String): Boolean {
    return true
    }

    private fun checkIDVStatus(customersDidUri: String): Boolean {
    return true
    }

    private fun generateUniquePreAuthCode(): String {
    return UUID.randomUUID().toString()
    }
    
    private fun generateCNonce(): String {
    return UUID.randomUUID().toString()
    }

    private fun Application.configureRouting() {
        val issuerBearerDid = generateTestDid()
        val customerBearerDid = generateTestDid()

        routing {
            // :snippet-start: siopv2InitiateId_tokenEndpointIssuerKT
            get("/idv/siopv2/initiate") {
                val siopRequestOnlyIdToken = mapOf(
                    "client_id" to "did:dht:issuer7ufcbgnnc4ikkfpd8b1u9on1b1n7k7wdcapbgo", // Issuer's Decentralized Identifier
                    "scope" to "openid", // Standard OpenID Connect scope
                    "response_type" to "id_token", // Only requesting an ID Token
                    "response_uri" to "https://issuer.example.com/siopv2/response", // Endpoint for SIOP response delivery
                    "response_mode" to "direct_post", // Delivery method of the SIOP response
                    "nonce" to "n-0S6_WzA2Mj" // Unique string to link the request and response
                    // Note: No presentation_definition is included, as we're not requesting a vp_token
                )

                // Encode and send the SIOPv2 Authorization Request
                call.respondText(
                    "SIOP Request: $siopRequestOnlyIdToken", 
                    contentType = ContentType.Application.Json
                )
            }
            // :snippet-end:

            // :snippet-start: siopv2InitiateId_tokenAndVp_tokenEndpointIssuerKT
            get("/idv/siopv2/initiate") {
                // Construct the SIOPv2 Authorization Request
                val siopRequest = buildJsonObject {
                    put("client_id", "did:dht:issuer7ufcbgnnc4ikkfpd8b1u9on1b1n7k7wdcapbgo") // Issuer's Decentralized Identifier
                    put("scope", "openid") // Standard OpenID Connect scope
                    put("response_type", "id_token vp_token") // Expected response formats
                    put("response_uri", "https://issuer.example.com/siopv2/response") // Endpoint for SIOP response
                    put("response_mode", "direct_post") // Delivery method of the SIOP response
                    put("nonce", "n-0S6_WzA2Mj") // Unique string to link the request and response

                    val clientMetadata = buildJsonObject {
                        put("subject_syntax_types_supported", "did:dht did:jwk")
                        put("client_name", "Issuance Service Name")
                        put("client_uri", "https://issuer.example.com")
                        put("logo_uri", "https://issuer.example.com/logo.png")
                        put("tos_uri", "https://issuer.example.com/tos")
                        put("policy_uri", "https://issuer.example.com/privacy")
                    }

                    val inputDescriptors = buildJsonArray {
                        addJsonObject {
                            put("id", "IDCardCredential")
                            val schema = buildJsonObject {
                                put("uri", buildJsonArray {
                                    add("https://www.w3.org/2018/credentials#VerifiableCredential")
                                    add("https://www.w3.org/2018/credentials/examples/v1#IDCardCredential")
                                })
                                put("name", "ID Card Credential")
                                put("purpose", "We need to verify your identity.")
                            }
                            put("schema", schema)
                            val constraints = buildJsonObject {
                                val fields = buildJsonArray {
                                    addJsonObject {
                                        put("path", buildJsonArray { 
                                            add("$.vc.credentialSubject.given_name") 
                                        })
                                        put("purpose", "The given name on your ID card.")
                                    }
                                    addJsonObject {
                                        put("path", buildJsonArray { 
                                            add("$.vc.credentialSubject.family_name") 
                                        })
                                        put("purpose", "The family name on your ID card.")
                                    }
                                    addJsonObject {
                                        put("path", buildJsonArray { 
                                            add("$.vc.credentialSubject.birthdate") 
                                        })
                                        put("purpose", "Your birth date.")
                                    }
                                    addJsonObject {
                                        put("path", buildJsonArray { 
                                            add("$.vc.credentialSubject.national_identifier") 
                                        })
                                        put("purpose", "Your national identifier.")
                                    }
                                }
                                put("fields", fields)
                            }
                            put("constraints", constraints)
                        }
                    }
                    val presentationDefinition = buildJsonObject {
                        put("id", "IDCardCredentials")
                        put("input_descriptors", inputDescriptors)
                    }
                    put("presentation_definition", presentationDefinition)
                    put("client_metadata", clientMetadata)
                }

            // Encode and send the SIOPv2 Authorization Request 
            }
        // :snippet-end:

        // :snippet-start: encodeSiopv2AuthRequestIssuerKT
            get("/idv/siopv2/initiate") {
                // Construct the SIOPv2 Authorization Request
                val siopRequest = buildJsonObject {
                    put("client_id", "did:dht:issuer7ufcbgnnc4ikkfpd8b1u9on1b1n7k7wdcapbgo") // Issuer's Decentralized Identifier
                    put("scope", "openid") // Standard OpenID Connect scope
                    put("response_type", "id_token vp_token") // Expected response formats
                    put("response_uri", "https://issuer.example.com/siopv2/response") // Endpoint for SIOP response
                    put("response_mode", "direct_post") // Delivery method of the SIOP response
                    put("nonce", "n-0S6_WzA2Mj") // Unique string to link the request and response

                    val clientMetadata = buildJsonObject {
                        put("subject_syntax_types_supported", "did:dht did:jwk")
                        put("client_name", "Issuance Service Name")
                        put("client_uri", "https://issuer.example.com")
                        put("logo_uri", "https://issuer.example.com/logo.png")
                        put("tos_uri", "https://issuer.example.com/tos")
                        put("policy_uri", "https://issuer.example.com/privacy")
                    }

                    val inputDescriptors = buildJsonArray {
                        addJsonObject {
                            put("id", "IDCardCredential")
                            val schema = buildJsonObject {
                                put("uri", buildJsonArray {
                                    add("https://www.w3.org/2018/credentials#VerifiableCredential")
                                    add("https://www.w3.org/2018/credentials/examples/v1#IDCardCredential")
                                })
                                put("name", "ID Card Credential")
                                put("purpose", "We need to verify your identity.")
                            }
                            put("schema", schema)
                            val constraints = buildJsonObject {
                                val fields = buildJsonArray {
                                    addJsonObject {
                                        put("path", buildJsonArray { 
                                            add("$.vc.credentialSubject.given_name") 
                                        })
                                        put("purpose", "The given name on your ID card.")
                                    }
                                    addJsonObject {
                                        put("path", buildJsonArray { 
                                            add("$.vc.credentialSubject.family_name") 
                                        })
                                        put("purpose", "The family name on your ID card.")
                                    }
                                    addJsonObject {
                                        put("path", buildJsonArray { 
                                            add("$.vc.credentialSubject.birthdate") 
                                        })
                                        put("purpose", "Your birth date.")
                                    }
                                    addJsonObject {
                                        put("path", buildJsonArray { 
                                            add("$.vc.credentialSubject.national_identifier") 
                                        })
                                        put("purpose", "Your national identifier.")
                                    }
                                }
                                put("fields", fields)
                            }
                            put("constraints", constraints)
                        }
                    }
                    val presentationDefinition = buildJsonObject {
                        put("id", "IDCardCredentials")
                        put("input_descriptors", inputDescriptors)
                    }
                    put("presentation_definition", presentationDefinition)
                    put("client_metadata", clientMetadata)
                }
                //highlight-start
                // Sign the SIOPv2 Auth Request
                val siopRequestJwtPayload = JwtClaimsSet.Builder()
                    .subject(issuerBearerDid.uri) // Issuer's DID
                    .issuer(issuerBearerDid.uri) // Issuer's DID
                    .issueTime(System.currentTimeMillis() / 1000) // Issued time
                    .expirationTime((System.currentTimeMillis() / 1000) + 86400) // Expiration time 
                    .misc("request", siopRequest.toString()) // Embed the SIOPv2 Auth request payload 
                    .build()

                try {
                    val jwtToken = Jwt.sign(issuerBearerDid, siopRequestJwtPayload)
                    // Send the SIOPv2 Auth Request in JAR format
                    val queryString = "client_id=${URLEncoder.encode(issuerBearerDid.uri.toString(), "UTF-8")}&request=${URLEncoder.encode(jwtToken, "UTF-8")}"

                    call.respondText(queryString, ContentType.Text.Plain)
                } catch (err: Exception) {
                    println("Error signing the SIOPv2 request: ${err.message}")
                    call.respond(HttpStatusCode.InternalServerError, "Failed to generate JWT for SIOPv2 Authorization Request")
                }
                //highlight-end
            }
        // :snippet-end:

        // :snippet-start: siopv2ResponseEndpointIssuerKT
            val preAuthCodeToDidMap = ConcurrentHashMap<String, String>()
            
            post("/siopv2/response") {
                val walletResponse = call.receive<JsonObject>() // The SIOPv2 Authorization Response from the Wallet

                    /************************************************************************
                    * Extract and verify the ID Token from the Wallet's response
                    ************************************************************************/
                try {
                    val compactIdToken = walletResponse["id_token"]?.jsonPrimitive?.content
                    if (compactIdToken == null) {
                        call.respond(HttpStatusCode.BadRequest, mapOf("message" to "Missing ID Token"))
                        return@post
                    }
                    VerifiableCredential.verify(compactIdToken)

                    /************************************************************************
                    * Extract customer's DID from verification result
                    ************************************************************************/
                    val claimsSet = JWTParser.parse(compactIdToken).jwtClaimsSet
                    val customersDidUri = claimsSet.subject ?: run {
                        call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid ID Token"))
                        return@post
                    }
                    // Perform additional checks (e.g., nonce, audience, expiration)

                    val preAuthCode = generateUniquePreAuthCode()
                    preAuthCodeToDidMap[preAuthCode] = customersDidUri // needed for subsequent '/token' endpoint

                    /********************************************************************
                    * Define the initial structure for the Identity Verification Request
                    ********************************************************************/

                    var idvRequest = buildJsonObject {
                        putJsonObject("credential_offer") {
                            put("credential_issuer", "https://issuer.example.com")
                            putJsonArray("credential_configuration_ids") {
                                add("knownCustomerCredential-basic")
                                add("knownCustomerCredential-extended")
                            }
                            putJsonObject("grants") {
                                put(
                                    "urn:ietf:params:oauth:grant-type:pre-authorized_code", 
                                    preAuthCode
                                )
                            }
                        }
                    }

                    var isVPValidIDV = false
                    if (walletResponse.containsKey("vp_token")) {
                        val compactVpToken = walletResponse["vp_token"]?.jsonPrimitive?.content
                        val vpTokenVerificationResult = VerifiableCredential.verify(
                            compactVpToken ?: ""
                        )
            
                        isVPValidIDV = true
                    }

                    /********************************************************************
                    * If vp_token is not present include `url` for IDV form
                    ********************************************************************/

                    if (!isVPValidIDV) {
                        idvRequest = idvRequest.toMutableMap().apply {
                            put("url", JsonPrimitive("https://issuer.example.com/idv/form"))
                        }.let { buildJsonObject { it.forEach { key, value -> put(key, value) } } }
                    }

                    call.respond(HttpStatusCode.OK, idvRequest)
                } catch (error: Exception) {
                    /************************************************************************
                    * Handle verification errors
                    ************************************************************************/
                    call.respond(HttpStatusCode.Unauthorized, mapOf(
                        "errors" to listOf("Invalid token", error.message)
                    ))
                }
            }
        // :snippet-end:

        // :snippet-start: wellKnownIssuerMetadataEndpointIssuerKT
            get("/.well-known/openid-credential-issuer") {
                val issuerMetadata = buildJsonObject {
                    put("credential_issuer", "https://issuer.example.com")
                    put("credential_endpoint", "https://issuer.example.com/credentials")
                    // type of credentials Issuer supports and what credential will look like
                    putJsonObject("credential_configurations_supported") {
                        putJsonObject("KnownCustomerCredential") {
                            put("format", "jwt_vc_json")
                            put("scope", "CustomerIdentity")
                            putJsonArray("cryptographic_binding_methods_supported") {
                                add("did:example")
                            }
                            putJsonArray("credential_signing_alg_values_supported") {
                                add("ES256")
                            }
                            putJsonObject("credential_definition") {
                                putJsonArray("type") {
                                    add("VerifiableCredential")
                                    add("KnownCustomerCredential")
                                }
                                putJsonObject("credentialSubject") {
                                    putJsonObject("country") {
                                        putJsonArray("display") {
                                            addJsonObject {
                                                put("name", "Country")
                                                put("locale", "en-US")
                                            }
                                        }
                                    }
                                }
                            }
                            putJsonObject("proof_types_supported") {
                                putJsonObject("jwt") {
                                    putJsonArray("proof_signing_alg_values_supported") {
                                        add("ES256")
                                    }
                                }
                            }
                            putJsonArray("display") {
                                addJsonObject {
                                    put("name", "Known Customer Credential")
                                    put("locale", "en-US")
                                    putJsonObject("logo") {
                                        put("url", "https://issuer.example.com/public/logo.png")
                                        put("alt_text", "Issuer Logo")
                                    }
                                    put("background_color", "#FFFFFF")
                                    put("text_color", "#000000")
                                }
                            }
                        }
                    }
                }
                call.respond(HttpStatusCode.OK, issuerMetadata)
            }
        // :snippet-end:

        // :snippet-start: wellKnownAuthorizationServerEndpointIssuerKT
            get("/.well-known/oauth-authorization-server") {
                val oauthAuthorizationServerMetadata = buildJsonObject {
                    put("issuer", "https://issuer.example.com") // URL of the Credential Issuer
                    put("token_endpoint", "https://issuer.example.com/token") // URL for the Access Token Request
                }
                call.respond(HttpStatusCode.OK, oauthAuthorizationServerMetadata)
            }
        // :snippet-end:

        // :snippet-start:accessTokenEndpointIssuerKT
            val accessTokenToCNonceMap = ConcurrentHashMap<String, String>()

            post("/token") {
                val requestBody = call.receive<Parameters>()
                val grantType = requestBody["grant_type"]
                val code = requestBody["code"]

                if (grantType != "urn:ietf:params:oauth:grant-type:pre-authorized_code") {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "unsupported_grant_type"))
                    return@post
                }

                val customersDidUri = preAuthCodeToDidMap[code]
                if (customersDidUri == null) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "invalid_grant"))
                    return@post
                }

                    // Check the status of the IDV
                val idvCompleted = checkIDVStatus(customersDidUri)
                if (!idvCompleted) {
                    call.respond(HttpStatusCode.BadRequest, mapOf("error" to "authorization_pending"))
                    return@post
                }

                    /*******************************************
                    Create the payload for the access token
                    ********************************************/
                val accessTokenPayload = JwtClaimsSet.Builder()
                    .subject("did:dht:customer7ufcbgnnc4ikkfpd8b1u9on1b1n7k7wdcapbgo") // Customer's DID string
                    .issuer(issuerBearerDid.uri) // Issuer's DID string
                    .issueTime(System.currentTimeMillis() / 1000) // Issued time
                    .expirationTime((System.currentTimeMillis() / 1000) + 86400) // Expiration time 
                    .build()

                    /*******************************************
                    sign accessToken and generate a c_nonce
                    ********************************************/
                try {
                    val accessToken = Jwt.sign(issuerBearerDid, accessTokenPayload)
                    val cNonce = generateCNonce()
                    accessTokenToCNonceMap[accessToken] = cNonce

                    preAuthCodeToDidMap.remove(code)

                    call.respond(mapOf(
                        "access_token" to accessToken,
                        "token_type" to "bearer",
                        "expires_in" to 86400, // Token expiration time
                        "c_nonce" to cNonce, // Challenge nonce to be signed
                        "c_nonce_expires_in" to 86400 // cNonce expiration time
                    ))
                } catch (error: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, mapOf(
                        "error" to "internal_server_error",
                        "message" to error.message.toString()
                    ))
                }
            }
        // :snippet-end:

        // :snippet-start: knownCustomerCredentialEndpointIssuerKT
            post("/credentials") {
                try {
                    /*****************************************************************
                    * Extract and validate the access token from Authorization header
                    ******************************************************************/
                    val authHeader = call.request.headers["Authorization"]
                    if (authHeader.isNullOrEmpty()) {
                        call.respond(HttpStatusCode.Unauthorized, mapOf(
                            "errors" to listOf("Authorization header required")
                        ))
                        return@post
                    }

                    val tokenParts = authHeader.split("Bearer ")
                    if (tokenParts.size != 2) {
                        call.respond(HttpStatusCode.Unauthorized, mapOf(
                            "errors" to listOf("Authorization header format is Bearer <token>")
                        ))
                        return@post
                    }

                    val accessToken = tokenParts[1]
                    val storedCNonce = accessTokenToCNonceMap[accessToken]
                    if (storedCNonce == null) {
                        call.respond(HttpStatusCode.Unauthorized, mapOf(
                            "errors" to listOf("Invalid or expired access token")
                        ))
                        return@post
                    }

                    /********************************************************
                    * Extract and validate the JWT from the proof object
                    *********************************************************/
                    val requestBody = call.receive<JsonObject>()
                    val proof = requestBody["proof"]?.jsonObject
                    val proofJwt = proof?.get("jwt")?.jsonPrimitive?.content

                    if (proof == null || 
                    proof["proof_type"]?.jsonPrimitive?.content != "jwt" || 
                    proofJwt.isNullOrEmpty()
                    ) {
                        call.respond(HttpStatusCode.BadRequest, mapOf("errors" to listOf("Invalid proof provided")))
                        return@post
                    }

                    VerifiableCredential.verify(proofJwt)
                    val claimsSet = JWTParser.parse(proofJwt).jwtClaimsSet
                    val customersDidUri = claimsSet.subject ?: ""
                    val nonceInProof = claimsSet.getStringClaim("nonce")

                    /***********************************************
                    * Validate the signed c_nonce
                    ************************************************/
                    if (storedCNonce == nonceInProof) {
                        accessTokenToCNonceMap.remove(accessToken) 
                    } else {
                        call.respond(HttpStatusCode.Unauthorized, mapOf("errors" to listOf("Invalid nonce in proof")))
                        return@post
                    }

                    /***********************************************
                    * Create and sign the credential
                    ************************************************/
                    val evidence = listOf(
                        Evidence(
                            kind = "document_verification",
                            checks = listOf("passport", "utility_bill")
                        ),
                        Evidence(
                            kind = "sanction_screening",
                            checks = listOf("PEP")
                        )
                    )
                    val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
                    val expirationDate: Date = dateFormat.parse("2026-05-19T08:02:04Z")

                    val knownCustomerCredential = VerifiableCredential.create(
                        type = "VerifiableCredential",
                        issuer = issuerBearerDid.uri, // Issuer's DID string
                        subject = customersDidUri, // Customer's DID string from the verified JWT
                        expirationDate = expirationDate,
                        evidence = evidence,
                        data = KccCredential(countryOfResidence = "US", tier = "Gold", jurisdiction = "US"),
                        credentialSchema = CredentialSchema(
                            id = "https://vc.schemas.host/kcc.schema.json",
                            type = "JsonSchema"
                        ),
                    )

                    val credentialToken = knownCustomerCredential.sign(
                        issuerBearerDid // Signing with the issuer's bearer DID
                    ) 

                    /***********************************************
                    * Respond with the signed credential
                    ************************************************/
                    call.respond(HttpStatusCode.OK, mapOf("credential" to credentialToken))
                } catch (error: Exception) {
                    /***********************************************
                    * Generic error handling
                    ************************************************/
                    call.respond(HttpStatusCode.InternalServerError, mapOf(
                        "errors" to listOf("An unexpected error occurred: ${error.message}")
                    ))
                }
            }
        // :snippet-end:
        }
    }
}