
//Creates a DID using the did:ion method
const didIon = await DidIonMethod.create();

//DID and its associated data which can be exported and used in different contexts/apps
const portableDID = JSON.stringify(didIon);

//DID string
const did = didIon.did;

//DID Document
const didDocument = JSON.stringify(didIon.document);

//Cryptographic keys associated with DID
const keys = JSON.stringify(didIon.keySet);

//Primary form of a DID. more info: https://www.w3.org/TR/did-core/#dfn-canonicalid
const canonicalId = didIon.canonicalId;
