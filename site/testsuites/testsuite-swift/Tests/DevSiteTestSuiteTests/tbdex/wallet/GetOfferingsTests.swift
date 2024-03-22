import XCTest
import Mocker
import Web5
import tbDEX

final class GetOfferingsTests: XCTestCase {
    
    let pfiDid = "did:dht:ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy"
    let mockURL = URL(string: "https://localhost:9000/offerings")!
    
    override func setUp() {
        super.setUp()

        let ignoredURL = URL(string: "https://diddht.tbddev.org/ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy")!
        Mocker.ignore(ignoredURL)

        let mockOffering = MockData.offeringJson
        let mock = Mock(url: mockURL, contentType: .json, statusCode: 200, data: [.get: Data(mockOffering.utf8)])
        mock.register()
    }
    
    func testGetOfferings() async throws {
        do {
            // :snippet-start: walletGetOfferingsSwift
            let offerings = try await tbDEXHttpClient.getOfferings(pfiDIDURI: pfiDid)
            // :snippet-end:
            XCTAssertEqual(offerings.count, 1, "Exactly 1 offering should be returned")
        } catch {
            XCTFail("Failed to fetch offerings: \(error)")
        }
    }

    func testGetAllOfferings() async throws {
        let pfiDids = [pfiDid]
        
        // :snippet-start: walletFindMatchingOfferingsSwift
        let payinCurrencyCode = "USD" // Desired payin currency code
        let payoutCurrencyCode = "KES" // Desired payout currency code

        var matchedOfferings = [Offering]() // Array to store the matched offerings

        // Loop through the all PFIs in your network
        for pfiDid in pfiDids { 
            
            //Makes a request to the PFI to get their offerings
            let offerings = try await tbDEXHttpClient.getOfferings(pfiDIDURI: pfiDid)
            
            // Filter offerings based on the currency pair
            let filteredOfferings = offerings.filter { offering in
                offering.data.payinCurrency.currencyCode == payinCurrencyCode &&
                offering.data.payoutCurrency.currencyCode == payoutCurrencyCode
            }
            
            matchedOfferings.append(contentsOf: filteredOfferings)
        }
        // :snippet-end:

        XCTAssertEqual(matchedOfferings.count, 1, "Exactly 1 offering should be returned")
    }
}
