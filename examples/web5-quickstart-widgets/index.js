import { Web5 } from '../../node_modules/@web5/api/dist/browser.mjs';

let web5;

export async function didCreate() {
  let result = await Web5.connect();
  web5 = result.web5;
  return result;
}

export async function createTextRecord(web5, textData) {
  const result = await web5.dwn.records.create({
    data: textData,
    message: {
      dataFormat: 'text/plain',
    },
  });
  return result;
}

export async function dwnUpdateDataFromRecord(record, data) {
  await record.update({ data });
  return await record.data.text();
}

export async function dwnReadDataFromRecord(record) {
  return await record.data.text();
}

export async function dwnDeleteRecord(record) {
  await web5.dwn.records.delete({
    from: web5.did,
    message: {
      recordId: record.id,
    },
  });
}
