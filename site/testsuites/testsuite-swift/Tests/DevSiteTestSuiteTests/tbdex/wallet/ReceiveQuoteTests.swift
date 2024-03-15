import XCTest
import Mocker
import Web5
import TypeID
@testable import tbDEX

final class ReceiveQuotes: XCTestCase {
    var customerBearerDid: BearerDID?
    let pfiDid: String = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
    let exchangeID = "exchange_123"
    
    var selectedOffering: Offering?
    var rfq: RFQ?
    var initialQuote: Quote?

    override func setUp() {
        super.setUp()
        do {
            customerBearerDid = try DIDJWK.create(keyManager: InMemoryKeyManager())
        } catch {
            XCTFail("Failed to create customerDid: \(error)")
        }

        selectedOffering = MockData.selectedOffering
        rfq = MockData.rfq
        mockGetExchange()
        mockSendCloseMessage()
    }

    func mockGetExchange() {
        let exchangeIdFromRFQ = rfq?.metadata.exchangeID ?? ""
        let url = URL(string: "http://localhost:9000/exchanges/\(exchangeIdFromRFQ)")!

        Mocker.register(Mock(url: url, contentType: .json, statusCode: 200, data: [.get: MockData.mockExchangeData]))
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
        guard let exchangeId = rfq?.metadata.exchangeID else {
            XCTFail("Exchange ID not found")
            return
        }
        guard let pfiDidUri = rfq?.metadata.to else {
            XCTFail("PFI Did URI not found")
            return
        }

        // :snippet-start: pollForQuoteSwift
        var quote: Quote? = nil

        // Wait for Quote message to appear in the exchange
        while quote == nil {
            let messages = try await tbDEXHttpClient.getExchange(
                pfiDIDURI: pfiDidUri,
                requesterDID: customerDid,
                exchangeId: exchangeId
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
        
        guard let quote = MockData.mockQuote else {
            XCTFail("Quote not found")
            return
        }

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
