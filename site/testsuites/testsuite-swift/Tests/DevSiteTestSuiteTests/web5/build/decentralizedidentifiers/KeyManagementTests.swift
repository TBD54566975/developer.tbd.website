import XCTest
@testable import DevSiteTestSuite
import Mocker
import Web5

final class KeyManagementTests: XCTestCase {
    func testInitializeKeyManagement() throws {
        let keyManager = InMemoryKeyManager()
        let bearerDID = try DIDJWK.create(keyManager: keyManager)
        let testPortableDID = try bearerDID.export()

        // :snippet-start: initializeKeyManagementSwift
        func initializeKeyManagement(portableDID: PortableDID?) throws -> BearerDID {
            //Creates a new instance of the InMemoryKeyManager
            let keyManager = InMemoryKeyManager() // if production, use a different key manager

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

        let testImport = try! initializeKeyManagement(portableDID: testPortableDID)

        XCTAssertEqual(testImport.uri, bearerDID.uri, "URI should match")
        XCTAssertEqual(testImport.document, bearerDID.document, "Document should match")
    }
}
