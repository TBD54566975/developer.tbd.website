import XCTest
// :prepend-start: resolveADidSwift
import Web5
// :prepend-end:
@testable import DevSiteTestSuite


final class ResolveDidTests: XCTestCase {

    func test_resolveADID() async throws {
        let didJwk = try DIDJWK.create(keyManager: InMemoryKeyManager())
        let didJwkUri = didJwk.uri
        let didDhtUri: String = "did:dht:ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy"

        // :snippet-start: resolveDidSwift
        // resolve did:jwk DID
        let jwkResolver = DIDJWK.Resolver()
        let jwkResolvedDid = await jwkResolver.resolve(didURI: didJwkUri)
        let jwkDidDocument = jwkResolvedDid.didDocument

        // resolve did:DHT DID
        let dhtResolver = DIDDHT.Resolver()
        let dhtResolvedDid = await dhtResolver.resolve(didURI: didDhtUri)
        let dhtDidDocument = dhtResolvedDid.didDocument
        // :snippet-end:

        XCTAssertNotNil(jwkDidDocument, "(JWK) The DID document should not be nil.")
        XCTAssertEqual(jwkDidDocument?.id, didJwkUri, "(JWK) The DID document's ID should match the DID URI.")
        XCTAssertNotNil(dhtDidDocument, "(DHT) The DID document should not be nil.")
        XCTAssertEqual(dhtDidDocument?.id, didDhtUri, "(DHT) The DID document's ID should match the DID URI.")
    }
}