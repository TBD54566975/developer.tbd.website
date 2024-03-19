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
        
        let offeringJson = "{ \"data\": [ {\"metadata\":{\"from\":\"did:dht:t4zqbg8fcsrxzpnn5kbkjte5rbm5q519sc39wxzej99ea9fq5uxy\",\"kind\":\"offering\",\"id\":\"offering_01hsc1j5g7fg7ayew2ys7wmsb7\",\"createdAt\":\"2024-03-19T19:03:42.855Z\",\"protocol\":\"1.0\"},\"data\":{\"description\":\"Selling BTC for USD\",\"payinCurrency\":{\"currencyCode\":\"USD\",\"minAmount\":\"0.0\",\"maxAmount\":\"999999.99\"},\"payoutCurrency\":{\"currencyCode\":\"BTC\",\"maxAmount\":\"999526.11\"},\"payoutUnitsPerPayinUnit\":\"0.00003826\",\"payinMethods\":[{\"kind\":\"DEBIT_CARD\",\"requiredPaymentDetails\":{\"$schema\":\"http://json-schema.org/draft-07/schema\",\"type\":\"object\",\"properties\":{\"cardNumber\":{\"type\":\"string\",\"description\":\"The 16-digit debit card number\",\"minLength\":16,\"maxLength\":16},\"expiryDate\":{\"type\":\"string\",\"description\":\"The expiry date of the card in MM/YY format\",\"pattern\":\"^(0[1-9]|1[0-2])\\\\/([0-9]{2})$\"},\"cardHolderName\":{\"type\":\"string\",\"description\":\"Name of the cardholder as it appears on the card\"},\"cvv\":{\"type\":\"string\",\"description\":\"The 3-digit CVV code\",\"minLength\":3,\"maxLength\":3}},\"required\":[\"cardNumber\",\"expiryDate\",\"cardHolderName\",\"cvv\"],\"additionalProperties\":false}}],\"payoutMethods\":[{\"kind\":\"BTC_ADDRESS\",\"requiredPaymentDetails\":{\"$schema\":\"http://json-schema.org/draft-07/schema\",\"type\":\"object\",\"properties\":{\"btcAddress\":{\"type\":\"string\",\"description\":\"your Bitcoin wallet address\"}},\"required\":[\"btcAddress\"],\"additionalProperties\":false}}],\"requiredClaims\":{\"id\":\"7ce4004c-3c38-4853-968b-e411bafcd945\",\"input_descriptors\":[{\"id\":\"bbdb9b7c-5754-4f46-b63b-590bada959e0\",\"constraints\":{\"fields\":[{\"path\":[\"$.type\"],\"filter\":{\"type\":\"string\",\"const\":\"YoloCredential\"}}]}}]}},\"signature\":\"eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6dDR6cWJnOGZjc3J4enBubjVrYmtqdGU1cmJtNXE1MTlzYzM5d3h6ZWo5OWVhOWZxNXV4eSMwIn0..Lee3NVmx3J44pFTR7HxJILE6Gay7dMElVgO-bOE352lEe0KANUXmxUvjQ7MGlwQ26H-BYKUitb-JIkLwACQ8Bg\"} ]}"
        
        let mock = Mock(url: mockURL, contentType: .json, statusCode: 200, data: [.get: Data(offeringJson.utf8)])
        mock.register()
        
        do {
            // :snippet-start: walletGetOfferingsSwift
            let offerings = try await tbDEXHttpClient.getOfferings(pfiDIDURI: pfiDid)
            // :snippet-end:
        } catch {
            XCTFail("Failed to fetch offerings: \(error)")
        }
    }
}