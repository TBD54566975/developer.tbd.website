import { test, beforeAll, expect, describe } from 'vitest';
import { Web5 } from '@web5/api/browser';
import {
  queryMusicProtocol,
  configureProtocolWithDefinition,
  queryProtocolDescending,
} from '../../../../code-snippets/api/web5-js/dwn/protocols';

let web5;
let myDid;

beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
  myDid = result.did;
});

describe('tests for /api/web5-js/dwn/protocols.js', () => {
  test('queryMusicProtocol', async () => {
    const { protocols, status } = await queryMusicProtocol(web5);
    // This will return an empty array, if it fails it will be undefined.
    expect.soft(protocols).toBeDefined();
    expect(status.code).toBe(200);
  });

  test('configureProtocolWithDefinition', async () => {
    const { protocols, status } = await configureProtocolWithDefinition(
      web5,
      myDid,
    );
    // We do 202 for this test because protocols comes back undefined, need to check if this is expected behavior.
    expect(status.code).toBe(202);
  });

  test('queryProtocolDescending', async () => {
    const { protocols, status } = await queryProtocolDescending(web5);
    expect.soft(protocols).toBeDefined();
    expect(status.code).toBe(200);
  });
});
