import { test, beforeAll, expect, describe } from 'vitest';
import { Web5 } from '@web5/api/browser';
import {
  configureProtocol,
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

beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
  myDid = result.did;
});

describe('tests for /api/web5-js/dwn/protocol.js', () => {
  test('configureProtocol successfully configured a protocol.', async () => {
    const definitionResult = await configureProtocol(web5, protocolDefinition);
    expect(definitionResult.protocol).toBe('http://social-media.xyz');
  });

  // The function doesn't return anything, however if this fails it will throw an error.
  test('configureProtocolAndSend can run without any errors', async () => {
    await configureProtocolAndSend(web5, myDid, protocolDefinition);
  });

  test('queryProtocol successfully queries the protocol', async () => {
    const { status } = await queryProtocol(web5);
    expect(status.code).toBe(200);
  });
});
