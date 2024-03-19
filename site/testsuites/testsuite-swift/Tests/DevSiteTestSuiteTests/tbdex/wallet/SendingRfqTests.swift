import XCTest
import Mocker
import Web5
import TypeID
@testable import tbDEX


final class SendingRfqTests: XCTestCase {
    var customerDid: BearerDID?
    let pfiDid: String = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
    var selectedOffering = MockData.selectedOffering
    
    override func setUp() {
        super.setUp()
        do {
            customerDid = try DIDJWK.create(keyManager: InMemoryKeyManager())
        } catch {
            XCTFail("Failed to create customerDid: \(error)")
        }
    }
    
    //no assertions needed; this is just showing how to structure a RFQ
    func testSkeletonRfqProperties() {
        let _ = """
        // :snippet-start: skeletonRfqMessageSwift
        var rfq = RFQ(
            to,      //metadata
            from,    //metadata
            data
        )
        // :snippet-end:
        """
    }

    //no assertions needed; this is just showing how to structure a RFQ
    func testSkeletonRfqMetadata() {
        let _ = """
        // :snippet-start: rfqMetadataSwift
        var rfq = RFQ(
            //highlight-start
            to: (selectedOffering?.metadata.from)!,  // PFI's DID
            from: customerDid!.uri,    // Customer's DID
            //highlight-end
            data
        )
        // :snippet-end:
        """
    }

    func testCreateAndSendRfq() async throws {
        let BTC_ADDRESS = "bc1q52csjdqa6cq5d2ntkkyz8wk7qh2qevy04dyyfd"
        let selectedCredentials: [String] = []
        do {
            // :snippet-start: createRfqMessageSwift
            var rfq = RFQ(
                to: selectedOffering.metadata.from,  // PFI's DID
                from: customerDid!.uri,    // Customer's DID
                //highlight-start
                data: .init(
                    offeringId: selectedOffering.metadata.id,   // The ID of the selected offering
                    payinAmount: "0.012",  // The amount of the payin currency
                    payinMethod: SelectedPaymentMethod(
                        kind: "BTC_WALLET_ADDRESS",   // The method of payment
                        paymentDetails: [
                            "btc_address": BTC_ADDRESS   // Customer's BTC wallet address
                        ]
                    ),
                    payoutMethod: SelectedPaymentMethod(
                        kind: "DEBIT_CARD",  // The method for receiving payout
                        paymentDetails: [
                            "cvv": "123",
                            "cardNumber": "1234567890123456789",
                            "expiryDate": "05/25",
                            "cardHolderName": "Alice Doe"
                        ]
                    ),
                    claims: selectedCredentials // Array of signed VCs required by the PFI
                )
                //highlight-end
            )
            // :snippet-end:
            XCTAssertNotNil(rfq.metadata.exchangeID)

            // :snippet-start: signRfqMessageSwift
            try rfq.sign(did: customerDid!)
            // :snippet-end:
            XCTAssertNotNil(rfq.signature)

            // Setup Mock PFI (minimal) response
            let url = URL(string: "http://localhost:9000/exchanges/" + rfq.metadata.exchangeID + "/rfq")!
            let mock = Mock(url: url, contentType: .json, statusCode: 200, data: [.post: Data()])
            mock.register()

            // :snippet-start: sendRfqMessageSwift
            try await tbDEXHttpClient.sendMessage(message: rfq)
            // :snippet-end:

        } catch {
            XCTFail("Failed to create and send RFQ: \(error)")
        }
    }
}