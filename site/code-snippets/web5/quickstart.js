import { Web5 } from '@web5/api/browser';

export async function didCreate() {
  const { web5, did: aliceDid } = await Web5.connect();

  return { web5, did: aliceDid };
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

export async function deleteTextRecord(web5, did, recordId) {
  const deleteResult = await web5.dwn.records.delete({
    message: {
      recordId,
    },
  });

  return deleteResult;
}
