import XCTest
import Mocker
import Web5
import tbDEX

final class GetOfferingsTests: XCTestCase {
    
    let pfiDid = "did:dht:ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy"
    let mockURL = URL(string: "https://localhost:9000/offerings")!
    let offeringJson = "{\"data\":[{\"metadata\":{\"from\":\"did:dht:ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy\",\"kind\":\"offering\",\"id\":\"offering_01hsknb0hnezy8vvs6vmby9yyg\",\"createdAt\":\"2024-03-22T18:04:00.950Z\",\"protocol\":\"1.0\"},\"data\":{\"description\":\"Selling KES for USD\",\"payinCurrency\":{\"currencyCode\":\"USD\",\"minAmount\":\"0.0\",\"maxAmount\":\"999999.99\"},\"payoutCurrency\":{\"currencyCode\":\"KES\",\"maxAmount\":\"999526.11\"},\"payoutUnitsPerPayinUnit\":\"0.00003826\",\"payinMethods\":[{\"kind\":\"DEBIT_CARD\",\"requiredPaymentDetails\":{\"$schema\":\"http://json-schema.org/draft-07/schema\",\"type\":\"object\",\"properties\":{\"cardNumber\":{\"type\":\"string\",\"description\":\"The 16-digit debit card number\",\"minLength\":16,\"maxLength\":16},\"expiryDate\":{\"type\":\"string\",\"description\":\"The expiry date of the card in MM/YY format\",\"pattern\":\"^(0[1-9]|1[0-2])\\\\/([0-9]{2})$\"},\"cardHolderName\":{\"type\":\"string\",\"description\":\"Name of the cardholder as it appears on the card\"},\"cvv\":{\"type\":\"string\",\"description\":\"The 3-digit CVV code\",\"minLength\":3,\"maxLength\":3}},\"required\":[\"cardNumber\",\"expiryDate\",\"cardHolderName\",\"cvv\"],\"additionalProperties\":false}}],\"payoutMethods\":[{\"kind\":\"BTC_ADDRESS\",\"requiredPaymentDetails\":{\"$schema\":\"http://json-schema.org/draft-07/schema\",\"type\":\"object\",\"properties\":{\"btcAddress\":{\"type\":\"string\",\"description\":\"your Bitcoin wallet address\"}},\"required\":[\"btcAddress\"],\"additionalProperties\":false}}],\"requiredClaims\":{\"id\":\"7ce4004c-3c38-4853-968b-e411bafcd945\",\"input_descriptors\":[{\"id\":\"bbdb9b7c-5754-4f46-b63b-590bada959e0\",\"constraints\":{\"fields\":[{\"path\":[\"$.type\"],\"filter\":{\"type\":\"string\",\"const\":\"YoloCredential\"}}]}}]}},\"signature\":\"eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6YWM3dWo1NjZ4Z21oeXBuaXcxY2I5NmR5aG9kNTFpbndwOThvOHVneWI5eWdpa2lnNmNveSMwIn0..CLP-tlgDkNKnHZV6YMJThk-Pbezrq1SWWfWhnsGFyxobddjE_82YpwKlIC9EoJCO9Rln_vQHWB76CZkH2806CA\"}]}"
    
    override func setUp() {
        super.setUp()

        let ignoredURL = URL(string: "https://diddht.tbddev.org/ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy")!
        Mocker.ignore(ignoredURL)

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
                offering.data.payinCurrency.currencyCode == payinCurrencyCode &&
                offering.data.payoutCurrency.currencyCode == payoutCurrencyCode
            }
            
            matchedOfferings.append(contentsOf: filteredOfferings)
        }
        // :snippet-end:

        XCTAssertEqual(matchedOfferings.count, 1, "Exactly 1 offering should be returned")
    }
}
