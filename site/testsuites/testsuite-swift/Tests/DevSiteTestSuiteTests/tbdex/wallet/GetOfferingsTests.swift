import XCTest
import Mocker
import Web5
import tbDEX

final class GetOfferingsTests: XCTestCase {
    
    let pfiDid = MockData.pfiDid
    let mockURL = URL(string: "https://localhost:9000/offerings")!
    
    override func setUp() {
        super.setUp()
        MockData.allowDidResolution(didUri: pfiDid)

        var offerings = [Offering]()
        offerings.append(MockData.selectedOffering)
        let data: [String: [Offering]] = ["data": offerings]
        MockData.setupMockGetCall(url: mockURL, data: data)
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
                offering.data.payin.currencyCode == payinCurrencyCode &&
                offering.data.payout.currencyCode == payoutCurrencyCode
            }
            
            matchedOfferings.append(contentsOf: filteredOfferings)
        }
        // :snippet-end:

        XCTAssertEqual(matchedOfferings.count, 1, "Exactly 1 offering should be returned")
    }
}
