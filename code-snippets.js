import { Web5 } from "@tbd54566975/web5";

export async function didCreate() {
  return await Web5.connect();
}
// CREATE RECORDS

export async function createRecordWithSchema(web5, { data, message }) {
  return await web5.dwn.records.create({
    data,
    message,
  });
}

// QUERY RECORDS
export async function queryDWNRecords(web5, query) {
  return await web5.dwn.records.query(query);
}

export async function queryRecordsWithFilter(web5) {
  // HEY ANDREW
  const { protocols } = await web5.dwn.records.query({
    message: {
      filter: {
        protocol: "http://social-media.xyz",
      },
      //highlight-start
      dateSort: "createdDescending",
      //highlight-end
    },
  });

  return protocols;
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

export async function readRecordWithRecordId(web5, recordId) {
  const { record } = await web5.dwn.records.read({
    message: {
      recordId: "bafyreiaz5oycqbrnmmpvffxqyoqxvx6bcnqueprmt2qnvzcurpc52r5uyy",
    },
  });

  return record;
}
