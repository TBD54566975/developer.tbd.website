import { Web5 } from '@web5/api';

export async function didCreate() {
  return await Web5.connect();
}

export async function createTextRecord(web5, textData) {
  return await web5.dwn.records.create({
    data: textData,
    message: {
      dataFormat: 'text/plain',
    },
  });
}
