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

export async function playlistProtocolDefinition(web5){
  const playlistProtocolDefinition =  {
    protocol: "https://playlist.org/protocol",
    published: true,
    types: {
      playlist: {
        schema: "https://schema.org/MusicPlaylist",
        dataFormats: ["application/json"],
      },
      audio: {
        schema: "https://schema.org/AudioObject",
        dataFormats: ["audio/mp3"],
      },
      video: {
        schema: "https://schema.org/VideoObject",
        dataFormats: ["video/mp4"],
      },
    },
    structure: {
      playlist: {
        $actions: [
          { who: "anyone", can: "write" },
          { who: "author", of: "playlist", can: "read" },
          { who: "recipient", of: "playlist", can: "read" },
        ],
        audio: {
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
          ]
        },
      },
    }
  };

  return playlistProtocolDefinition;
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
