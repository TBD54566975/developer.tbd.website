export async function createRecord(web5, myDid) {
  const { record } = await web5.dwn.records.create({
    data: 'Hello World!',
    message: {
      dataFormat: 'text/plain',
    },
  });

  const { status } = await record.send(myDid);

  return record;
}

export async function readRecord(myRecord) {
  const recordText = await myRecord.data.text();
  return recordText;
}

export async function deleteRecord(record) {
  const response = await record.delete();
  return response;
}

export async function updateRecord(record) {
  const response = await record.update({ data: "Hello', I'm updated" });
  return response;
}

