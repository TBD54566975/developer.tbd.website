import XCTest
import DevSiteTestSuite
import Mocker
import Web5

final class KeyManagementTests: XCTestCase {
    func testInitializeKeyManagement() throws {
        let keyManager = InMemoryKeyManager()
        let bearerDID = try DIDJWK.create(keyManager: keyManager)
        let testPortableDID = try bearerDID.export()

        // :snippet-start: initializeKeyManagementSwift
        func initKeyManagement(env: String?, portableDID: PortableDID?) throws -> BearerDID {
            let keyManager: LocalKeyManager

            // Determine which key manager to use based on the environment
            if env == "production" {
                // if production, use a more secure and production-ready key manager.
                keyManager = KeychainKeyManager()
            }
            else {
                keyManager = InMemoryKeyManager()
            }

            // Initialize or load a DID
            if portableDID != nil {
                return try DIDJWK.import(
                    keyManager: keyManager,
                    portableDID: portableDID!
                )

            }
            else {
                return try DIDJWK.create(keyManager: keyManager)
            }

        }
        // :snippet-end:

        let testImport = try! initKeyManagement(env: "", portableDID: testPortableDID)

        XCTAssertEqual(testImport.uri, bearerDID.uri, "URI should match")
        XCTAssertEqual(testImport.document, bearerDID.document, "Document should match")
    }
}
