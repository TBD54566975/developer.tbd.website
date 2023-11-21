import { test, beforeAll, expect, describe } from 'vitest';
import {
  getProtocolDefinition,
  configureProtocolAndSend,
  queryProtocol,
} from '../../../../code-snippets/api/web5-js/dwn/protocol';

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

describe('protocol', () => {
  beforeAll(async () => {
    web5 = globalThis.web5;
    myDid = globalThis.did;
  });

  describe('tests for /api/web5-js/dwn/protocol.js', () => {
    test('configureProtocol configures a protocol', async () => {
      const definitionResult = await getProtocolDefinition(web5, protocolDefinition);
      expect(definitionResult.protocol).toBe('http://social-media.xyz');
    });

    test('configureProtocolAndSend sends a protocol to remote DWNs', async () => {
      const status = await configureProtocolAndSend(web5, myDid, protocolDefinition);
      expect(status.code).toBe(202);
    });

    test('queryProtocol queries an installed protocol', async () => {
      const protocolJson = await queryProtocol(web5);
      expect(protocolJson).toBeDefined();
      expect(protocolJson.status.code).toBe(200);
    });
  });
});
