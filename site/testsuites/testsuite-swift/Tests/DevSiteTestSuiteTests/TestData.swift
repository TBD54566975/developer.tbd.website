import Web5
import tbDEX

final class TestData {
    func createOrder(
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

    func createOrderStatus(
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

    func createClose(
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

    func createQuote(
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
}