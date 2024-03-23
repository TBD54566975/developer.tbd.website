import Web5
@testable import tbDEX
import Foundation
import XCTest
import Mocker
import TypeID

public struct MockData {
    public static let pfiDid: String = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
    public static var exchangeID: String = "exchange_123"
    public static let customerBearerDid: BearerDID? = try? DIDJWK.create(keyManager: InMemoryKeyManager())
    public static let BTC_ADDRESS = "bc1q52csjdqa6cq5d2ntkkyz8wk7qh2qevy04dyyfd"

    public static let selectedOfferingJson = "{\"metadata\":{\"from\":\"\(pfiDid)\",\"kind\":\"offering\",\"id\":\"offering_01hsc1j5g7fg7ayew2ys7wmsb7\",\"createdAt\":\"2024-03-19T19:03:42.855Z\",\"protocol\":\"1.0\"},\"data\":{\"description\":\"test offering\",\"payoutUnitsPerPayinUnit\":\"1\",\"payinCurrency\":{\"currencyCode\":\"AUD\"},\"payoutCurrency\":{\"currencyCode\":\"BTC\"},\"payinMethods\":[],\"payoutMethods\":[],\"requiredClaims\":{}} }"
   
    public static var selectedOffering: Offering {
        let jsonData = selectedOfferingJson.data(using: .utf8)!
        let decoder = tbDEXJSONDecoder()
        do {
            let offering = try decoder.decode(Offering.self, from: jsonData)
            return offering
        } catch {
            fatalError("Failed to decode the selected offering: \(error)")
        }
    }

    public static var rfq: RFQ? {
        guard let customerBearerDid = customerBearerDid else {
            return nil
        }

        let offeringId: TypeID = TypeID(rawValue: "offering_01hsc1j5g7fg7ayew2ys7wmsb7") ?? TypeID(rawValue: "default")!

        let mock_rfq = RFQ(
            to: pfiDid,
            from: customerBearerDid.uri,
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
                claims: []
            )
        )

        exchangeID = mock_rfq.metadata.exchangeID
        return mock_rfq
    }

    public static var mockQuote: Quote? {
        guard let customerUri = customerBearerDid?.uri else {
            return nil
        }

        return Quote(
            from: pfiDid,
            to: customerUri,
            exchangeID: exchangeID,
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
    }

    public static func createOrder(
            from: String = customerBearerDid!.uri,
            to: String = pfiDid,
            exchangeId: String = exchangeID
        ) -> Order {
            Order(
                from: from,
                to: to,
                exchangeID: exchangeId,
                data: .init()
            )
    }

    public static func createOrderStatus(
        from: String = customerBearerDid!.uri,
        to: String = pfiDid,
        exchangeId: String = exchangeID,
        status: String = ""
    ) -> OrderStatus {
        OrderStatus(
            from: from,
            to: to,
            exchangeID: exchangeId,
            data: .init(
                orderStatus: status
            )
        )
    }

    public static func createClose(
        from: String = customerBearerDid!.uri,
        to: String = pfiDid,
        exchangeId: String = exchangeID,
        reason: String = ""
    ) -> Close {
        Close(
            from: from,
            to: to,
            exchangeID: exchangeId,
            data: .init(
                reason: reason
            )
        )
    }

    public static func createQuote(
        from: String = customerBearerDid!.uri,
        to: String = pfiDid,
        exchangeId: String = exchangeID
    ) -> Quote {
        let now = Date()
        let expiresAt = now.addingTimeInterval(60)

        return Quote(
            from: from,
            to: to,
            exchangeID: exchangeId,
            data: .init(
                expiresAt: expiresAt,
                payin: .init(
                    currencyCode: "USD",
                    amount: "1.00",
                    paymentInstruction: .init(
                        link: "https://example.com",
                        instruction: "test instruction"
                    )
                ),
                payout: .init(
                    currencyCode: "AUD",
                    amount: "2.00",
                    fee: "0.50"
                )
            )
        )
    }

    public static func mockGetExchangeWithClose(
        from: String = customerBearerDid!.uri,
        to: String = pfiDid,
        exchangeId: String = exchangeID, 
        closeReason: String = "") {
        let url = URL(string: "http://localhost:9000/exchanges/\(exchangeId)")!
        let close = MockData.createClose(from: from, to: to, exchangeId: exchangeId, reason: closeReason)
        var exchange: [Close] = [Close]()
        exchange.append(close)
        let exchangeJson: [String: [Close]] = ["data": exchange]

        MockData.setupMockGetCall(url: url, data: exchangeJson)
    }

    public static func mockSendOrderMessage(exchangeId: String) {
        let orderEndpoint = "http://localhost:9000/exchanges/\(exchangeId)/order"
        guard let orderURL = URL(string: orderEndpoint) else {
            XCTFail("Failed to create URL for closing exchange")
            return
        }

        let mockOrderResponse = Mock(url: orderURL, contentType: .json, statusCode: 200, data: [.post: Data()])
        mockOrderResponse.register()
    }

    public static func mockExchangeWithQuote(
        to: String = pfiDid, 
        from: String = customerBearerDid!.uri, 
        exchangeId: String = exchangeID) {
        let url = URL(string: "http://localhost:9000/exchanges/\(exchangeId)")!
        let quote = MockData.createQuote(from: from, to: to, exchangeId: exchangeId)
        var exchange: [Quote] = [Quote]()
        exchange.append(quote)
        let exchangeJson: [String: [Quote]] = ["data": exchange]

        MockData.setupMockGetCall(url: url, data: exchangeJson)
    }

    private static func setupMockGetCall(url: URL, data: Encodable) {
        let encoder = tbDEXJSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        let jsonData = try! encoder.encode(data)

        Mocker.register(Mock(url: url, contentType: .json, statusCode: 200, data: [.get: jsonData]))
    }
}
