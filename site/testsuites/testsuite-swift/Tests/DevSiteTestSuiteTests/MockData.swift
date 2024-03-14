import Web5
@testable import tbDEX


public struct MockData {
    public static let pfiDid: String = "did:dht:4ykjcjdq7udyjq5iy1qbcy98xnd4dkzuizm14ih4rn6953b8ohoo"
    public static let exchangeID = "exchange_123"
    public static let customerBearerDid: BearerDID? = try? DIDJWK.create(keyManager: InMemoryKeyManager())

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
}