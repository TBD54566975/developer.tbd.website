import Web5
import tbDEX
import Foundation
import XCTest
import Mocker

final class TestData {
    static func createOrder(
            from: String,
            to: String,
            exchangeId: String
        ) -> Order {
            Order(
                from: from,
                to: to,
                exchangeID: exchangeId,
                data: .init()
            )
    }

    static func createOrderStatus(
        from: String,
        to: String,
        exchangeId: String,
        status: String
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

    static func createClose(
        from: String,
        to: String,
        exchangeId: String,
        reason: String
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

    static func createQuote(
        from: String,
        to: String,
        exchangeId: String
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

    static func mockGetExchangeWithClose(to: String, from: String, exchangeId: String, closeReason: String) {
        let url = URL(string: "http://localhost:9000/exchanges/\(exchangeId)")!
        let close = TestData.createClose(from: from, to: to, exchangeId: exchangeId, reason: closeReason)
        var exchange: [Close] = [Close]()
        exchange.append(close)
        let exchangeJson: [String: [Close]] = ["data": exchange]

        let encoder = tbDEXJSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        let jData = try! encoder.encode(exchangeJson)

        Mocker.register(Mock(url: url, contentType: .json, statusCode: 200, data: [.get: jData]))
    }

    static func mockSendOrderMessage(exchangeId: String) {
        let orderEndpoint = "http://localhost:9000/exchanges/\(exchangeId)/order"
        guard let orderURL = URL(string: orderEndpoint) else {
            XCTFail("Failed to create URL for closing exchange")
            return
        }

        let mockOrderResponse = Mock(url: orderURL, contentType: .json, statusCode: 200, data: [.post: Data()])
        mockOrderResponse.register()
    }
}