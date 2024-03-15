import XCTest
import Mocker
import Web5
import tbDEX

final class GetOfferingsTests: XCTestCase {
    
    let pfiDid = "did:dht:f9pfkh1co4d5u1h9gjpme6tmx6xu8g565omrtohicfx1cqzw79dy"
    
    override func setUp() {
        super.setUp()

        let ignoredURL = URL(string: "https://diddht.tbddev.org/f9pfkh1co4d5u1h9gjpme6tmx6xu8g565omrtohicfx1cqzw79dy")!
        Mocker.ignore(ignoredURL)
     }
    
    func testGetOfferings() async throws {
        let mockURL = URL(string: "http://localhost:9000/offerings")!
        Mocker.register(Mock(url: mockURL, contentType: .json, statusCode: 200, data: [.get: Data()]))

        do {
            // :snippet-start: walletGetOfferingsSwift
            let offerings = try await tbDEXHttpClient.getOfferings(pfiDIDURI: pfiDid)
            // :snippet-end:
        } catch {
            XCTFail("Failed to fetch offerings: \(error)")
        }
    }
}
