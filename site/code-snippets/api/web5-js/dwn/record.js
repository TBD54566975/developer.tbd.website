export async function createRecordWithHighlight(web5, myDid) {
  const { record } = await web5.dwn.records.create({
    data: 'Hello World!',
    message: {
      dataFormat: 'text/plain',
    },
  });

  //highlight-start
  const { status } = await record.send(myDid);
  //highlight-end

  return record;
}

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

export async function readRecord(textRecord) {
  const recordText = await textRecord.data.text();
  return recordText;
}

export async function deleteRecord(web5, did, recordId) {
  const response = await web5.dwn.records.delete({
    from: did,
    message: { 
      recordId: recordId
    },
  });

  return response;
}

export async function updateRecord(record) {
  const response = await record.update({ data: "Hello', I'm updated" });
  return response;
}
