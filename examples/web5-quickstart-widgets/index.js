import { Web5 } from "@tbd54566975/web5/browser";

let web5;
let myDid;
let record;

 export async function didCreate() {
  return await Web5.connect();
}

export async function createTextRecord(textData) {
  const result = await web5.dwn.records.create({
    data: textData,
    message: {
      dataFormat: "text/plain",
    },
  });

  record = result.record;
  return result;
} 

export async function dwnUpdateDataFromRecordWithId(data) {
  await record.update({ data });
  return await record.data.text();
}

export async function dwnReadDataFromRecordWithId() {
  return await record.data.text();
}

export async function dwnDeleteRecordWithId() {
  await record.delete();
  record = null;
}
