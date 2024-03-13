import XCTest
import Web5
import tbDEX
import Mocker

@testable import tbDEX

final class OfferingsFetchTests: XCTestCase {
    struct OfferingsContainer: Codable {
        let data: [Offering]
    }
    
    let pfiDidUri = "did:dht:68cnak87her83z75a5wrixjgbfnyromhdp1x9rjk7djdtisa3u8y"
    
    var mockData: Data!
    
    override func setUp() {
        let ignoredURL = URL(string: "https://diddht.tbddev.org/68cnak87her83z75a5wrixjgbfnyromhdp1x9rjk7djdtisa3u8y")!
        Mocker.ignore(ignoredURL)
        
        super.setUp()
        
        // TO ANGIE AND CHRIS: THIS OPTION SAYS THAT METADATA AND CREATED DATE ARE NULL SO I CREATED THE MOCK JSON OF THE COMMENTED OUT CODE ON LINE 58 and ONWARDS
        // BUT THAT HAS AN ISSUE WITH THE SIGNATURE I THINK
        let offering = Offering(
            // metadata: .init(
            //     id: "offering_01hrryp5qkeva8txcvaetxzyaw",
            //     kind: .offering,
            //     from: pfiDidUri,
            //     createdAt: Date(),
            //     updatedAt: Date()
            // ),
            from: pfiDidUri,
            data: .init(
                description: "test offering",
                payoutUnitsPerPayinUnit: "1",
                payinCurrency: .init(currencyCode: "AUD"),
                payoutCurrency: .init(currencyCode: "BTC"),
                payinMethods: [],
                payoutMethods: [],
                requiredClaims: [:]
            )
        )
        let offeringsContainer = OfferingsContainer(data: [offering])
        
        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        guard let jsonData = try? encoder.encode(offeringsContainer) else {
            XCTFail("Failed to serialize offerings container to JSON")
            return
        }
        
        mockData = jsonData
        
        let mockURL = URL(string: "http://localhost:3001/offerings")!
        Mocker.register(Mock(url: mockURL, contentType: .json, statusCode: 200, data: [.get: mockData]))


        // mockData = """
        // {
        //     "data": [
        //         {
        //             "metadata": {
        //                 "from": "did:dht:68cnak87her83z75a5wrixjgbfnyromhdp1x9rjk7djdtisa3u8y",
        //                 "kind": "offering",
        //                 "id": "offering_01hrryp5qkeva8txcvaetxzyaw",
        //                 "createdAt": "2024-03-12T09:07:54.228Z"
        //             },
        //             "data": {
        //                 "description": "Selling BTC for USD",
        //                 "payoutUnitsPerPayinUnit": "0.00003826",
        //                 "payinCurrency": {
        //                     "currencyCode": "USD",
        //                     "minAmount": "0.0",
        //                     "maxAmount": "999999.99"
        //                 },
        //                 "payoutCurrency": {
        //                     "currencyCode": "KES",
        //                     "maxAmount": "999526.11"
        //                 },
        //                 "payinMethods": [
        //                     {
        //                         "kind": "DEBIT_CARD",
        //                         "requiredPaymentDetails": {
        //                             "$schema": "http://json-schema.org/draft-07/schema",
        //                             "type": "object",
        //                             "properties": {
        //                                 "cardNumber": {
        //                                     "type": "string",
        //                                     "description": "The 16-digit debit card number",
        //                                     "minLength": 16,
        //                                     "maxLength": 16
        //                                 },
        //                                 "expiryDate": {
        //                                     "type": "string",
        //                                     "description": "The expiry date of the card in MM/YY format",
        //                                     "pattern": "^(0[1-9]|1[0-2])\\/([0-9]{2})$"
        //                                 },
        //                                 "cardHolderName": {
        //                                     "type": "string",
        //                                     "description": "Name of the cardholder as it appears on the card"
        //                                 },
        //                                 "cvv": {
        //                                     "type": "string",
        //                                     "description": "The 3-digit CVV code",
        //                                     "minLength": 3,
        //                                     "maxLength": 3
        //                                 }
        //                             },
        //                             "required": ["cardNumber", "expiryDate", "cardHolderName", "cvv"]
        //                         }
        //                     }
        //                 ],
        //                 "payoutMethods": [
        //                     {
        //                         "kind": "BTC_ADDRESS",
        //                         "requiredPaymentDetails": {
        //                             "btcAddress": "your Bitcoin wallet address"
        //                         }
        //                     }
        //                 ],
        //                 "requiredClaims": {
        //                     "id": "7ce4004c-3c38-4853-968b-e411bafcd945",
        //                     "input_descriptors": [
        //                         {
        //                             "id": "bbdb9b7c-5754-4f46-b63b-590bada959e0",
        //                             "constraints": {
        //                                 "fields": [
        //                                     {
        //                                         "path": ["$.type"],
        //                                         "filter": {
        //                                             "type": "string",
        //                                             "const": "YoloCredential"
        //                                         }
        //                                     }
        //                                 ]
        //                             }
        //                         }
        //                     ]
        //                 }
        //             },
        //             "signature": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6NjhjbmFrODdoZXI4M3o3NWE1d3JpeGpnYmZueXJvbWhkcDF4OXJqazdkamR0aXNhM3U4eSMwIn0..kxUKdpqoljfUO1NunsyAHyuoBNbCMGEwQhh_cGvyQfMQY6IZMt8UkOrRP6kXFTN4megJ9xsGBX2YoDz-WfuFBQ"
        //         }
        //     ]
        // }
        // """.data(using: .utf8)!
        
        // let mockURL = URL(string: "http://localhost:3001/offerings")!
        // Mocker.register(Mock(url: mockURL, contentType: .json, statusCode: 200, data: [.get: mockData], requestError: nil))
        // print(String(data: mockData, encoding: .utf8) ?? "Failed to convert mockData to string")
        
    }
    
    func testFetchOfferings() async throws {
        do {
            let offerings = try await tbDEXHttpClient.getOfferings(pfiDIDURI: pfiDidUri)
            XCTAssertFalse(offerings.isEmpty, "Expected to fetch at least one offering.")
        } catch {
            XCTFail("Failed to fetch offerings: \(error)")
        }
    }
}
