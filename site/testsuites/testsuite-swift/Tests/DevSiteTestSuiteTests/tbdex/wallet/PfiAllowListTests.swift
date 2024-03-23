import XCTest
import Mocker
// :prepend-start: isPFISwift
import Web5
// :prepend-end:
@testable import DevSiteTestSuite



final class PfiAllowListTests: XCTestCase {
    
    func testPfiDidHasPfiService() async throws {
        //Force Mock to ignore the request so that resolve endpoint is called for real
        let ignoredURL = URL(string: "https://diddht.tbddev.org/ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy")!
        Mocker.ignore(ignoredURL)
        
        let pfiDid = "did:dht:ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy"
        
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