import { test, beforeAll, expect } from 'vitest';
import {
  createLocalRecord,
  createLocalProtocol,
  sendLocalRecordToRecipient,
  sendRecordToRemoteDWNs,
  sendProtocolToRemoteDWNs,
  sendRecordToRemoteDWNsOfRecipient
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/send';
import { Web5 } from '@web5/api/browser';

let web5;
let did;

// connect to web5 beforeAll tests and assign it to web5 variable
beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
  did = result.did;
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
      }
    },
    structure: {
      myobject: {
        $actions: [
          { who: 'anyone',can: 'write'},
          { who: 'anyone',can: 'read'}
        ],
      }
    }
  };
  const response = await createLocalProtocol(web5, protocolDefinition);
  expect(response.status.code).toBe(202);
});

test('sendLocalRecordToRecipient creates record', async () => {
  const record = await sendLocalRecordToRecipient(web5, did);
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
      }
    },
    structure: {
      myobject: {
        $actions: [
          { who: 'anyone',can: 'write'},
          { who: 'anyone',can: 'read'}
        ],
      }
    }
  };
  const status = await sendProtocolToRemoteDWNs(web5, protocolDefinition, did);
  expect(status.code).toBe(202);
});

test('sendRecordToRemoteDWNsOfRecipient can be configured', async () => {
  const status = await sendRecordToRemoteDWNsOfRecipient(web5, did);
  expect(status.code).toBe(202);
});