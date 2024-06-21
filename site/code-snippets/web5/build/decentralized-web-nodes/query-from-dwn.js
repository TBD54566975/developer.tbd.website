export async function queryProtocolsForMusic(web5) {
  const { protocols } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: 'https://music.org/protocol',
      },
    },
  });

  return protocols;
}

export async function queryProtocolsWithFilterDescending(web5) {
  const { protocols } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: 'http://social-media.xyz',
      },
      //highlight-next-line
      dateSort: 'createdDescending'
    },
  });

  return protocols;
}

export async function queryRecordsWithFilterAscending(web5) {
  const response = await web5.dwn.records.query({
    message: {
      filter: {
        dataFormat: 'text/plain',
      },
      //highlight-next-line
      dateSort: 'publishedAscending',
    },
  });

  return response;
}

export async function queryRecordsFromDid(web5, did) {
  const { records } = await web5.dwn.records.query({
    //highlight-next-line
    from: did,
    message: {
      filter: {
        schema: 'https://schema.org/Playlist',
        dataFormat: 'application/json',
      },
    },
  });

  return records;
}

export async function queryRecordWithParentId(web5) {
  const response = await web5.dwn.records.query({
    message: {
      filter: {
        parentId: 'bafyreianzpmhbgcgam5mys722vnsiuwn7y4ek6kjeyjptttquasw4hge2m',
      },
    },
  });

  return response;
}

export async function queryFromDwnByProtocolPath(web5) {
  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        //highlight-start
        protocol: 'https://playlist.org/protocol',
        protocolPath: 'playlist/video'
        //highlight-end
      },
    },
  });

  return records;
}
