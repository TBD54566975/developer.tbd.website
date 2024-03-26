import XCTest
import Mocker
import Web5
import TypeID
import tbDEX

final class ManagingCredentialsTest: XCTestCase {
    let pfiDid = "did:dht:ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy"
    let mockURL = URL(string: "https://localhost:9000/offerings")!
    private let vcJwtResidence = "eyJraWQiOiJkaWQ6ZGh0OnA5cW5idDRrd3lrenF6Znp5eXN0ZDY5Zjhnb3N0YnAzbmY3dGRyczRyd3FqaW16MWsxY3kjMCIsInR5cCI6IkpXVCIsImFsZyI6IkVkRFNBIn0.eyJpc3MiOiJkaWQ6ZGh0OnA5cW5idDRrd3lrenF6Znp5eXN0ZDY5Zjhnb3N0YnAzbmY3dGRyczRyd3FqaW16MWsxY3kiLCJzdWIiOiJkaWQ6ZGh0OnV1b3J6ZHRqOXgzYTM1OTNtZjlleXNxaHM0NWRrZXpqdzZqYXBkdWRjMXpicjc4aXNnZXkiLCJpYXQiOjE3MDc3NjM4NDgsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJSZXNpZGVuY2VDcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6ODc5N2VkZDgtNzE2Mi00YTliLWEyMjgtNGRkZTA4NjFlNzZmIiwiaXNzdWVyIjoiZGlkOmRodDpwOXFuYnQ0a3d5a3pxemZ6eXlzdGQ2OWY4Z29zdGJwM25mN3RkcnM0cndxamltejFrMWN5IiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMi0xMlQxODo1MDo0OFoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6dXVvcnpkdGo5eDNhMzU5M21mOWV5c3FoczQ1ZGtlemp3NmphcGR1ZGMxemJyNzhpc2dleSIsImFkZHJlc3MiOiIxMCBPcmNoYXJkIHN0In19fQ.Uvq5jHJbhe7mcPXAMNtfBoD7yez6GXP0GYNuyiZI0_pyfK_mKPjrbkJPXd3LbOtYvB06XxY6tGLMTo7tiMRFDQ"
    private let vcJwtSanctions = "eyJraWQiOiJkaWQ6ZGh0Onc4bThxNXFja21vZXRzaWlrajR3ZXFhYWRjeGtjNjFkNjh6cnk3aHBpZmdveXE4dG1zb28jMCIsInR5cCI6IkpXVCIsImFsZyI6IkVkRFNBIn0.eyJpc3MiOiJkaWQ6ZGh0Onc4bThxNXFja21vZXRzaWlrajR3ZXFhYWRjeGtjNjFkNjh6cnk3aHBpZmdveXE4dG1zb28iLCJzdWIiOiJkaWQ6ZGh0OmtkMzVlNmN4M3pueXp1ajR3ejF1ZmRjeGs4ODlzYXVrYXRhYWc3YmNrM2NwY2I3cGM4NW8iLCJpYXQiOjE3MDc0OTEzODcsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJTYW5jdGlvbnNDcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6MGU4YWJhMWYtMmMwZS00MDhlLWIxOWMtZjY0NzZiYTU3NDVhIiwiaXNzdWVyIjoiZGlkOmRodDp3OG04cTVxY2ttb2V0c2lpa2o0d2VxYWFkY3hrYzYxZDY4enJ5N2hwaWZnb3lxOHRtc29vIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMi0wOVQxNTowOTo0N1oiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6a2QzNWU2Y3gzem55enVqNHd6MXVmZGN4azg4OXNhdWthdGFhZzdiY2szY3BjYjdwYzg1byIsInN0YXR1cyI6ImFwcHJvdmVkIn19fQ.Wc-qV2L3Z5WJYvUYirznpDsyk1Ntcw0kt_bhuXZDqNVXAn-d9Wta67eta-yu7V1C1T74yv6pQaqjgf2rDLxCAg"
    let offeringJson = "{\"data\":[{\"metadata\":{\"from\":\"did:dht:ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy\",\"kind\":\"offering\",\"id\":\"offering_01hsknb0hnezy8vvs6vmby9yyg\",\"createdAt\":\"2024-03-22T18:04:00.950Z\",\"protocol\":\"1.0\"},\"data\":{\"description\":\"Selling KES for USD\",\"payinCurrency\":{\"currencyCode\":\"USD\",\"minAmount\":\"0.0\",\"maxAmount\":\"999999.99\"},\"payoutCurrency\":{\"currencyCode\":\"KES\",\"maxAmount\":\"999526.11\"},\"payoutUnitsPerPayinUnit\":\"0.00003826\",\"payinMethods\":[{\"kind\":\"DEBIT_CARD\",\"requiredPaymentDetails\":{\"$schema\":\"http://json-schema.org/draft-07/schema\",\"type\":\"object\",\"properties\":{\"cardNumber\":{\"type\":\"string\",\"description\":\"The 16-digit debit card number\",\"minLength\":16,\"maxLength\":16},\"expiryDate\":{\"type\":\"string\",\"description\":\"The expiry date of the card in MM/YY format\",\"pattern\":\"^(0[1-9]|1[0-2])\\\\/([0-9]{2})$\"},\"cardHolderName\":{\"type\":\"string\",\"description\":\"Name of the cardholder as it appears on the card\"},\"cvv\":{\"type\":\"string\",\"description\":\"The 3-digit CVV code\",\"minLength\":3,\"maxLength\":3}},\"required\":[\"cardNumber\",\"expiryDate\",\"cardHolderName\",\"cvv\"],\"additionalProperties\":false}}],\"payoutMethods\":[{\"kind\":\"BTC_ADDRESS\",\"requiredPaymentDetails\":{\"$schema\":\"http://json-schema.org/draft-07/schema\",\"type\":\"object\",\"properties\":{\"btcAddress\":{\"type\":\"string\",\"description\":\"your Bitcoin wallet address\"}},\"required\":[\"btcAddress\"],\"additionalProperties\":false}}],\"requiredClaims\":{\"id\":\"7ce4004c-3c38-4853-968b-e411bafcd945\",\"input_descriptors\":[{\"id\":\"bbdb9b7c-5754-4f46-b63b-590bada959e0\",\"constraints\":{\"fields\":[{\"path\":[\"$.type\"],\"filter\":{\"type\":\"string\",\"const\":\"YoloCredential\"}}]}}]}},\"signature\":\"eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6YWM3dWo1NjZ4Z21oeXBuaXcxY2I5NmR5aG9kNTFpbndwOThvOHVneWI5eWdpa2lnNmNveSMwIn0..CLP-tlgDkNKnHZV6YMJThk-Pbezrq1SWWfWhnsGFyxobddjE_82YpwKlIC9EoJCO9Rln_vQHWB76CZkH2806CA\"}]}"

    override func setUp() {
        super.setUp()
        MockData.allowDidResolution(didUri: pfiDid)

        let mockOffering = offeringJson
        let mock = Mock(url: mockURL, contentType: .json, statusCode: 200, data: [.get: Data(mockOffering.utf8)])
        mock.register()
    }

    func presentationDefinition(offering: Offering) throws -> PresentationDefinitionV2 {
        let encodedRequiredClaims = try JSONEncoder().encode(offering.data.requiredClaims)

        return try JSONDecoder().decode(PresentationDefinitionV2.self, from: encodedRequiredClaims)
    }

    func testExtractPresentationDefinition() async throws {
        let offerings = try await tbDEXHttpClient.getOfferings(pfiDIDURI: pfiDid)
        let offering = offerings[0]
        // :snippet-start: retrievePresentationDefinitionFromOfferingsRequiredClaimsSwift
        let presentationDefinition = offering.data.requiredClaims
        // :snippet-end:

        XCTAssertNotNil(presentationDefinition)
        XCTAssertNotNil(presentationDefinition?.id)
        XCTAssertNotNil(presentationDefinition?.inputDescriptors)

    }

    func testMatchOfferingsWithSpecificCriteria() async throws {
        let pfiDids = [pfiDid]
        // :snippet-start: findMatchingOfferingsWithCredentialValidationSwift
        let payinCurrencyCode = "USD" // Desired payin currency code
        let payoutCurrencyCode = "KES" // Desired payout currency code

        // Customer's signed credentials in JWT format
        let credentials = [vcJwtResidence, vcJwtSanctions]

        // Array to store the matched offerings
        var matchedOfferings = [Offering]()

        for pfiDid in pfiDids {
            let offerings = try await tbDEXHttpClient.getOfferings(pfiDIDURI:pfiDid)

            // Filter offerings based on the desired currency pair
            let filteredOfferings = offerings.filter { offering in
                offering.data.payinCurrency.currencyCode == payinCurrencyCode &&
                offering.data.payoutCurrency.currencyCode == payoutCurrencyCode
            }
            for offering in filteredOfferings {
                // Extract the presentation definition from the offering
                do {
                    // Validate customer's VCs against the offering's presentation definition
                    try PresentationExchange.satisfiesPresentationDefinition(
                            vcJWTs: credentials,
                            presentationDefinition: offering.data.requiredClaims!
                        )

                    // Add offerings that match the customer's needs and qualifications
                    matchedOfferings.append(offering)
                } catch {
                    // Offerings where the customer's VCs do not meet the requirements are skipped
                    continue
                }

            }
        }
        // :snippet-end:
        XCTAssertNotEqual(matchedOfferings.count, 0)

    }

    func testSelectCredentialFromRequiredClaims() {
        let offering = MockData.selectedOffering
        let credentials = [vcJwtResidence, vcJwtSanctions]
        // :snippet-start: getSelectedCredentialsSwift
        let selectedCredentials = try! PresentationExchange.selectCredentials(
            vcJWTs: credentials,
            presentationDefinition: offering.data.requiredClaims!
        )
        // :snippet-end:

        XCTAssertEqual(selectedCredentials.count, 2)
        XCTAssertTrue(selectedCredentials.contains(vcJwtResidence))
        XCTAssertTrue(selectedCredentials.contains(vcJwtSanctions))

    }

}