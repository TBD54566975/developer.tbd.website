import Web5
@testable import tbDEX
import Foundation
import XCTest
import Mocker
import TypeID

public struct MockData {
    public static let pfiDid: String = "did:dht:ac7uj566xgmhypniw1cb96dyhod51inwp98o8ugyb9ygikig6coy"
    public static var exchangeID: String = "exchange_123"
    public static let customerBearerDid: BearerDID? = try? DIDJWK.create(keyManager: InMemoryKeyManager())
    public static let BTC_ADDRESS = "bc1q52csjdqa6cq5d2ntkkyz8wk7qh2qevy04dyyfd"

    public static let selectedOfferingJson = "{\"metadata\":{\"from\":\"\(pfiDid)\",\"kind\":\"offering\",\"id\":\"offering_01hsc1j5g7fg7ayew2ys7wmsb7\",\"createdAt\":\"2024-03-19T19:03:42.855Z\",\"protocol\":\"1.0\"},\"data\":{\"description\":\"test offering\",\"payoutUnitsPerPayinUnit\":\"1\",\"payinCurrency\":{\"currencyCode\":\"AUD\"},\"payoutCurrency\":{\"currencyCode\":\"BTC\"},\"payinMethods\":[],\"payoutMethods\":[],\"requiredClaims\":{\"id\":\"7ce4004c-3c38-4853-968b-e411bafcd945\",\"input_descriptors\":[{\"id\":\"bbdb9b7c-5754-4f46-b63b-590bada959e0\",\"constraints\":{\"fields\":[{\"path\":[\"$.type\"],\"filter\":{\"type\":\"string\",\"const\":\"YoloCredential\"}}]}}]}}}"

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
            ),
            protocol: "1.0"
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
            ),
            protocol: "1.0"
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
                data: .init(),
                protocol: "1.0"
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
            ),
            protocol: "1.0"
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
            ),
            protocol: "1.0"
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
            ),
            protocol: "1.0"
        )
    }

    public static func mockGetExchangeWithClose(
        from: String = customerBearerDid!.uri,
        to: String = pfiDid,
        exchangeId: String = exchangeID,
        closeReason: String = "") {
        let url = URL(string: "https://localhost:9000/exchanges/\(exchangeId)")!
        let close = MockData.createClose(from: from, to: to, exchangeId: exchangeId, reason: closeReason)
        var exchange: [Close] = [Close]()
        exchange.append(close)
        let exchangeJson: [String: [Close]] = ["data": exchange]

        MockData.setupMockGetCall(url: url, data: exchangeJson)
    }

    public static func mockSendOrderMessage(exchangeId: String) {
        let url = URL(string: "https://localhost:9000/exchanges/\(exchangeId)")!
        Mocker.register(Mock(url: url, contentType: .json, statusCode: 200, data: [.put: Data()]))
    }

    public static func mockExchangeWithQuote(
        to: String = pfiDid,
        from: String = customerBearerDid!.uri,
        exchangeId: String = exchangeID) {
        let url = URL(string: "https://localhost:9000/exchanges/\(exchangeId)")!
        let quote = MockData.createQuote(from: from, to: to, exchangeId: exchangeId)
        var exchange: [Quote] = [Quote]()
        exchange.append(quote)
        let exchangeJson: [String: [Quote]] = ["data": exchange]

        MockData.setupMockGetCall(url: url, data: exchangeJson)
    }

    //Force Mock to ignore the request so that resolve endpoint is called for real
    public static func allowDidResolution(didUri: String) {
        let id = didUri.components(separatedBy: ":").last
        let ignoredURL = URL(string: "https://diddht.tbddev.org/" + id!)!
        Mocker.ignore(ignoredURL)
    }

    private static func setupMockGetCall(url: URL, data: Encodable) {
        let encoder = tbDEXJSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        let jsonData = try! encoder.encode(data)

        Mocker.register(Mock(url: url, contentType: .json, statusCode: 200, data: [.get: jsonData]))
    }
}
