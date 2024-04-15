import { test, beforeAll, expect, describe } from 'vitest';

import {
  queryProtocolsWithFilterDescending,
  queryRecordsWithFilterAscending,
  queryProtocolsForMusic,
  queryRecordsFromDid,
  queryRecordWithParentId,
  queryFromDwnByProtocolPath,
} from '../../../../../../code-snippets/web5/build/decentralized-web-nodes/query-from-dwn';
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
    const protocols = await queryProtocolsForMusic(web5);
    expect(Array.isArray(protocols)).toBe(true);
  });

  test('queryProtocolsWithFilterDescending returns an array of protocols', async () => {
    const protocols = await queryProtocolsWithFilterDescending(web5);
    expect(Array.isArray(protocols)).toBe(true);
  });

  test('queryRecordsWithFilterAscending returns an array of protocols', async () => {
    const response = await queryRecordsWithFilterAscending(web5);

    expect.soft(response.status.code).toBe(200);
    expect(Array.isArray(response.records)).toBe(true);
  });

  test('queryRecordsFromDid returns an array of records', async () => {
    const response = await queryRecordsFromDid(web5, did);
    expect(Array.isArray(response)).toBe(true);
  });

  test('queryRecordWithParentId returns a record', async () => {
    const response = await queryRecordWithParentId(web5);
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
    const response = await queryFromDwnByProtocolPath(web5);

    expect(Array.isArray(response)).toBe(true);
  });
});
