//Creates a DID using the DHT method and publishes the DID Document to the DHT
const didDht = await DidDhtMethod.create({ publish: true });

//DID and its associated data which can be exported and used in different contexts/apps
const portableDID = JSON.stringify(didDht);

//DID string
const did = didDht.did;

//DID Document
const didDocument = JSON.stringify(didDht.document);

//Cryptographic keys associated with DID
const keys = JSON.stringify(didDht.keySet);
