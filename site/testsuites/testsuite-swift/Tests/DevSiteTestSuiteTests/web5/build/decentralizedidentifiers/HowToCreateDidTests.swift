import XCTest
import Web5

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

        XCTAssertEqual(didJWK.uri, didDocument.id, "URI should match")
        XCTAssertNotNil(portableDID)
    }
}
