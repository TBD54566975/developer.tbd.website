import XCTest
import Mocker
import Web5
import tbDEX

final class GetOfferingsTests: XCTestCase {
    
    let pfiDid = "did:dht:t4zqbg8fcsrxzpnn5kbkjte5rbm5q519sc39wxzej99ea9fq5uxy"
    
    override func setUp() {
        super.setUp()

        let ignoredURL = URL(string: "https://diddht.tbddev.org/t4zqbg8fcsrxzpnn5kbkjte5rbm5q519sc39wxzej99ea9fq5uxy")!
        Mocker.ignore(ignoredURL)
    }
    
    func testGetOfferings() async throws {
        let mockURL = URL(string: "https://localhost:9000/offerings")!
        let offeringJson = MockData.offeringJson
        let mock = Mock(url: mockURL, contentType: .json, statusCode: 200, data: [.get: Data(offeringJson.utf8)])
        mock.register()
        
        do {
            // :snippet-start: walletGetOfferingsSwift
            let offerings = try await tbDEXHttpClient.getOfferings(pfiDIDURI: pfiDid)
            // :snippet-end:
             XCTAssertNotNil(offerings, "Offerings should not be nil")
        } catch {
            XCTFail("Failed to fetch offerings: \(error)")
        }
    }
}