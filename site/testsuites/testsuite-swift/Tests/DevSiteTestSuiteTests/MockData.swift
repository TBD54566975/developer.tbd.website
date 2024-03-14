import Foundation
import Web5
import TypeID
@testable import tbDEX

public struct MockData {
    public static let pfiDid: String = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
    public static let exchangeID = "exchange_123"
    public static let customerBearerDid: BearerDID? = try? DIDJWK.create(keyManager: InMemoryKeyManager())
    public static let BTC_ADDRESS = "bc1q52csjdqa6cq5d2ntkkyz8wk7qh2qevy04dyyfd"

    public static let selectedOffering = Offering(
        from: MockData.pfiDid,
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

        return RFQ(
            to: selectedOffering.metadata.from,
            from: customerBearerDid.uri,
            data: .init(
                offeringId: offeringId,
                payinAmount: "0.012",
                payinMethod: SelectedPaymentMethod(
                    kind: "BTC_WALLET_ADDRESS",
                    paymentDetails: [
                        "btc_address": MockData.BTC_ADDRESS
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
    }

    public static let mockQuote = Quote(
        from: MockData.pfiDid,
        to: MockData.customerBearerDid?.uri ?? "",
        exchangeID: MockData.exchangeID,
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

    public static let mockExchangeJsonString = """
        {
    "data": [
        {
            "metadata": {
            "exchangeId": "exchange_123",
            "to": "\(pfiDid)",
            "kind": "quote",
            "id": "quote_01hrwc4v55es59t20dhf7dea60",
            "from": "\(customerBearerDid!.uri)",
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

    public static let mockExchangeData = MockData.mockExchangeJsonString.data(using: .utf8)!
}
