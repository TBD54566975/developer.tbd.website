import Foundation
import Web5
import TypeID
@testable import tbDEX

public struct MockData {
    public static let pfiDid: String = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
    public static var exchangeID: String = "exchange_123"
    public static let customerBearerDid: BearerDID? = try? DIDJWK.create(keyManager: InMemoryKeyManager())
    public static let BTC_ADDRESS = "bc1q52csjdqa6cq5d2ntkkyz8wk7qh2qevy04dyyfd"

    public static let offeringJson = "{ \"data\": [ {\"metadata\":{\"from\":\"did:dht:t4zqbg8fcsrxzpnn5kbkjte5rbm5q519sc39wxzej99ea9fq5uxy\",\"kind\":\"offering\",\"id\":\"offering_01hsc1j5g7fg7ayew2ys7wmsb7\",\"createdAt\":\"2024-03-19T19:03:42.855Z\",\"protocol\":\"1.0\"},\"data\":{\"description\":\"Selling BTC for USD\",\"payinCurrency\":{\"currencyCode\":\"USD\",\"minAmount\":\"0.0\",\"maxAmount\":\"999999.99\"},\"payoutCurrency\":{\"currencyCode\":\"BTC\",\"maxAmount\":\"999526.11\"},\"payoutUnitsPerPayinUnit\":\"0.00003826\",\"payinMethods\":[{\"kind\":\"DEBIT_CARD\",\"requiredPaymentDetails\":{\"$schema\":\"http://json-schema.org/draft-07/schema\",\"type\":\"object\",\"properties\":{\"cardNumber\":{\"type\":\"string\",\"description\":\"The 16-digit debit card number\",\"minLength\":16,\"maxLength\":16},\"expiryDate\":{\"type\":\"string\",\"description\":\"The expiry date of the card in MM/YY format\",\"pattern\":\"^(0[1-9]|1[0-2])\\\\/([0-9]{2})$\"},\"cardHolderName\":{\"type\":\"string\",\"description\":\"Name of the cardholder as it appears on the card\"},\"cvv\":{\"type\":\"string\",\"description\":\"The 3-digit CVV code\",\"minLength\":3,\"maxLength\":3}},\"required\":[\"cardNumber\",\"expiryDate\",\"cardHolderName\",\"cvv\"],\"additionalProperties\":false}}],\"payoutMethods\":[{\"kind\":\"BTC_ADDRESS\",\"requiredPaymentDetails\":{\"$schema\":\"http://json-schema.org/draft-07/schema\",\"type\":\"object\",\"properties\":{\"btcAddress\":{\"type\":\"string\",\"description\":\"your Bitcoin wallet address\"}},\"required\":[\"btcAddress\"],\"additionalProperties\":false}}],\"requiredClaims\":{\"id\":\"7ce4004c-3c38-4853-968b-e411bafcd945\",\"input_descriptors\":[{\"id\":\"bbdb9b7c-5754-4f46-b63b-590bada959e0\",\"constraints\":{\"fields\":[{\"path\":[\"$.type\"],\"filter\":{\"type\":\"string\",\"const\":\"YoloCredential\"}}]}}]}},\"signature\":\"eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6dDR6cWJnOGZjc3J4enBubjVrYmtqdGU1cmJtNXE1MTlzYzM5d3h6ZWo5OWVhOWZxNXV4eSMwIn0..Lee3NVmx3J44pFTR7HxJILE6Gay7dMElVgO-bOE352lEe0KANUXmxUvjQ7MGlwQ26H-BYKUitb-JIkLwACQ8Bg\"} ]}"
        
    public static let selectedOffering = Offering(
        from: pfiDid,
        data: .init(
            description: "test offering",
            payoutUnitsPerPayinUnit: "1",
            payinCurrency: .init(currencyCode: "AUD"),
            payoutCurrency: .init(currencyCode: "BTC"),
            payinMethods: [],
            payoutMethods: [],
            requiredClaims: [:]
        )
    )
    

    public static var rfq: RFQ? {
        guard let customerBearerDid = customerBearerDid else {
            return nil
        }

        let offeringId: TypeID = TypeID(rawValue: selectedOffering.metadata.id.rawValue) ?? TypeID(rawValue: "default")!

        let mock_rfq = RFQ(
            to: selectedOffering.metadata.from,
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

    public static let mockExchangeJsonString = """
    {
        "data": [
            {
                "metadata": {
                    "exchangeId": "\(exchangeID)",
                    "to": "\(pfiDid)",
                    "kind": "quote",
                    "id": "quote_01hrwc4v55es59t20dhf7dea60",
                    "from": "\(customerBearerDid?.uri ?? "")",
                    "createdAt": "2023-12-19T05:12:16.331Z"
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
                "signature": "..."
            }
        ]
    }
    """

    public static let mockExchangeData = mockExchangeJsonString.data(using: .utf8)!
}
