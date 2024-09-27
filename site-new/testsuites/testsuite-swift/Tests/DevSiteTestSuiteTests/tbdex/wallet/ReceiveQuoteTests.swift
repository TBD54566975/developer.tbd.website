import XCTest
import Mocker
import Web5
import TypeID
@testable import tbDEX

final class ReceiveQuotes: XCTestCase {
    var customerDid: BearerDID?
    let pfiDid: String = "did:dht:ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy"
    var exchangeID: String?
    var rfq: RFQ?
    var initialQuote: Quote?

    override func setUp() {
        super.setUp()
        MockData.allowDidResolution(didUri: pfiDid)
        
        do {
            customerDid = try DIDJWK.create(keyManager: InMemoryKeyManager())
        } catch {
            XCTFail("Failed to create customerDid: \(error)")
        }

        rfq = MockData.rfq
        exchangeID = rfq?.metadata.exchangeID        
    }

    func mockSendCloseMessage() {
        let closeEndpoint = "https://localhost:9000/exchanges/\(exchangeID!)"
        let url = URL(string: closeEndpoint)!
        Mocker.register(Mock(url: url, contentType: .json, statusCode: 200, data: [.put: Data()]))
    }

    func testPollForQuotes() async throws {
        MockData.mockExchangeWithQuote()

        // :snippet-start: pollForQuoteSwift
        var quote: Quote? = nil
        var close: Close? = nil

        // Wait for Quote message to appear in the exchange
        while quote == nil {
            let exchange = try! await tbDEXHttpClient.getExchange(
                pfiDIDURI: (rfq?.metadata.to)!,
                requesterDID: customerDid!,
                exchangeId: (rfq?.metadata.exchangeID)!
            )

            for message in exchange {
                if case let .quote(quoteMessage) = message {
                    quote = quoteMessage
                    break
                } else if case let .close(closeMessage) = message {
                    close = closeMessage
                    break
                }
            }

            if quote == nil {
                // Make sure the exchange is still open
                if close != nil { break }
                else {
                    // Wait 2 seconds before making another request
                    try await Task.sleep(nanoseconds: 2_000_000_000)
                }
            }
        }

        // :snippet-end:
        XCTAssertNotNil(quote)
        XCTAssertEqual(quote?.metadata.exchangeID, exchangeID)
        XCTAssertNil(close)
    }

    func testCloseExchange() async throws {
        let quote = MockData.mockQuote
        mockSendCloseMessage()

        // :snippet-start: cancelExchangeSwift
        var closeMessage = Close(
            from: customerDid!.uri,
            to: quote!.metadata.from,
            exchangeID: quote!.metadata.exchangeID,
            data: CloseData(reason: "Canceled by customer"),
            protocol: "1.0"
        )
        try! closeMessage.sign(did: customerDid!)
        try! await tbDEXHttpClient.submitClose(close: closeMessage)
        // :snippet-end:

        XCTAssertNotNil(closeMessage, "No closeMessage found")
        XCTAssertEqual(closeMessage.metadata.exchangeID, exchangeID, "The exchangeID of the found quote does not match")
    }
}
