import { test, beforeAll, expect, describe } from 'vitest';

import {
  queryMusicProtocol,
  configureProtocolWithDefinition,
  queryProtocolDescending,
  queryProtocolsFromDid,
} from '../../../../code-snippets/api/web5-js/dwn/protocols';

let web5;
let myDid;

const protocolDefinition = {
  protocol: 'http://social-media.xyz',
  published: false,
  types: {
    foo: {},
  },
  structure: {
    foo: {},
  },
};

describe('protocols', () => {
  beforeAll(async () => {
    web5 = globalThis.web5;
    myDid = globalThis.did;
  });

  describe('tests for /api/web5-js/dwn/protocols.js', () => {
    test('queryMusicProtocol', async () => {
      const { protocols, status } = await queryMusicProtocol(web5);
      // This will return an empty array, if it fails it will be undefined.
      expect.soft(protocols).toBeDefined();
      expect(status.code).toBe(200);
    });

    test('configureProtocolWithDefinition', async () => {
      const { protocol, status } = await configureProtocolWithDefinition(
        web5,
        myDid,
        protocolDefinition,
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

  test('queryProtocolsFromDid', async () => {
    const { protocols } = await queryProtocolsFromDid(web5, myDid);
    expect.soft(protocols).toBeDefined();
  });
});
