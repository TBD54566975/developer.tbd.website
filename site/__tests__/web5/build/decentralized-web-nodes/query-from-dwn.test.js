import { test, beforeAll, expect } from 'vitest';
import {
  queryProtocolsWithFilterDescending,
  queryRecordsWithFilterAscending,
  queryProtocolsForMusic,
  queryRecordsFromDID,
  queryRecordWithParentId,
  testingWithAngie,
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/query-from-dwn';
import { Web5 } from '@tbd54566975/web5/browser';

let web5;
let did;

// connect to web5 beforeAll tests and assign it to web5 variable
beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
  did = result.did;
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

test('queryRecordsFromDID returns an array of records', async () => {
  const response = await queryRecordsFromDID(web5, did);

  expect(Array.isArray(response)).toBe(true);
});

test.todo('queryRecordWithParentId returns a record', async () => {
  const response = await queryRecordWithParentId(web5);

  expect.soft(response.status.code).toBe(200);
  expect(response.record).toBeDefined();
});
