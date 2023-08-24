import { Web5 } from '@tbd54566975/web5/browser';

export async function createDidWithDWNEndpoint() {
  const { web5, did: myDid } = await Web5.connect({
    techPreview: {
      dwnEndpoints: ['https://dwn.your-domain.org/'],
    },
  });

  return { web5, myDid };
}
