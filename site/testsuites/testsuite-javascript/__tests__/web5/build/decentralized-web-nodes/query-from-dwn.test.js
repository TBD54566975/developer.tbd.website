import { test, beforeAll, expect, describe } from 'vitest';
import { setUpWeb5 } from '../../../setup-web5';

let web5;
let did;

describe('query-from-dwn', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;
  });

  test('queryProtocolsForMusic returns an array of protocols', async () => {
    // :snippet-start: queryProtocolsForMusic
    const { protocols } = await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: 'https://music.org/protocol',
        },
      },
    });
    // :snippet-end:
    expect(Array.isArray(protocols)).toBe(true);
  });

  test('queryProtocolsWithFilterDescending returns an array of protocols', async () => {
    // :snippet-start: queryProtocolsWithFilterDescending
    const { protocols } = await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: 'http://social-media.xyz',
        },
        //highlight-next-line
        dateSort: 'createdDescending'
      },
    });
    // :snippet-end:
    expect(Array.isArray(protocols)).toBe(true);
  });

  test('queryRecordsWithFilterAscending returns an array of protocols', async () => {
    // :snippet-start: queryRecordsWithFilterAscending
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          dataFormat: 'text/plain',
        },
        //highlight-next-line
        dateSort: 'publishedAscending',
      },
    });
    // :snippet-end:
    expect.soft(response.status.code).toBe(200);
    expect(Array.isArray(response.records)).toBe(true);
  });

  test('queryRecordsFromDid returns an array of records', async () => {
   // :snippet-start: queryRecordsFromDid
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
  // :snippet-end:
    expect(Array.isArray(records)).toBe(true);
  });

  test('queryRecordWithParentId returns a record', async () => {
    // :snippet-start: queryRecordWithParentId
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          parentId: 'bafyreianzpmhbgcgam5mys722vnsiuwn7y4ek6kjeyjptttquasw4hge2m',
        },
      },
    });
    // :snippet-end:
    expect.soft(response.status.code).toBe(200);
    expect(Array.isArray(response.records)).toBe(true);
  });

  test('playlistProtocolDefinition can be configured', async () => {
    // :snippet-start: playlistProtocolDefinition
    const playlistProtocolDefinition = {
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
            { who: "anyone", can: ["create"] },
            { who: "author", of: "playlist", can: ["read"] },
            { who: "recipient", of: "playlist", can: ["read"] },
          ],
          audio: {
            $actions: [
              { who: "anyone", can: ["create"] },
              { who: "author", of: "audio", can: ["read"] },
              { who: "recipient", of: "audio", can: ["read"] },
            ],
          },
          video: {
            $actions: [
              { who: "anyone", can: ["create"] },
              { who: "author", of: "video", can: ["read"] },
              { who: "recipient", of: "video", can: ["read"] },
            ]
          },
        },
      }
    };
  // :snippet-end:
    const response = await web5.dwn.protocols.configure({
      message: {
        definition: playlistProtocolDefinition,
      },
    });

    expect(response.status.code).toBe(202);
  });

  test('queryFromDwnByProtocolPath returns an array of records', async () => {
    // :snippet-start: queryFromDwnByProtocolPath
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
    // :snippet-end:
    expect(Array.isArray(records)).toBe(true);
  });
});
