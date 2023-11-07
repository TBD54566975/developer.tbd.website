import { test, beforeAll, expect, describe } from 'vitest';

import {
  queryProtocolsWithFilterDescending,
  queryRecordsWithFilterAscending,
  queryProtocolsForMusic,
  queryRecordsFromDid,
  queryRecordWithParentId,
  playlistProtocolDefinition,
  queryFromDwnByProtocolPath,
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/query-from-dwn';

let web5;
let did;

describe('query-from-dwn', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
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
    const protocolDefinition = await playlistProtocolDefinition(web5);
    const response = await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });

    expect(response.status.code).toBe(202);
  });

  test('queryFromDwnByProtocolPath returns an array of records', async () => {
    const response = await queryFromDwnByProtocolPath(web5);

    expect(Array.isArray(response)).toBe(true);
  });
});
