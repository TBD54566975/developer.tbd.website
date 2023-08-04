import { Web5 } from '../../../../../../../node_modules/@tbd54566975/web5/dist/browser.mjs';

async function didCreate() {
  return await Web5.connect();
}

async function createTextRecord(web5, textData) {
  const result = await web5.dwn.records.create({
    data: textData,
    message: {
      dataFormat: "text/plain",
    },
  });
  return result;
}

async function dwnUpdateDataFromRecord(record, data) {
  await record.update({ data });
  return await record.data.text();
}

async function dwnReadDataFromRecord(record) {
  return await record.data.text();
}

async function dwnDeleteRecord(record) {
  await record.delete();
  record = null;
}

export { createTextRecord, didCreate, dwnDeleteRecord, dwnReadDataFromRecord, dwnUpdateDataFromRecord };
//# sourceMappingURL=index.js.map
