import XCTest
// :prepend-start: exportDidSwift
import Web5
// :prepend-end:
@testable import DevSiteTestSuite

final class ImportDidTests: XCTestCase {

    func test_exportADID() async throws {
        let keyManager = InMemoryKeyManager()
        let didJwk = try DIDJWK.create(keyManager: keyManager)
        // :snippet-start: exportDidSwift
        // export did:jwk DID
        let portableJwkDID = try didJwk.export()
        // :snippet-end:
        if let jsonData = try? JSONEncoder().encode(portableJwkDID),
           let jsonObject = try? JSONSerialization.jsonObject(with: jsonData, options: []) as? [String: Any],
           let portableDidJwkUri = jsonObject["uri"] as? String {
            
        
            XCTAssertEqual(portableDidJwkUri, didJwk.uri, "The extracted URI should match the original DID's URI")
        }
    }
    func test_importtADID() async throws {
        let keyManager = InMemoryKeyManager()
        let didJwk = try DIDJWK.create(keyManager: keyManager)
        let portableJwkDID = try didJwk.export()
        // :snippet-start: importDidSwift
        // import did:jwk DID
        let bearerJwkDID = try DIDJWK.import(keyManager: keyManager, portableDID: portableJwkDID)
        // :snippet-end:
        XCTAssertEqual(bearerJwkDID.uri, didJwk.document.id, "URI should match")
    }
}
