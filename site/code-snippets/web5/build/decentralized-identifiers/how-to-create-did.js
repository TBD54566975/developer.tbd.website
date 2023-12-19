import { Web5 } from '@web5/api';

export async function createDidAutomatically() {
  const { web5, did: myDid } = await Web5.connect();

  return myDid;
}
