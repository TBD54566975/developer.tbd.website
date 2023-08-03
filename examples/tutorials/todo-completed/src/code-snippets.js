import { Web5 } from "@tbd54566975/web5";

export async function didCreate() {
  return await Web5.connect();
}

export async function createRecordWithSchema(web5, { data, message }) {
  return await web5.dwn.records.create({
    data,
    message,
  });
}

export async function queryDWNRecords(web5, query) {
  return await web5.dwn.records.query(query);
}

export async function deleteRecord(record) {
  return await record.delete();
}

export async function updateRecord(record, data) {
  return await record.update(data);
}

export async function readRecord(web5, record) {
  return await web5.dwn.records.read(record);
}
