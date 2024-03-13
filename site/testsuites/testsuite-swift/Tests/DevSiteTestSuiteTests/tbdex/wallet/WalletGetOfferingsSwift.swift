// import XCTest
// import Web5
// import tbDEX
// import Mocker

// @testable import DevSiteTestSuite

// final class OfferingsFetchTests: XCTestCase {
//   let pfiDidUri = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
// // let ignoredURL = URL(string: "https://diddht.tbddev.org/4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo")!
// //   Mocker.ignore(ignoredURL)
//     override func setUp() {
//         super.setUp()

//         //   let mockData = """
//         // {
//         //     "data": [
//         //         {
//         //             "metadata": {
//         //                 "from": "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo",
//         //                 "kind": "offering",
//         //                 "id": "offering_123456",
//         //                 "createdAt": "2023-01-01T00:00:00Z"
//         //             },
//         //             "data": {
//         //                 "description": "Selling BTC for USD",
//         //                 "payinCurrency": {
//         //                     "currencyCode": "USD",
//         //                     "minSubunits": "0",
//         //                     "maxSubunits": "99999999"
//         //                 },
//         //                 "payoutCurrency": {
//         //                     "currencyCode": "BTC",
//         //                     "maxSubunits": "99952611"
//         //                 },
//         //                 "payoutUnitsPerPayinUnit": "0.00003826",
//         //                 "payinMethods": [
//         //                     {
//         //                         "kind": "DEBIT_CARD",
//         //                         "requiredPaymentDetails": {
//         //                             "$schema": "http://json-schema.org/draft-07/schema",
//         //                             "type": "object",
//         //                             "properties": {
//         //                                 "cardNumber": {
//         //                                     "type": "string",
//         //                                     "description": "The 16-digit debit card number",
//         //                                     "minLength": 16,
//         //                                     "maxLength": 16
//         //                                 },
//         //                                 "expiryDate": {
//         //                                     "type": "string",
//         //                                     "description": "The expiry date of the card in MM/YY format",
//         //                                     "pattern": "^(0[1-9]|1[0-2])\\\\/([0-9]{2})$"
//         //                                 },
//         //                                 "cardHolderName": {
//         //                                     "type": "string",
//         //                                     "description": "Name of the cardholder as it appears on the card"
//         //                                 },
//         //                                 "cvv": {
//         //                                     "type": "string",
//         //                                     "description": "The 3-digit CVV code",
//         //                                     "minLength": 3,
//         //                                     "maxLength": 3
//         //                                 }
//         //                             },
//         //                             "required": ["cardNumber", "expiryDate", "cardHolderName", "cvv"]
//         //                         }
//         //                     }
//         //                 ],
//         //                 "payoutMethods": [
//         //                     {
//         //                         "kind": "BTC_ADDRESS",
//         //                         "requiredPaymentDetails": {
//         //                             "$schema": "http://json-schema.org/draft-07/schema",
//         //                             "type": "object",
//         //                             "properties": {
//         //                                 "btcAddress": {
//         //                                     "type": "string",
//         //                                     "description": "Your Bitcoin wallet address"
//         //                                 }
//         //                             },
//         //                             "required": ["btcAddress"]
//         //                         }
//         //                     }
//         //                 ],
//         //                 "requiredClaims": {
//         //                     "id": "7ce4004c-3c38-4853-968b-e411bafcd945",
//         //                     "input_descriptors": [
//         //                         {
//         //                             "id": "bbdb9b7c-5754-4f46-b63b-590bada959e0",
//         //                             "constraints": {
//         //                                 "fields": [
//         //                                     {
//         //                                         "path": ["$.type"],
//         //                                        in "filter": {
//         //                                             "type": "string",
//         //                                             "const": "YoloCredential"
//         //                                         }
//         //                                     }
//         //                                 ]
//         //                             }
//         //                         }
//         //                     ]
//         //                 }
//         //             },
//         //             "signature": "exampleSignature"
//         //         }
//         //     ]
//         // }
//         // """.data(using: .utf8)!

//          let mockOffering = Offering(
//             from: pfiDidUri,
//             data: .init(
//                 description: "test offering",
//                 payoutUnitsPerPayinUnit: "1",
//                 payinCurrency: .init(currencyCode: "AUD"),
//                 payoutCurrency: .init(currencyCode: "BTC"),
//                 payinMethods: [],
//                 payoutMethods: [],
//                 requiredClaims: [:]
//             )
//         )

//        let mockURL = URL(string: "http://localhost:9000/offerings")!
//         // Update to use the new initializer
//        Mocker.register(Mock(url: mockURL, contentType: .json, statusCode: 200, data: [.get: mockData], requestError: nil))
//     }

//     func testFetchOfferings() async throws {
//         do {
//             let offerings = try await tbDEXHttpClient.getOfferings(pfiDIDURI: pfiDidUri)
//             XCTAssertFalse(offerings.isEmpty, "Expected to fetch at least one offering.")
//         } catch {
//             XCTFail("Failed to fetch offerings: \(error)")
//         }
//     }
// }

