import { Web5 } from '@tbd54566975/web5';

export const didCreate = async () => {
  const { did: aliceDid, web5 } = await Web5.connect();
  return { web5, aliceDid };
};
