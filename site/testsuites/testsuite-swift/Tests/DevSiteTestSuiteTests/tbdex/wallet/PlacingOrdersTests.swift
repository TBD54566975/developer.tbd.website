import XCTest
import Mocker
import Web5
import TypeID
@testable import tbDEX
@testable import DevSiteTestSuite

final class WalletPlacingOrdersTests: XCTestCase {

    var customerBearerDid: BearerDID?
    let pfiBearerDid: String = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
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
        orderStatus = TestData.createOrderStatus(
            from: customerBearerDid!.uri, 
            to: pfiBearerDid, 
            exchangeId: exchangeId, 
            status: orderStatusMessage)
        try! orderStatus!.sign(did: customerBearerDid!)

        // Create Close
        close = TestData.createClose(
            from: customerBearerDid!.uri, 
            to: pfiBearerDid,
            exchangeId: exchangeId,
            reason: closeReason)
        try! close!.sign(did: customerBearerDid!)
    }

    func testSendOrderMessage() async throws {
        guard let customerDid = customerBearerDid else {
            XCTFail("Failed to unwrap DIDs")
            return
        }
        let pfiDid: String = pfiBearerDid

        // :snippet-start: createOrderSwift
        var order = Order(from: customerDid.uri, to: pfiDid, exchangeID: exchangeId, data: .init())
        // :snippet-end:

        TestData.mockSendOrderMessage(exchangeId: exchangeId)

        // :snippet-start: sendOrderSwift
        try! order.sign(did: customerDid)
        try! await tbDEXHttpClient.sendMessage(message: order)
        // :snippet-end:
    }

    func testStatusUpdate() async throws {
        var orderStatusUpdate: String?
        var closeMessage: Close?

        guard let customerDid = customerBearerDid else {
            XCTFail("Failed to unwrap DIDs")
            return
        }

        let pfiDid: String = pfiBearerDid
        TestData.mockGetExchangeWithClose(
            to: customerBearerDid!.uri, 
            from: pfiBearerDid, 
            exchangeId: exchangeId, 
            closeReason: closeReason)

        // :snippet-start: listenForOrderStatusSwift
        while (closeMessage == nil) {
            let messages = try await tbDEXHttpClient.getExchange(
                pfiDIDURI: pfiDid, 
                requesterDID: customerDid,
                exchangeId: exchangeId)
            for message in messages {
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
