import XCTest
import Mocker
// :prepend-start: isPFISwift
import Web5
// :prepend-end:
@testable import DevSiteTestSuite



final class PfiAllowListTests: XCTestCase {
    
    func testPfiDidHasPfiService() async throws {
        //Force Mock to ignore the request so that resolve endpoint is called for real
        let ignoredURL = URL(string: "https://diddht.tbddev.org/4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo")!
        Mocker.ignore(ignoredURL)
        
        let pfiDid = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
        
        // :snippet-start: isPFISwift
        let isPfi: Bool = await DIDDHT.Resolver()
            .resolve(didURI: pfiDid)
            .didDocument?
            .service?
            .contains { service in
                service.type == "PFI"
            } ?? false
        // :snippet-end:

        XCTAssert(isPfi, "PFI DID should have a PFI service")
    }
}