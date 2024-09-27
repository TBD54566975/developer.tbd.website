import { test, beforeAll, expect, describe } from 'vitest';
import { setUpWeb5 } from '../../../setup-web5';

let web5;
let did;

describe('send', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;
  });

  test('createLocalRecord creates a record', async () => {
   // :snippet-start: createLocalRecord
    const { record } = await web5.dwn.records.create({
        data: "this record will be written to the local DWN",
        message: {
            dataFormat: 'text/plain'
        }
    });
  // :snippet-end:
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
            { who: 'anyone', can: ['create', 'read'] },
          ],
        },
      },
    };
    
    // :snippet-start: createLocalProtocol
    const response = await web5.dwn.protocols.configure({
      message: {
          definition: protocolDefinition
      }
    });
    // :snippet-end:
  
    expect(response.status.code).toBe(202);
  });

  //blocked by https://github.com/TBD54566975/dwn-sdk-js/issues/550
  test.todo('sendLocalRecordToTarget creates record', async () => {
    // :snippet-start: sendLocalRecordToTarget
    const { record } = await web5.dwn.records.create({
        data: "this record will be written to the target's local DWN",
        message: {
            target: targetDid,
            dataFormat: 'text/plain'
        }
    });
    // :snippet-end:
    expect(record).toBeDefined();
  });

  test('sendRecordToRemoteDWNs sends record', async () => {
    const userDid = did
    // :snippet-start: sendRecordToRemoteDWNs
    const { record } = await web5.dwn.records.create({
        data: "this record will be written to the local DWN",
        message: {
            dataFormat: 'text/plain'
        }
    });

    //immediately send record to user's remote DWNs
    const {status} = await record.send(userDid);
    // :snippet-end:
    expect(status.code).toBe(202);
  });

  test('sendProtocolToRemoteDWNs sends a protocol', async () => {
    const userDid = did
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
            { who: 'anyone', can: ['create', 'read'] },
          ],
        },
      },
    };
    // :snippet-start: sendProtocolToRemoteDWNs
    const { protocol } = await web5.dwn.protocols.configure({
        message: {
            definition: protocolDefinition
        }
    });

    //immediately send protocol to user's remote DWNs
    const {status} = await protocol.send(userDid);
    // :snippet-end:
    expect(status.code).toBe(202);
  });

  test('sendRecordToDWNOfRecipient can be configured', async () => {
    const recipientDid = did
    // :snippet-start: sendRecordToDWNOfRecipient
    const { record } = await web5.dwn.records.create({
        data: "this record will be created but not saved to DWN",
        store: false, //remove this line if you want to keep a copy of the record in the sender's DWN
        message: {
            dataFormat: 'text/plain'
        },
    });

    //send record to recipient's DWN
    const {status} = await record.send(recipientDid);
    // :snippet-end:
    expect(status.code).toBe(202);
  });
});
