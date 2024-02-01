:snippet-start: importDidsKt
//did:dht
import web5.sdk.dids.methods.dht.DidDht

//did:key
import web5.sdk.dids.methods.key.DidKey
:snippet-end:

:snippet-start: createDidDhtKt
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
:snippet-end:

:snippet-start: createDidKeyKt
// Creates a DID using the did:key method
val keyManager = InMemoryKeyManager()
val didKey = DidKey.create(keyManager);

//DID and its associated data which can be exported and used in different contexts/apps
val portableDID = didKey.resolve()

//DID string
val did = didKey.uri

//DID Document
val didDocument = portableDID.didDocument

:snippet-end: