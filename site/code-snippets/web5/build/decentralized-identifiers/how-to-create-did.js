import { Web5 } from '@web5/api';
import { DidDhtMethod } from '@web5/dids';

export async function createDidAutomatically() {
  const { did: userDid } = await Web5.connect();
  return userDid;
}

export async function createDidDht() {
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

  //Primary form of a DID. more info: https://www.w3.org/TR/did-core/#dfn-canonicalid
  const canonicalId = didDht.canonicalId;

  return didDht.did;
}

