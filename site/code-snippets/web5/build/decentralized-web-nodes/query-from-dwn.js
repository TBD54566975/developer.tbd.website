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
      //highlight-start
      dateSort: 'createdDescending',
      //highlight-end
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
      dateSort: 'publishedAscending',
    },
  });

  return response;
}

export async function queryRecordsFromDID(web5, did) {
  const { records } = await web5.dwn.records.query({
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

export async function queryFromDwnByPathAndStructure(web5) {

  const musicProtocolDefinition = {
    protocol: "https://music.org/protocol",
    types: {
      audio: {
        schema: "https://schema.org/Playlist",
        dataFormats: ["audio/mp3"],
      },
      video: {
        schema: "https://schema.org/Playlist",
        dataFormats: ["video/mp4"],
      },
    },
    structure: {
      // highlight-start
      audio: {
        // highlight-end
        $actions: [
          { who: "anyone", can: "write" },
          { who: "author", of: "audio", can: "read" },
          { who: "recipient", of: "audio", can: "read" },
        ],
      },
      video: {
        $actions: [
          { who: "anyone", can: "write" },
          { who: "author", of: "video", can: "read" },
          { who: "recipient", of: "video", can: "read" },
        ],
      }
    }
  };

  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        protocol: "https://example.com/musicProtocol",
        // highlight-start
        protocolPath: 'audio',
        // highlight-end
      },
    },
  });

  return records;
}