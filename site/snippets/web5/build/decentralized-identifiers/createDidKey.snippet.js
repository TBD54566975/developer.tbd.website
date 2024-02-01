//Creates a DID using the did:key method
const didKey = await DidKeyMethod.create();

//DID and its associated data which can be exported and used in different contexts/apps
const portableDID = JSON.stringify(didKey);

//DID string
const did = didKey.did;

//DID Document
const didDocument = JSON.stringify(didKey.document);

//Cryptographic keys associated with DID
const keys = JSON.stringify(didKey.keySet);
