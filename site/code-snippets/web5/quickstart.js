import { Web5 } from '@web5/api';
import { VerifiableCredential } from '@web5/credentials'

let context = {};

export async function didCreate() {
  const { web5, did: aliceDid } = await Web5.connect();
  context.web5 = web5;
  return { web5, did: aliceDid };
}

export const executeDidCreate = async () => {
  const result = await didCreate();
  context.did = result.did;
  return result.did;
};

export async function executeGetBearerDid() {
  const { did: bearerDid } = await context.web5.agent.identity.get({ didUri: context.did });
  context.bearerDid = bearerDid;
  return bearerDid;
}

export async function executeCreateVc(name) {
  const vc = await VerifiableCredential.create({
    type: 'Web5QuickstartCompletionCredential',
    issuer: context.did,
    subject: context.did,
    data: {
      name: name,
      completionDate: new Date().toISOString(),
      expertiseLevel: 'Beginner',
    },
  });
  context.vc = vc;
  return vc;
}

export async function executeSignVc() {
  const signedVc = await context.vc.sign({ did: context.bearerDid })
  context.signedJwt = signedVc;
  return signedVc
}

export async function executeWriteVcToDwn() {
  const { record } = await context.web5.dwn.records.create({
    data: context.signedJwt,
    message: {
      schema: 'Web5QuickstartCompletionCredential',
      dataFormat: 'application/json',
      published: true
    },
  });
  context.record = record
  return record
}

export async function executeReadVcFromDwn() {
  return await context.record.data.text()
}

export async function executeParseVc() {
  return await VerifiableCredential.parseJwt({ vcJwt: context.signedJwt })
}


export async function createTextRecord(web5) {
  const { record } = await web5.dwn.records.create({
    data: 'Hello, Web5!',
    message: {
      dataFormat: 'text/plain',
    },
  });

  return { record };
}

export async function readTextRecord(record) {
  const readResult = await record.data.text();

  return readResult;
}

export async function updateTextRecord(record) {
  const updateResult = await record.update({
    data: 'Hello, Web5! I am updated.',
  });

  return updateResult;
}

export async function deleteTextRecord(web5, did, record) {
  const deleteResult = await web5.dwn.records.delete({
    message: {
      recordId: record.id,
    },
  });

  return deleteResult;
}
