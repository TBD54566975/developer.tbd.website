import { test, beforeAll, expect, describe } from 'vitest';

import {
  createLocalRecord,
  createLocalProtocol,
  sendLocalRecordToTarget,
  sendRecordToRemoteDWNs,
  sendProtocolToRemoteDWNs,
  sendRecordToDWNOfRecipient,
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/send';

let web5;
let did;

describe('send', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
    web5 = globalThis.web5;
    did = globalThis.did;
  });

  test('createLocalRecord creates a record', async () => {
    const record = await createLocalRecord(web5);
    expect(record).toBeDefined();
  });

  test('createLocalProtocol installs a protocol', async () => {
    const protocolDefinition = {
      protocol: 'example:protocol',
      published: true,
      types: {
        myobject: {
          schema: 'example:protocol/myobject',
          dataFormats: ['application/json'],
        },
      },
      structure: {
        myobject: {
          $actions: [
            { who: 'anyone', can: 'write' },
            { who: 'anyone', can: 'read' },
          ],
        },
      },
    };
    const response = await createLocalProtocol(web5, protocolDefinition);
    expect(response.status.code).toBe(202);
  });

  //blocked by https://github.com/TBD54566975/dwn-sdk-js/issues/550
  test.todo('sendLocalRecordToTarget creates record', async () => {
    const record = await sendLocalRecordToTarget(web5, did);
    expect(record).toBeDefined();
  });

  test('sendRecordToRemoteDWNs sends record', async () => {
    const status = await sendRecordToRemoteDWNs(web5, did);
    expect(status.code).toBe(202);
  });

  test('sendProtocolToRemoteDWNs sends a protocol', async () => {
    const protocolDefinition = {
      protocol: 'example:remoteprotocol',
      published: true,
      types: {
        myobject: {
          schema: 'example:protocol/myobject',
          dataFormats: ['application/json'],
        },
      },
      structure: {
        myobject: {
          $actions: [
            { who: 'anyone', can: 'write' },
            { who: 'anyone', can: 'read' },
          ],
        },
      },
    };
    const status = await sendProtocolToRemoteDWNs(
      web5,
      protocolDefinition,
      did,
    );
    expect(status.code).toBe(202);
  });

  test('sendRecordToDWNOfRecipient can be configured', async () => {
    const status = await sendRecordToDWNOfRecipient(web5, did);
    expect(status.code).toBe(202);
  });
});
