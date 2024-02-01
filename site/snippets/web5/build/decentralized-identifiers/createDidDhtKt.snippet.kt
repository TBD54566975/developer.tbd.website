import web5.sdk.dids.methods.dht.CreateDidDhtOptions

//Creates a DID using the DHT method and publishes the DID Document to the DHT
val keyManager = InMemoryKeyManager()
val options = CreateDidDhtOptions(
    publish = true
)
val didDht = DidDht.create(keyManager, options)

//DID and its associated data which can be exported and used in different contexts/apps
val portableDID = DidDht.resolve(didDht.uri)

//DID string
val did = didDht.uri

//DID Document
val didDocument = portableDID.didDocument