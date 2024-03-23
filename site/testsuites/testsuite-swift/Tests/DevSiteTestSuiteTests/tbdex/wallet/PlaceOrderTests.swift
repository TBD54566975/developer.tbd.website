import XCTest
import Mocker
import Web5
import tbDEX

final class PlaceOrderTests: XCTestCase {

    var customerDid: BearerDID?
    let pfiDid: String = "did:dht:ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy"
    var quote: Quote?
    var close: Close?
    let closeReason: String = "Transaction complete"
    let exchangeId: String = "testExchange"

    override func setUp() {
        super.setUp()
        MockData.allowDidResolution(didUri: pfiDid)
        
        customerDid = try! DIDJWK.create(keyManager: InMemoryKeyManager())
        
        quote = MockData.createQuote(
            from: pfiDid, 
            to: customerDid!.uri, 
            exchangeId: exchangeId
        )
    }

    func testSendOrderMessage() async throws {
        // :snippet-start: createOrderSwift
        var order = Order(
            from: customerDid!.uri, // Customer's DID
            to: pfiDid, // PFI's DID
            exchangeID: quote!.metadata.exchangeID, // Exchange ID from the Quote
            data: .init(),
            externalID: nil,
            protocol: "1.0"
        )
        // :snippet-end:

        // :snippet-start: signOrderSwift
        try! order.sign(did: customerDid!)
        // :snippet-end:

        MockData.mockSendOrderMessage(exchangeId: exchangeId)

        // :snippet-start: sendOrderSwift
        try! await tbDEXHttpClient.submitOrder(order: order)
        // :snippet-end:
    }

    func testStatusUpdate() async throws {
        MockData.mockGetExchangeWithClose(
            from: pfiDid,
            to: customerDid!.uri,  
            exchangeId: exchangeId, 
            closeReason: closeReason
        )

        // :snippet-start: listenForOrderStatusSwift
        var orderStatusUpdate: String?
        var closeMessage: Close?

        while closeMessage == nil {
            let exchange = try await tbDEXHttpClient.getExchange(
                pfiDIDURI: quote!.metadata.from,
                requesterDID: customerDid!,
                exchangeId: quote!.metadata.exchangeID
            )
            
            for message in exchange {
                if case .orderStatus(let orderStatus) = message {
                    // a status update to display to your customer
                    orderStatusUpdate = orderStatus.data.orderStatus
                }
                else if case .close(let close) = message {
                    // final message of exchange has been written
                    closeMessage = close
                    break
                }
            }
        }
        // :snippet-end:
        
        // :snippet-start: getCloseReasonSwift
        let reasonForClose = closeMessage!.data.reason
        // :snippet-end:

        XCTAssertEqual(reasonForClose, closeReason)

        //removing warning from console
        _ = orderStatusUpdate
    }
}
