import { Web5 } from '@tbd54566975/web5/browser';

export async function createDidManually() {
  const myDid = await Web5.did.create('ion');

  return myDid;
}

export async function createDidAutomatically() {
  const { web5, did: myDid } = await Web5.connect();

  return myDid;
}
