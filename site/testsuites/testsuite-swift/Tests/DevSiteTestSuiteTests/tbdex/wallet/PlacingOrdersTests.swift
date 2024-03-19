import XCTest
import Mocker
import Web5
import TypeID
@testable import tbDEX
@testable import DevSiteTestSuite

final class WalletPlacingOrdersTests: XCTestCase {

    var customerBearerDid: BearerDID?
    let pfiDid: String = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
    var orderStatus: OrderStatus?
    var close: Close?
    let closeReason: String = "Transaction complete"
    let orderStatusMessage: String = "Processing"
    let exchangeId: String = "testExchange"

    override func setUp() {
        super.setUp()
        
        // Setup DIDs
        do {
            customerBearerDid = try DIDJWK.create(keyManager: InMemoryKeyManager())
        } catch {
            XCTFail("Failed to create dids: \(error)")
        }

        // Create OrderStatus
        orderStatus = MockData.createOrderStatus(
            from: customerBearerDid!.uri, 
            to: pfiDid, 
            exchangeId: exchangeId, 
            status: orderStatusMessage)
        try! orderStatus!.sign(did: customerBearerDid!)

        // Create Close
        close = MockData.createClose(
            from: customerBearerDid!.uri, 
            to: pfiDid,
            exchangeId: exchangeId,
            reason: closeReason)
        try! close!.sign(did: customerBearerDid!)
    }

    func testSendOrderMessage() async throws {
        guard let customerDid = customerBearerDid else {
            XCTFail("Failed to unwrap DIDs")
            return
        }

        // :snippet-start: createOrderSwift
        var order = Order(from: customerDid.uri, to: pfiDid, exchangeID: exchangeId, data: .init())
        // :snippet-end:

        MockData.mockSendOrderMessage(exchangeId: exchangeId)

        // :snippet-start: signOrderSwift
        try! order.sign(did: customerDid)
        // :snippet-end:

        // :snippet-start: sendOrderSwift
        try! await tbDEXHttpClient.sendMessage(message: order)
        // :snippet-end:
    }

    func testStatusUpdate() async throws {
        guard let customerDid = customerBearerDid else {
            XCTFail("Failed to unwrap DIDs")
            return
        }

        let pfiDid: String = pfiDid
        MockData.mockGetExchangeWithClose(
            from: pfiDid,
            to: customerBearerDid!.uri,  
            exchangeId: exchangeId, 
            closeReason: closeReason)

        let quote = MockData.createQuote(from: pfiDid, to: customerBearerDid!.uri, exchangeId: exchangeId)

        // :snippet-start: listenForOrderStatusSwift
        var orderStatusUpdate: String?
        var closeMessage: Close?

        while closeMessage == nil {
            let exchange = try await tbDEXHttpClient.getExchange(
                pfiDIDURI: quote.metadata.from,   // PFI's DID
                requesterDID: customerDid,        // Customer's DID
                exchangeId: quote.metadata.exchangeID)           // Exchange ID from the Quote
            for message in exchange {
                guard case let .orderStatus(orderStatus) = message else {
                    guard case let .close(close) = message else {
                        // neither OrderStatus nor Close
                        continue
                    }
                    // final message of exchange has been written
                    closeMessage = close
                    break
                }
                //a status update to display to your customer
                orderStatusUpdate = orderStatus.data.orderStatus
            }
        }
        // :snippet-end:

        // :snippet-start: getCloseReasonSwift
        let reasonForClose = closeMessage!.data.reason
        // :snippet-end

        XCTAssert(reasonForClose == closeReason, "Close reason is not correct")
    }
}
