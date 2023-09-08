import { test, beforeAll, expect, describe, vi } from 'vitest';
import { Web5 } from '@web5/api/browser';
import {
  getProtocolDefinition,
  sendDefinition,
} from '../../../../code-snippets/api/web5-js/records';

let web5;
let did;

const protocolDefinition = {
  protocol: 'http://minimal.xyz',
  published: false,
  types: {
    foo: {},
  },
  structure: {
    foo: {},
  },
};

describe('tests for api/web5-js/dwn/protocol', () => {
  beforeAll(async () => {
    const result = await Web5.connect();
    web5 = result.web5;
    did = result.did;
  });

  test('getProtocolDefinition returns a protocol', async () => {
    const returnedDefinition = await getProtocolDefinition(
      web5,
      protocolDefinition,
    );
    expect(returnedDefinition).toEqual(protocolDefinition);
  });

  test('sendDefinition runs protocol.send()', async () => {
    const mockProtocol = {
      send: vi.fn(),
    };

    web5.dwn.protocols.configure = vi.fn().mockResolvedValue({
      protocol: mockProtocol,
    });

    await sendDefinition(web5, protocolDefinition, did);

    console.log('Checking if send was called...');

    expect(mockProtocol.send).toHaveBeenCalled();

    if (web5.dwn.protocols.configure.mockReset) {
      web5.dwn.protocols.configure.mockReset();
    }
  });
});
