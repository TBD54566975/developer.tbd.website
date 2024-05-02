import XCTest
// :prepend-start: resolveADidSwift
import Web5
// :prepend-end:
@testable import DevSiteTestSuite


final class ResolveADidTests: XCTestCase {

    func test_resolveADID() async throws {
        let userDid = try DIDJWK.create(keyManager: InMemoryKeyManager())
        let userDidUri = userDid.uri

        // :snippet-start: resolveADidSwift
        // DHT method DIDs currently can not be created/resolved in Swift 

        let resolver = DIDJWK.Resolver()
        let resolvedDid = await resolver.resolve(didURI: userDidUri)
        
        // access the DID Document
        let didDocument = resolvedDid.didDocument
        // :snippet-end:

        XCTAssertNotNil(didDocument, "The DID document should not be nil.")
        XCTAssertEqual(didDocument?.id, userDidUri, "The DID document's ID should match the DID URI.")
        XCTAssertNotNil(didDocument?.verificationMethod, "Verification methods should not be nil.")
    }
}