import { Web5 } from '@web5/api';

export async function createAliceDid() {
  const { web5, did: aliceDid } = await Web5.connect();

  // Create the record
  const { record } = await web5.dwn.records.create({
    data: 'Hello Web5',
    message: {
      dataFormat: 'text/plain',
    },
  });

  // Read the record
  const readResult = await record.data.text();

  return readResult;
}
