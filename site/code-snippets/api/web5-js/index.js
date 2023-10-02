import { Web5 } from '@web5/api/browser';

export async function createDidWithDWNEndpoint() {
  const {
    web5,
    did: myDid,
    status,
  } = await Web5.connect({
    techPreview: {
      dwnEndpoints: ['https://dwn.your-domain.org/'],
    },
  });

  return { web5, myDid, status };
}
