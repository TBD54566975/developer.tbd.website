import XCTest
import Mocker
import Web5
import TypeID
@testable import tbDEX
@testable import DevSiteTestSuite

final class WalletPlacingOrdersTests: XCTestCase {

    var customerBearerDid: BearerDID?
    var pfiBearerDid: BearerDID?
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
            pfiBearerDid = try DIDJWK.create(keyManager: InMemoryKeyManager())
        } catch {
            XCTFail("Failed to create dids: \(error)")
        }

        // Create OrderStatus
        orderStatus = TestData.createOrderStatus(
            from: customerBearerDid!.uri, 
            to: pfiBearerDid!.uri, 
            exchangeId: exchangeId, 
            status: orderStatusMessage)
        try! orderStatus!.sign(did: customerBearerDid!)

        // Create Close
        close = TestData.createClose(
            from: customerBearerDid!.uri, 
            to: pfiBearerDid!.uri,
            exchangeId: exchangeId,
            reason: closeReason)
        try! close!.sign(did: customerBearerDid!)
    }

    func testSendOrderMessage() async throws {
        guard let pfiDid = pfiBearerDid, let customerDid = customerBearerDid else {
            XCTFail("Failed to unwrap DIDs")
            return
        }

        // :snippet-start: createOrderSwift
        var order = Order(from: customerDid.uri, to: pfiDid.uri, exchangeID: exchangeId, data: .init())
        // :snippet-end:

        // :snippet-start: sendOrderSwift
        try! order.sign(did: customerDid)
        try! await tbDEXHttpClient.sendMessage(message: order)
        // :snippet-end:
    }

    func testStatusUpdate() async throws {
        var orderStatusUpdate: String?
        var closeMessage: String?

        guard let pfiDid = pfiBearerDid, let customerDid = customerBearerDid else {
            XCTFail("Failed to unwrap DIDs")
            return
        }

        // :snippet-start: listenForOrderStatusSwift
        while (closeMessage == nil) {
            let messages = try await tbDEXHttpClient.getExchange(
                pfiDIDURI: pfiDid.uri, 
                requesterDID: customerDid.uri,
                exchangeId: exchangeId)

            for message in messages {
                if message.kind == "OrderStatus" {
                    orderStatusUpdate = message.data.orderStatus
                } else if message.kind == "Close" {
                    closeMessage = message
                }
            }
        }
        // :snippet-end:

        XCTAssert(orderStatusUpdate == orderStatusMessage, "OrderStatus message is incorrect")

        // :snippet-start: getCloseReasonSwift
        var reasonForClose: String
        if let closeData = closeMessage?.data as? String {
            reasonForClose = closeData
        }
        // :snippet-end

        XCTAssert(reasonForClose == closeReason, "Close reason is not correct")
    }
}
