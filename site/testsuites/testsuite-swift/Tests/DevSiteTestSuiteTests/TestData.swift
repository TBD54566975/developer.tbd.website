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

    static func mockGetExchange(to: String, from: String, exchangeId: String) {
        let url = URL(string: "http://localhost:9000/exchanges/\(exchangeId)")!

        let jsonString = """
        {
        "data": [
            {
                "metadata": {
                "exchangeId": "exchange_123",
                "to": "\(to)",
                "kind": "quote",
                "id": "quote_01hrwc4v55es59t20dhf7dea60",
                "from": "\(from)",
                "createdAt": "2023-12-19T05:12:16.331Z",
                },
                "data": {
                "expiresAt": "2024-12-19T05:12:16.331Z",
                "payin": {
                    "paymentInstruction": {
                    "instruction": "test instruction",
                    "link": "https://tbdex.io/example"
                    },
                    "currencyCode": "USD",
                    "amount": "1.00"
                },
                "payout": {
                    "amount": "2.00",
                    "currencyCode": "AUD",
                    "fee": "0.50"
                }
                },
                "signature": "eyJraWQiOiJkaWQ6andrOmV5SnJhV1FpT2lKQ2FtVlZWWEEzUmpOTWEyOWFTV1ZaTW1GSldWWTBlRWhOYjFkUFZXaEpZMnQzVEdsblYyeFZieTFSSWl3aVlXeG5Jam9pUldSRVUwRWlMQ0pqY25ZaU9pSkZaREkxTlRFNUlpd2llQ0k2SW1Oc1ZsWTJNVlJGY2sxeVdsTk9NVVV6TTJoWFZYRjVaRVV4U1ZOV1VWbExPVk5FVUVnNWRrRkdhV3NpTENKcmRIa2lPaUpQUzFBaWZRIzAiLCJhbGciOiJFZERTQSJ9..WRwJUKc_H5jtY_1zT2shQh7xih7UIYv5KOcorf7JkxKiLCmyyjStd0rThUsAmDPqoAe38oB0FwENvjZfswxzAQ"
            }
        ]
        }
        """
        guard let jsonData = jsonString.data(using: .utf8) else {
            XCTFail("Failed to convert jsonString to Data")
            return
        }
        Mocker.register(Mock(url: url, contentType: .json, statusCode: 200, data: [.get: jsonData]))
    }
}