import XCTest
import AnyCodable
// :prepend-start: knownCustomerCredentialResolveIssuerDidSwift
import Web5
import Foundation
// :prepend-end: 
@testable import Web5
@testable import DevSiteTestSuite

final class KnownCustomerCredentialWalletTest: XCTestCase {
    let nameCredentialJwt =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSURDYXJkQ3JlZGVudGlhbFBhcnQxIl0sImlkIjoidXJuOnV1aWQ6NTdhNWU4ZWUtYmZlMC00YjQwLWJmMDAtZTA4MTY5ZDk5Y2Q1IiwiaXNzdWVyIjoiZGlkOmRodDpmYzZyNmJnNjl0Nms4dTl1OXN1NTNhYWY2anUxeGRwd2R6dXcza2p1OHNzYW1iM3Bwc3VvIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMy0yMVQyMToyMTo1MVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byIsImdpdmVuX25hbWUiOiJBbGljZSIsImZhbWlseV9uYW1lIjoiU21pdGgifX0sImlzcyI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byIsInN1YiI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byJ9.kt0rKEgZ1_U4eTUNDgUU9LzmFViHsx_1z6llfFAqCdpzwIsKKYbqfbtgckJDsoV9xqgG5TYAVPxeLo5hCAguDA"
    let idCredentialJwt =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSURDYXJkQ3JlZGVudGlhbFBhcnQyIl0sImlkIjoidXJuOnV1aWQ6YTM5ZmQ3NjgtNjVjMy00MDZhLWIwMGItMTg1MjIxM2ExYzhjIiwiaXNzdWVyIjoiZGlkOmRodDpmYzZyNmJnNjl0Nms4dTl1OXN1NTNhYWY2anUxeGRwd2R6dXcza2p1OHNzYW1iM3Bwc3VvIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMy0yMVQyMToyMTo1MVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byIsImJpcnRoZGF0ZSI6IjE5OTAtMDEtMDEiLCJuYXRpb25hbF9pZGVudGlmaWVyIjoiMTIzLTQ1LTY3ODkifX0sImlzcyI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byIsInN1YiI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byJ9.lQOBdE3LGQ_rLz69SQoI_auOsFpsOESBIbHNf9HpYTGYTT2aYw8WrKd1rXQuRqzgELcv92iWQRpWoVm193x3CQ"

    let issuerBearerDid = try! DIDJWK.create(keyManager: InMemoryKeyManager())
    let userBearerDid = try! DIDJWK.create(keyManager: InMemoryKeyManager())

    let presentationDefinition = PresentationDefinitionV2(
        id: "IDCardCredentials",
        name: nil,
        purpose: nil,
        format: nil,
        submissionRequirements: nil,
        inputDescriptors: [
            InputDescriptorV2(
                id: "givenNameVerification",
                name: "Given Name Verification",
                purpose: "We need to verify your given name.",
                format: "jwt_vc", 
                constraints: ConstraintsV2(
                    fields: [
                        FieldV2(
                            path: ["$.credentialSubject.given_name", "$.vc.credentialSubject.given_name"],
                            filter: ["type": "string"]
                        )
                    ],
                    limitDisclosure: nil
                )
            ),
            InputDescriptorV2(
                id: "familyNameVerification",
                name: "Family Name Verification",
                purpose: "We need to verify your family name.",
                format: nil,
                constraints: ConstraintsV2(
                    fields: [
                        FieldV2(
                            path: ["$.credentialSubject.family_name", "$.vc.credentialSubject.family_name"],
                            filter: ["type": "string"]
                        )
                    ],
                    limitDisclosure: nil
                )
            ),
            InputDescriptorV2(
                id: "birthdateVerification",
                name: "Birthdate Verification",
                purpose: "We need to verify your birthdate.",
                format: nil, 
                constraints: ConstraintsV2(
                    fields: [
                        FieldV2(
                            path: ["$.credentialSubject.birthdate", "$.vc.credentialSubject.birthdate"],
                            filter: ["type": "string", "format": "date"]
                        )
                    ],
                    limitDisclosure: nil
                )
            ),
            InputDescriptorV2(
                id: "nationalIdentifierVerification",
                name: "National Identifier Verification",
                purpose: "We need to verify your national identifier.",
                format: nil,
                constraints: ConstraintsV2(
                    fields: [
                        FieldV2(
                            path: ["$.credentialSubject.national_identifier", "$.vc.credentialSubject.national_identifier"],
                            filter: ["type": "string"]
                        )
                    ],
                    limitDisclosure: nil
                )
            )
        ]
    )
    
    func testSelectsCredentialsAndSatisfiesPD() async throws {
        let credentials = [nameCredentialJwt, idCredentialJwt]
        let selectedCredentials = try! PresentationExchange.selectCredentials(
            vcJWTs: credentials,
            presentationDefinition: presentationDefinition
        )
        XCTAssertEqual(selectedCredentials.count, 2)
    }

    func testJWTSignWithValidPayloadAndBearerDid() async throws {
        let expirationDate = Date().addingTimeInterval(86400)
        let issuedAtDate = Date()

        let accessTokenPayload = JWT.Claims(
            issuer: issuerBearerDid.uri,
            subject: userBearerDid.uri,
            expiration: expirationDate,
            issuedAt: issuedAtDate
        )

        do {
            // Act
            let accessToken = try JWT.sign(did: userBearerDid, claims: accessTokenPayload)

            // Assert
            XCTAssertFalse(accessToken.isEmpty, "Access token should not be empty.")
        } catch {
            XCTFail("JWT.sign() threw an unexpected error: \(error)")
        }
    }

    enum ResolverError: Error {
        case idvServiceNotFound
        case didResolutionFailed(String)
    }

    // :snippet-start: knownCustomerCredentialResolveIssuerDidSwift
    func getIDVServiceEndpoint(issuerDidUri: String, 
    usingResolvers resolvers: [DIDMethodResolver]
    ) async -> String? {
        /****************************************
        * Resolve DID & Get IDV Service Endpoint
        ****************************************/
        for resolver in resolvers where issuerDidUri.starts(
        with: "did:\(resolver.methodName):"
        ) {
            let resolutionResult = await resolver.resolve(didURI: issuerDidUri)
            if let service = resolutionResult.didDocument?.service?.first(
            where: { $0.type == "IDV" }
            ) {
                switch service.serviceEndpoint {
                case let .one(uri):
                    return uri
                case let .many(uris):
                    return uris.first
                }
            }
        }
        return nil
    }
    // :snippet-end:

    enum NetworkError: Error {
        case badResponse
        case requestFailed(String)
    }

    // :snippet-start: knownCustomerCredentialSendRequestToIdvServiceEndpointSwift
    func sendRequestToIdvServiceEndpoint(idvServiceEndpoint: String) async throws {
        guard let url = URL(string: idvServiceEndpoint) else {
            throw NetworkError.requestFailed("Invalid URL")
        }

        do {
            let (data, response) = try await URLSession.shared.data(from: url)

            guard let httpResponse = response as? HTTPURLResponse, 
            httpResponse.statusCode == 200 else 
            {
                throw NetworkError.badResponse
            }
            
            if let encodedSiopRequest = String(data: data, encoding: .utf8) {
                try await handleSiopRequest(encodedSiopRequest: encodedSiopRequest) // function shown in next step
            } else {
                throw NetworkError.requestFailed("Failed to decode response")
            }
        } catch {
            throw NetworkError.requestFailed(error.localizedDescription)
        }
    }
    // :snippet-end:

    public func presentationDefinition(value: String?) throws -> PresentationDefinitionV2 {
        let encodedPresentation = try JSONEncoder().encode(value)
        
        return try JSONDecoder().decode(PresentationDefinitionV2.self, from: encodedPresentation)
    }

    enum PresentationError: Error {
        case serializationError
        case signingError
    }



    // :snippet-start: knownCustomerCredentialhandleSiopRequestWalletSwift
    func handleSiopRequest(encodedSiopRequest: String) async throws {
        /*******************************************************
        * Decode the SIOP request from the encoded string
        *******************************************************/
        guard let siopRequestURL = URL(string: "https://dummy.com?\(encodedSiopRequest)"),
            let components = URLComponents(url: siopRequestURL, resolvingAgainstBaseURL: true) else {
            throw URLError(.badURL)
        }

        var siopRequest: [String: String] = [:]
        for queryItem in components.queryItems ?? [] {
            if let value = queryItem.value {
                siopRequest[queryItem.name] = value.removingPercentEncoding ?? value
            }
        }

        /*******************************************************
        * Generate & sign id_token
        *******************************************************/
        let expirationDate = Date().addingTimeInterval(3600) // 1 hour from now
        let issuedAtDate = Date()
        let idTokenClaims = JWT.Claims(
            issuer: userBearerDid.uri,
            subject: userBearerDid.uri,
            audience: siopRequest["client_id"],
            expiration: expirationDate,
            issuedAt: issuedAtDate
        )

        let idToken = try JWT.sign(did: userBearerDid, claims: idTokenClaims)

        let vpToken: String?
        if let responseType = siopRequest["response_type"], responseType.contains("vp_token") {
            /*********************************************************
            * Select Credentials based on the Presentation Definition
            *********************************************************/
            let pd = siopRequest["presentation_definition"]
            let pdEncoded = try presentationDefinition(value: pd)
            let selectedCredentials = try PresentationExchange.selectCredentials(vcJWTs: [nameCredentialJwt, idCredentialJwt], presentationDefinition: pdEncoded)

            try PresentationExchange.satisfiesPresentationDefinition(vcJWTs: selectedCredentials, presentationDefinition: pdEncoded)

            /*******************************************************
            * Generate & sign vp_token
            *******************************************************/
            let vp = try PresentationExchange.createPresentationFromCredentials(vcJWTs: selectedCredentials, presentationDefinition: pdEncoded)

            let vpJsonObject: [String: Any] = [
                "context": ["https://www.w3.org/2018/credentials/v1"],
                "type": ["VerifiablePresentation"], 
                "verifiableCredential": selectedCredentials, // The array of credential JWTs
                "presentationSubmission": vp // The presentation submission 
            ]

            if let jsonData = try? JSONSerialization.data(withJSONObject: vpJsonObject),
            let jsonString = String(data: jsonData, encoding: .utf8){
                let jsonCodable = AnyCodable(jsonString)
                let claims = JWT.Claims(
                    issuer: userBearerDid.uri,
                    subject: userBearerDid.uri,
                    expiration: Date().addingTimeInterval(3600), 
                    issuedAt: Date(),
                    misc: ["vp": jsonCodable]
                )

                vpToken = try JWT.sign(did: userBearerDid, claims: claims)
            }else{
              throw PresentationError.serializationError
            }         
        }else{
            vpToken = nil
        }

        /*******************************************************
        * POST SIOPv2 Authorization response to the response_uri
        *******************************************************/
        guard let responseUri = URL(string: siopRequest["response_uri"]!) else {
            throw URLError(.badURL)
        }

        var responsePayload: [String: Any] = ["id_token": idToken]
        if let vp = vpToken {
            responsePayload["vp_token"] = vp
        }

        var request = URLRequest(url: responseUri)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONSerialization.data(withJSONObject: responsePayload)

        let (data, response) = try await URLSession.shared.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
            throw URLError(.badServerResponse)
        }

        guard let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            throw URLError(.cannotParseResponse)
        }

        try await handleIssuerResponse(issuerResponse: json) // function shown in next step
    }
    // :snippet-end:

    // :snippet-start: knownCustomerCredentialHandleIssuerResponseWalletSwift
    struct WalletStorage {
        var credentialIssuer: URL?
        var preAuthorizedCode: String?
        var credentialEndpoint: URL?
        var tokenEndpoint: URL?
        var accessToken: String?
        var cNonce: String?
    }

    var walletStorage = WalletStorage()

    func handleIssuerResponse(issuerResponse: [String: Any]) async throws {
        guard let credentialOffer = issuerResponse["credential_offer"] as? [String: Any],
            let credentialIssuerString = credentialOffer["credential_issuer"] as? String,
            let credentialIssuerURL = URL(string: credentialIssuerString),
            let grants = credentialOffer["grants"] as? [String: Any],
            let preAuthorizedCode = grants["urn:ietf:params:oauth:grant-type:pre-authorized_code"] as? String else {
            print("Invalid issuer response format")
            return
        }
        
        /***********************************************************************
        * Store the credential_issuer URL and pre_authorized_code for future use
        ************************************************************************/
        walletStorage.credentialIssuer = credentialIssuerURL
        walletStorage.preAuthorizedCode = preAuthorizedCode
        
        if let urlString = issuerResponse["url"] as? String {
            // Direct the user to this URL to complete their Identity Verification
            openIdvForm(urlString: urlString)
        } else {
           try await fetchIssuerMetadata() // function shown in next step
        }
    }
    // :snippet-end:

    func openIdvForm(urlString: String) {
        print("IDV Form would open at URL: \(urlString)")
    }




    enum MetadataError: Error {
        case credentialIssuerURLNotSet
        case networkError(String)
        case noData
        case dataParsingError(String)
        case missingCredentialEndpoint
        case missingData
    }

    // :snippet-start: knownCustomerCredentialFetchIssuerMetadataWalletSwift
    func fetchIssuerMetadata() async throws {
        guard let credentialIssuerURL = walletStorage.credentialIssuer else {
            throw MetadataError.credentialIssuerURLNotSet
        }
        
        let issuerMetadataUrl = credentialIssuerURL.appendingPathComponent(".well-known/openid-credential-issuer")
        
        let (data, response) = try await URLSession.shared.data(from: issuerMetadataUrl)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else {
            throw MetadataError.networkError("Non-200 response from the server")
        }

        guard let issuerMetadata = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
            let credentialEndpointString = issuerMetadata["credential_endpoint"] as? String,
            let credentialEndpointURL = URL(string: credentialEndpointString) else {
            throw MetadataError.dataParsingError("Failed to parse JSON or missing 'credential_endpoint'")
        }
        /**********************************************
        * Store the credential endpoint for future use
        **********************************************/

        walletStorage.credentialEndpoint = credentialEndpointURL

        try await fetchAuthServerMetadata() // function shown in next steps 
    }
    // :snippet-end:

    // :snippet-start: knownCustomerCredentialFetchAuthServerMetadataWalletSwift
    func fetchAuthServerMetadata() async throws {
        guard let credentialIssuerURL = walletStorage.credentialIssuer else {
            throw MetadataError.credentialIssuerURLNotSet
        }
        
        let authServerMetadataUrl = credentialIssuerURL.appendingPathComponent(".well-known/oauth-authorization-server")
        
        let (data, response) = try await URLSession.shared.data(from: authServerMetadataUrl)
        guard (response as? HTTPURLResponse)?.statusCode == 200 else {
            throw MetadataError.networkError("Non-200 response from the server")
        }

        guard let authServerMetadata = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
            let tokenEndpointString = authServerMetadata["token_endpoint"] as? String,
            let tokenEndpointURL = URL(string: tokenEndpointString) else {
            throw MetadataError.dataParsingError("Failed to parse JSON or missing 'token_endpoint'")
        }
        /****************************************************
        * Extract and store the token_endpoint for future use
        *****************************************************/    

        walletStorage.tokenEndpoint = tokenEndpointURL

        guard let preAuthorizedCode = walletStorage.preAuthorizedCode else {
            throw MetadataError.missingData
        }

        try await fetchAccessToken(preAuthorizationCode: preAuthorizedCode, tokenEndpoint: tokenEndpointString) // function shown in next step
    }
    // :snippet-end:

    enum AccessTokenError: Error {
        case badURL
        case httpRequestFailed(String)
        case authorizationPending
        case missingData
        case missingAccessToken
        case unknownError(String)
    }

    struct AccessTokenRequestBody: Codable {
        let grantType: String
        let code: String
        let clientId: String

        enum CodingKeys: String, CodingKey {
            case grantType = "grant_type"
            case code
            case clientId = "client_id"
        }
    }

    // :snippet-start: knownCustomerCredentialFetchAccessTokenWalletSwift
    func fetchAccessToken(preAuthorizationCode: String, 
    tokenEndpoint: String, retryDelay: TimeInterval = 10.0) 
    async throws {
        guard let url = URL(string: tokenEndpoint) else {
            throw AccessTokenError.badURL
        }

        let requestBody = AccessTokenRequestBody(
            grantType: "urn:ietf:params:oauth:grant-type:pre-authorized_code",
            code: preAuthorizationCode,
            clientId: userBearerDid.uri 
        )

        /*********************************************
        * Send the POST request to the token endpoint
        **********************************************/
        let encoder = JSONEncoder()
        let requestData = try encoder.encode(requestBody)
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = requestData

        let (data, response) = try await URLSession.shared.data(for: request)
        guard let httpResponse = response as? HTTPURLResponse, 
        httpResponse.statusCode == 200 else 
        {
            throw AccessTokenError.httpRequestFailed("HTTP error! Status: \(response)")
        }

        let decoder = JSONDecoder()
        let responseData = try decoder.decode([String: String].self, from: data)

        /*******************************************
        * Handle the "authorization_pending" error
        ********************************************/

        if let error = responseData["error"], error == "authorization_pending" {
            displayNotification("Hang tight, we're still waiting for IDV to complete.") 
            try await Task.sleep(nanoseconds: UInt64(retryDelay * 1_000_000_000))
            try await fetchAccessToken(preAuthorizationCode: preAuthorizationCode, tokenEndpoint: tokenEndpoint, retryDelay: retryDelay)
        } else if let accessToken = responseData["access_token"], let cNonce = responseData["c_nonce"] {
        /*************************************************
        * Store the access token & c_nonce for future use
        **************************************************/
            walletStorage.accessToken = accessToken
            walletStorage.cNonce = cNonce

            guard let credentialEndpoint = walletStorage.credentialEndpoint else {
                throw AccessTokenError.missingData
            }

            try await requestKnownCustomerCredential(credentialEndpoint: credentialEndpoint, accessToken: accessToken) // function shown in next step
        } else {
            throw AccessTokenError.missingAccessToken
        }
    }
    // :snippet-end:

    func displayNotification(_ message: String) {
        print("Notification: \(message)")
    }

    enum RequestCredentialError: Error {
        case cNonceMissing
        case networkResponseNotOK(String)
        case signedCredentialNotFound
        case jwtSigningFailed(String)
    }

    class SecureStorage {
        static let shared = SecureStorage()

        private init() {}

        func setItem(_ key: String, credential: String) {
            UserDefaults.standard.set(credential, forKey: key)
        }

        func getItem(_ key: String) -> String? {
            return UserDefaults.standard.string(forKey: key)
        }
    }

    // :snippet-start: knownCustomerCredentialRequestCredentialWalletSwift
    func requestKnownCustomerCredential(credentialEndpoint: URL, accessToken: String) async throws {
        guard let cNonce = walletStorage.cNonce else {
            throw RequestCredentialError.cNonceMissing
        }
        
        /*************************************************
        * Construct & sign the JWT payload
        **************************************************/
    let issuedAtDate = Date()
    let jsonCodable = AnyCodable(cNonce)
    let jwtClaims = JWT.Claims(
        issuer: userBearerDid.uri, // user's DID string
        audience: issuerBearerDid.uri, // Issuer's DID string
        issuedAt: issuedAtDate,
        misc: ["nonce": jsonCodable]
    )

    do {
        let signedJwt = try JWT.sign(did: userBearerDid, claims: jwtClaims)
            
            let requestBody: [String: Any] = [
                "proof": [
                    "proof_type": "jwt",
                    "jwt": signedJwt
                ]
            ]
            
            /*************************************************
            * Request & securely store KCC
            **************************************************/
            var request = URLRequest(url: credentialEndpoint)
            request.httpMethod = "POST"
            // Include the access token in the Authorization header
            request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpBody = try JSONSerialization.data(withJSONObject: requestBody)
            
            let (data, response) = try await URLSession.shared.data(for: request)
            
            guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
                throw RequestCredentialError.networkResponseNotOK("Network response was not ok: \(response)")
            }
            
            if let data = try JSONSerialization.jsonObject(with: data) as? [String: Any], let credential = data["credential"] as? String {
                SecureStorage.shared.setItem("signedCredential", credential: credential)
            } else {
                throw RequestCredentialError.signedCredentialNotFound
            }
            
        } catch {
            throw RequestCredentialError.jwtSigningFailed(error.localizedDescription)
        }
    }
    // :snippet-end:
}