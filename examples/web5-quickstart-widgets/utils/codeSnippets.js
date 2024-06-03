export const didCreateSnippet = `
const { web5, did: aliceDid } = await Web5.connect();
`;

export const getBearerDidSnippet = `
const { did: aliceBearerDid } = await web5.agent.identity.get({ didUri: aliceDid });
`;


export const createVcSnippet = `
const vc = await VerifiableCredential.create({
  type: 'Web5QuickstartCompletionCredential',
  issuer: aliceDid,
  subject: aliceDid,
  data: {
    username: '@alicesmith123',
    completionDate: '2024-05-22',
    level: 'Beginner'
  }
});
`;

export const signVcSnippet = `
const signedVc = await vc.sign({ did: aliceBearerDid });
`;

export const writeVcSnippet = `
const { record } = await web5.dwn.records.create({
  data: signedVc,
  message: {
    schema: 'Web5QuickstartCompletionCredential',
    dataFormat: 'application/vc+jwt',
  }
});
`;

export const readSignedVcSnippet = `
const readSignedVc = await record.data.text();
`;

export const parseSignedVcSnippet = `
const parsedVc = VerifiableCredential.parseJwt({ vcJwt: readSignedVc });
`;



