export async function createRecordsWithPlaylist(web5, playlistJson) {
  const { record } = await web5.dwn.records.create({
    data: playlistJson,
    message: {
      recipient: 'did:example:alice',
      schema: 'https://schema.org/Playlist',
      dataFormat: 'application/json',
    },
  });

  return record;
}

export async function createRecordWithoutStore(web5) {
  // this creates a record, but does not store it in the user's local DWN
  const { record } = await web5.dwn.records.create({
    //highlight-start
    store: false,
    //highlight-end
    data: 'Hello again, World!',
    message: {
      recipient: 'did:example:alice',
      dataFormat: 'text/plain',
    },
  });

  return record;
}

export async function createRecordAndSend(web5, myDid, bobDid) {
  // this creates a record and stores it in the user's local DWN
  const { record } = await web5.dwn.records.create({
    data: 'Hello World!',
    message: {
      dataFormat: 'text/plain',
    },
  });

  /* 
send the record to the user's remote DWNs. Only needed 
if it's a record that cannot wait for sync to occur.
*/
  const { status: myDidStatus } = await record.send(myDid);

  // send the newly generated record to Bob's DWNs
  const { status: bobStatus } = await record.send(bobDid);

  return { myDidStatus, bobStatus };
}

export async function queryPlaylistFromDid(web5, myDid) {
  const response = await web5.dwn.records.query({
    from: myDid,
    message: {
      filter: {
        schema: 'https://schema.org/Playlist',
        dataFormat: 'application/json',
      },
    },
  });

  response.records.forEach((record) => {
    console.log(record.id);
  });

  return response;
}

export async function readRecordFromRecordId(web5, recordId) {
  // Reads the indicated record from the user's DWNs
  const { record } = await web5.dwn.records.read({
    message: {
      recordId,
    },
  });

  // assuming the record is a text payload, logs the text

  return record;
}

export async function deleteRecordFromDid(web5, record, did) {
  const response = await web5.dwn.records.delete({
    from: did,
    message: {
      recordId: record.id,
    },
  });
}
