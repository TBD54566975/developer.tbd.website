import { Web5 } from "/node_modules/@web5/dist/browser.mjs";

export async function didCreate() {
  return await Web5.connect();
}

export async function createTextRecord(web5, textData) {
  const result = await web5.dwn.records.create({
    data: textData,
    message: {
      dataFormat: "text/plain",
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
  await record.delete();
  record = null;
}