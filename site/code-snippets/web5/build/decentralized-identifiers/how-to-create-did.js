import { Web5 } from '@web5/api/browser';

export async function createDidManually() {
  const myDid = await Web5.did.create('ion');

  return myDid;
}

export async function createDidAutomatically() {
  const { web5, did: myDid } = await Web5.connect();

  return myDid;
}
