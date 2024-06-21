import XCTest
import Mocker
import Web5
import tbDEX

final class GetOfferingsTests: XCTestCase {
    
    let pfiDid = "did:dht:tra4qegipqa4af1fzcifw9uuinkse179ct58be6sceyeg61k1fho"
    let mockURL = URL(string: "https://localhost:9000/offerings")!
    let offeringJson = "{\"data\":[{\"metadata\":{\"from\":\"did:dht:tra4qegipqa4af1fzcifw9uuinkse179ct58be6sceyeg61k1fho\",\"kind\":\"offering\",\"id\":\"offering_01htjbtbwye92t9gxm8cer2rrn\",\"createdAt\":\"2024-04-03T16:14:05.727Z\",\"protocol\":\"1.0\"},\"data\":{\"description\":\"Selling KES for USD\",\"payin\":{\"currencyCode\":\"USD\",\"min\":\"0.0\",\"max\":\"999999.99\",\"methods\":[{\"kind\":\"DEBIT_CARD\",\"requiredPaymentDetails\":{\"$schema\":\"http://json-schema.org/draft-07/schema\",\"type\":\"object\",\"properties\":{\"cardNumber\":{\"type\":\"string\",\"description\":\"The 16-digit debit card number\",\"minLength\":16,\"maxLength\":16},\"expiryDate\":{\"type\":\"string\",\"description\":\"The expiry date of the card in MM/YY format\",\"pattern\":\"^(0[1-9]|1[0-2])\\\\/([0-9]{2})$\"},\"cardHolderName\":{\"type\":\"string\",\"description\":\"Name of the cardholder as it appears on the card\"},\"cvv\":{\"type\":\"string\",\"description\":\"The 3-digit CVV code\",\"minLength\":3,\"maxLength\":3}},\"required\":[\"cardNumber\",\"expiryDate\",\"cardHolderName\",\"cvv\"],\"additionalProperties\":false}}]},\"payout\":{\"currencyCode\":\"KES\",\"max\":\"999526.11\",\"methods\":[{\"kind\":\"BTC_ADDRESS\",\"requiredPaymentDetails\":{\"$schema\":\"http://json-schema.org/draft-07/schema\",\"type\":\"object\",\"properties\":{\"btcAddress\":{\"type\":\"string\",\"description\":\"your Bitcoin wallet address\"}},\"required\":[\"btcAddress\"],\"additionalProperties\":false},\"estimatedSettlementTime\":10}]},\"payoutUnitsPerPayinUnit\":\"0.00003826\",\"requiredClaims\":{\"id\":\"7ce4004c-3c38-4853-968b-e411bafcd945\",\"input_descriptors\":[{\"id\":\"bbdb9b7c-5754-4f46-b63b-590bada959e0\",\"constraints\":{\"fields\":[{\"path\":[\"$.type[*]\"],\"filter\":{\"type\":\"string\",\"pattern\":\"^YoloCredential$\"}}]}}]}},\"signature\":\"eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6dHJhNHFlZ2lwcWE0YWYxZnpjaWZ3OXV1aW5rc2UxNzljdDU4YmU2c2NleWVnNjFrMWZobyMwIn0..dhiY49OpIF5SsLDsEtgWDJXUqSmjYxIbhNt_Kn7q1CqcZQOIEoWmH6He2mzEafFO6TVLCq7IaOQCocuRwLfGBg\"}]}"
       
    
    override func setUp() {
        super.setUp()
        MockData.allowDidResolution(didUri: pfiDid)

        let mockOffering = offeringJson
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
                offering.data.payin.currencyCode == payinCurrencyCode &&
                offering.data.payout.currencyCode == payoutCurrencyCode
            }
            
            matchedOfferings.append(contentsOf: filteredOfferings)
        }
        // :snippet-end:

        XCTAssertEqual(matchedOfferings.count, 1, "Exactly 1 offering should be returned")
    }
}
