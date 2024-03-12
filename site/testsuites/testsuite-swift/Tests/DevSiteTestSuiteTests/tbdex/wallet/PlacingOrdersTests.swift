import XCTest
import Mocker
// :prepend-start: isPFISwift
import Web5
import tbDex
// :prepend-end:
@testable import DevSiteTestSuite



final class WalletPlacingOrdersTests: XCTestCase {

    private var customerDid
    private var pfiDid
    private var order
    private var orderStatus
    private var close
    private var closeReason: String = "Transaction complete"
    private var orderStatusMessage: String = "Processing"
    private var exchangeId: String = "testExchange"

     override func setUp() {
        super.setUp()
        
        // Setup DIDs
        customerDid = try DIDJWK.create(keyManager: InMemoryKeyManager())
        pfiDid = try DIDJWK.create(keyManager: InMemoryKeyManager())

        // Create Order
        order = TestData.createOrder(from: customerDid.uri, to: pfiDid.uri, exchangeId: exchangeId)
        await order.sign(customerDid)

        // Create OrderStatus
        orderStatus = TestData.createOrderStatus(
            from: customerDid.uri, 
            to: pfiDid.uri, 
            exchangeId: exchangeId, 
            status: orderStatusMessage)
        orderStatus.sign(customerDid)

        // Create Close
        close = TestData.createClose(
            from: customerDid.uri, 
            to: pfiDid.uri,
            exchangeId: exchangeId,
            reason: closeReason)
        close.sign(customerDid)

        // Set up mock PFI server
    }

    func testSendOrderMessage() async throws {
        let quote = TestData.createQuote(from: pfiDid.uri, to: customerDid.uri)

        // :snippet-start: createOrderSwift
        let order = Order(from: customerDid, to: pfiDid, exchangeID: "", data: .init())
        // :snippet-end:

        // :snippet-start: signOrderSwift
        await order.sign(customerDid)
        // :snippet-end:

        do {
            // :snippet-start: sendOrderSwift
            await TbdexHttpClient.sendMessage(order)
            // :snippet-end:
        } catch(e) {
            XCTAssert(false, e)
        }
    }

    func testStatusUpdate() async throws {
        // :snippet-start: listenForOrderStatusSwift
        var orderStatusUpdate
        var closeMessage

        while (!closeMessage) {
            let exchange = await TbdexHttpClient.getExchange(pfiDid.uri, customerDid.uri)

            for exchange in exchanges {
                if (exchange.exchangeID == order.exchangeID) {
                    for message in exchange.messages {
                        if message.kind == "OrderStatus" {
                            orderStatusUpdate = message.data.orderStatus
                        } else if message.kind == "Close" {
                            closeMessage = message
                        }
                    }
                }
            }
        }
        // :snippet-end:

        XCTAssert(orderStatusUpdate == orderStatusMessage, "OrderStatus message is incorrect")

        // :snippet-start: getCloseReasonSwift
        let reasonForClose = closeMessage.data.reason
        // :snippet-end:

        XCTAssert(reasonForClose == closeReason, "Close reason is not correct")
    }
}