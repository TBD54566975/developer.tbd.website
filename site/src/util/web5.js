import { Web5 } from '@tbd54566975/web5/browser';

export async function didCreate() {
  const { did: aliceDid, web5 } = await Web5.connect();
  return { web5, aliceDid };
}

export async function dwnWriteTextRecord(web5, textData) {
  const { record } = await web5.dwn.records.create({
    data: textData,
    message: {
      dataFormat: 'text/plain',
    },
  });

  return record;
}
