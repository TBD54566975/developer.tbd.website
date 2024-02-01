// Creates a DID using the did:key method
val keyManager = InMemoryKeyManager()
val didKey = DidKey.create(keyManager);

//DID and its associated data which can be exported and used in different contexts/apps
val portableDID = didKey.resolve()

//DID string
val did = didKey.uri

//DID Document
val didDocument = portableDID.didDocument
