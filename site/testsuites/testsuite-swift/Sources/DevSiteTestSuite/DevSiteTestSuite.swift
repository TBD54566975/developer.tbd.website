// The Swift Programming Language
// https://docs.swift.org/swift-book

// :snippet-start: web5ImportSwift
import Web5
// :snippet-end:
// :snippet-start: tbDEXImportSwift
import tbDEX
// :snippet-end:

func main() throws {
    let didJWK = try DIDJWK.create(keyManager: InMemoryKeyManager())
    print(didJWK.uri)
}