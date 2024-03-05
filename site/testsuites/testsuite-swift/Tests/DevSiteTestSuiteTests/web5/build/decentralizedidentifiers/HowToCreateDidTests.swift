import XCTest
@testable import DevSiteTestSuite
import Mocker
@testable import Web5

final class HowToCreateDidTests: XCTestCase {
    func test_createDIDJWK() throws {
        // :snippet-start: createDidJWKSwift
    //Creates a DID using the did:jwk method
    let didJWK = try DIDJWK.create(keyManager: InMemoryKeyManager())

    //DID and its associated data which can be exported and used in different contexts/apps
    let portableDID = try didJWK.export()

    // DID String
    let did = didJWK.uri

    // DID Document
    let didDocument = didJWK.document
        // :snippet-end:

        XCTAssertEqual(portableDID.uri, didJWK.uri, "URI should match")
        XCTAssertEqual(portableDID.document, didJWK.document, "Document should match")
        XCTAssertEqual(portableDID.privateKeys.count, 1, "There should be exactly one private key")
        XCTAssertNil(portableDID.metadata, "Metadata should be nil")
    }
}