import XCTest
import Mocker
import Web5
import TypeID
@testable import tbDEX

final class ReceiveQuotes: XCTestCase {
    var customerDid: BearerDID?
    let pfiDid: String = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
    var exchangeID: String?
    var rfq: RFQ?
    var initialQuote: Quote?

    override func setUp() {
        super.setUp()
        do {
            customerDid = try DIDJWK.create(keyManager: InMemoryKeyManager())
        } catch {
            XCTFail("Failed to create customerDid: \(error)")
        }

        rfq = MockData.rfq
        exchangeID = rfq?.metadata.exchangeID        
    }

    func mockGetExchange() {
        let url = URL(string: "http://localhost:9000/exchanges/\(exchangeID!)")!
        Mocker.register(Mock(url: url, contentType: .json, statusCode: 200, data: [.get: MockData.mockExchangeData]))
    }

    func mockSendCloseMessage() {
        let closeEndpoint = "http://localhost:9000/exchanges/\(exchangeID!)/close"
        let url = URL(string: closeEndpoint)!
        Mocker.register(Mock(url: url, contentType: .json, statusCode: 200, data: [.post: Data()]))
    }

    func testPollForQuotes() async throws {
        mockGetExchange()
        // :snippet-start: pollForQuoteSwift
        var quote: Quote? = nil

        // Wait for Quote message to appear in the exchange
        while quote == nil {
            let exchange = try! await tbDEXHttpClient.getExchange(
                pfiDIDURI: (rfq?.metadata.to)!,
                requesterDID: customerDid!,
                exchangeId: (rfq?.metadata.exchangeID)!
            )

            for message in exchange {
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
        let quote = MockData.mockQuote
        mockSendCloseMessage()

        // :snippet-start: cancelExchangeSwift
        var closeMessage = Close(
            from: customerDid!.uri,
            to: quote!.metadata.from,
            exchangeID: quote!.metadata.exchangeID,
            data: CloseData(reason: "Canceled by customer")
        )
        try! closeMessage.sign(did: customerDid!)
        try! await tbDEXHttpClient.sendMessage(message: closeMessage)
        // :snippet-end:

        XCTAssertNotNil(closeMessage, "No closeMessage found")
        XCTAssertEqual(closeMessage.metadata.exchangeID, exchangeID, "The exchangeID of the found quote does not match")
    }
}
