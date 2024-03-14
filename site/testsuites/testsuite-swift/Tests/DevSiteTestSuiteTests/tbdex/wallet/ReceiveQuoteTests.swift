import XCTest
import Mocker
import Web5
import TypeID
@testable import tbDEX

final class ReceiveQuotes: XCTestCase {
    var customerBearerDid: BearerDID?
    let pfiDidUri: String = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
    var selectedOffering: Offering?
    var rfq: RFQ?
    var initialQuote: Quote?
    let exchangeID = "exchange_123"

    override func setUp() {
        super.setUp()
        do {
            customerBearerDid = try DIDJWK.create(keyManager: InMemoryKeyManager())
        } catch {
            XCTFail("Failed to create customerDid: \(error)")
        }

        selectedOffering = Offering(
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

        let BTC_ADDRESS = "bc1q52csjdqa6cq5d2ntkkyz8wk7qh2qevy04dyyfd"
        let selectedCredentials: [String] = []
        let offeringId: TypeID

        if let rawValue = selectedOffering?.metadata.id.rawValue, let id = TypeID(rawValue: rawValue) {
            offeringId = id
        } else {
            offeringId = TypeID(rawValue: "default")!
        }

        rfq = RFQ(
            to: (selectedOffering?.metadata.from)!,
            from: customerBearerDid!.uri,
            data: .init(
                offeringId: offeringId,
                payinAmount: "0.012",
                payinMethod: SelectedPaymentMethod(
                    kind: "BTC_WALLET_ADDRESS",
                    paymentDetails: [
                        "btc_address": BTC_ADDRESS
                    ]
                ),
                payoutMethod: SelectedPaymentMethod(
                    kind: "DEBIT_CARD",
                    paymentDetails: [
                        "cvv": "123",
                        "cardNumber": "1234567890123456789",
                        "expiryDate": "05/25",
                        "cardHolderName": "Alice Doe"
                    ]
                ),
                claims: selectedCredentials
            )
        )
        mockGetExchange()
        mockSendCloseMessage()
    }

    func mockGetExchange() {
        let exchangeIdFromRFQ = rfq?.metadata.exchangeID ?? ""
        let url = URL(string: "http://localhost:9000/exchanges/\(exchangeIdFromRFQ)")!

        let jsonString = """
        {
        "data": [
            {
                "metadata": {
                "exchangeId": "exchange_123",
                "to": "\(pfiDidUri)",
                "kind": "quote",
                "id": "quote_01hrwc4v55es59t20dhf7dea60",
                "from": "\(customerBearerDid!.uri)",
                "createdAt": "2023-12-19T05:12:16.331Z",
                },
                "data": {
                "expiresAt": "2024-12-19T05:12:16.331Z",
                "payin": {
                    "paymentInstruction": {
                    "instruction": "test instruction",
                    "link": "https://tbdex.io/example"
                    },
                    "currencyCode": "USD",
                    "amount": "1.00"
                },
                "payout": {
                    "amount": "2.00",
                    "currencyCode": "AUD",
                    "fee": "0.50"
                }
                },
                "signature": "eyJraWQiOiJkaWQ6andrOmV5SnJhV1FpT2lKQ2FtVlZWWEEzUmpOTWEyOWFTV1ZaTW1GSldWWTBlRWhOYjFkUFZXaEpZMnQzVEdsblYyeFZieTFSSWl3aVlXeG5Jam9pUldSRVUwRWlMQ0pqY25ZaU9pSkZaREkxTlRFNUlpd2llQ0k2SW1Oc1ZsWTJNVlJGY2sxeVdsTk9NVVV6TTJoWFZYRjVaRVV4U1ZOV1VWbExPVk5FVUVnNWRrRkdhV3NpTENKcmRIa2lPaUpQUzFBaWZRIzAiLCJhbGciOiJFZERTQSJ9..WRwJUKc_H5jtY_1zT2shQh7xih7UIYv5KOcorf7JkxKiLCmyyjStd0rThUsAmDPqoAe38oB0FwENvjZfswxzAQ"
            }
        ]
        }
        """
        guard let jsonData = jsonString.data(using: .utf8) else {
            XCTFail("Failed to convert jsonString to Data")
            return
        }
        Mocker.register(Mock(url: url, contentType: .json, statusCode: 200, data: [.get: jsonData]))
    }

    func mockSendCloseMessage() {
        let closeEndpoint = "http://localhost:9000/exchanges/\(exchangeID)/close"
        guard let closeURL = URL(string: closeEndpoint) else {
            XCTFail("Failed to create URL for closing exchange")
            return
        }

        let mockCloseResponse = Mock(url: closeURL, contentType: .json, statusCode: 200, data: [.post: Data()])
        mockCloseResponse.register()
    }

    func testPollForQuotes() async throws {
        guard let customerDid = customerBearerDid else {
            XCTFail("Customer DID not found")
            return
        }
        // :snippet-start: pollForQuoteSwift
        var quote: Quote? = nil

        //Wait for Quote message to appear in the exchange
        while quote == nil {
            let messages = try await tbDEXHttpClient.getExchange(
                pfiDIDURI: rfq?.metadata.to ?? "",
                requesterDID: customerDid,
                exchangeId: rfq?.metadata.exchangeID ?? ""
            )

            for message in messages {
                if case .quote(let quoteMessage) = message {
                    quote = quoteMessage
                    break
                }
            }

            if quote == nil {
                // Wait 2 seconds before making another request
                try await Task.sleep(nanoseconds: 2_000_000_000)
            }
        }
        // :snippet-end:
        XCTAssertNotNil(quote, "No quote found")
        XCTAssertEqual(quote?.metadata.exchangeID, exchangeID, "The exchangeID of the found quote does not match")
    }

    func testCloseExchange() async throws {
        guard let customerDid = customerBearerDid else {
            XCTFail("Customer DID not found")
            return
        }

        let quote = Quote(
            from: pfiDidUri,
            to: customerDid.uri,
            exchangeID: "exchange_123",
            data: QuoteData(
                expiresAt: Date().addingTimeInterval(60),
                payin: QuoteDetails(
                    currencyCode: "USD",
                    amount: "1.00",
                    paymentInstruction: PaymentInstruction(
                        link: "https://example.com/pay",
                        instruction: "Pay here"
                    )
                ),
                payout: QuoteDetails(
                    currencyCode: "AUD",
                    amount: "2.00",
                    fee: "0.50"
                )
            )
        )

        // :snippet-start: cancelExchangeSwift
        var closeMessage = Close(
            from: customerDid.uri,
            to: quote.metadata.from,
            exchangeID: quote.metadata.exchangeID,
            data: CloseData(reason: "Canceled by customer")
        )
        try! closeMessage.sign(did: customerDid)
        try! await tbDEXHttpClient.sendMessage(message: closeMessage)
        // :snippet-end:

        XCTAssertNotNil(closeMessage, "No closeMessage found")
        XCTAssertEqual(closeMessage.metadata.exchangeID, exchangeID, "The exchangeID of the found quote does not match")
    }
}
