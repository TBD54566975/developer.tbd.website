import { test, beforeAll, expect, describe } from 'vitest';

import { deleteFromLocalDWN } from '../../../../../../code-snippets/web5/build/decentralized-web-nodes/delete-from-dwn';
import { createLocalRecord, sendLocalRecordToTarget } from '../../../../../../code-snippets/web5/build/decentralized-web-nodes/send';
import { setUpWeb5 } from '../../../setup-web5';

let web5;
let did;

describe('delete-from-dwn', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;
  });

  test('deleteRecordFromLocalDwn deletes a record', async () => {
    const record = await createLocalRecord(web5);
    // :snippet-start: deleteRecordFromLocalDwn
    const { status: deleteStatus } = await record.delete();
    // :snippet-end:
    const readResult = await web5.dwn.records.read({
      message: {
        filter: {
          recordId: record.id
        }
      }
    });
    expect(deleteStatus.code).toBe(202);
    expect(readResult.status.code).toBe(404);
  });

  test('deleteRecordFromRemoteDwn deletes a remote record', async () => {
    const record = await sendLocalRecordToTarget(web5, did);
    // :snippet-start: deleteRecordFromRemoteDwn
    const { status: deleteStatus } = await record.delete();
    // send the delete request to the remote DWN
    const { status: deleteSendStatus } = await record.send(did);
    // :snippet-end:
    expect(record.deleted).toBe(true);
    expect(deleteStatus.code).toBe(202);
    expect(deleteSendStatus.code).toEqual(202);
  });

  test('pruneRecords deletes parents record and its children', async () => {
    const { status: protocolStatus, protocol } = await web5.dwn.protocols.configure({
      message: {
        definition: {
          protocol: 'http://example.com/parent-child',
          published: true,
          types: {
            post: {
              schema: 'http://example.com/post',
            },
            comment: {
              schema: 'http://example.com/comment'
            }
          },
          structure: {
            post: {
              comment: {}
            }
          }
        }
      }
    });

    const { record: parentRecord } = await web5.dwn.records.create({
      data: 'Hello, world!',
      message: {
        protocol: protocol.definition.protocol,
        protocolPath: 'post',
        schema: 'http://example.com/post',
        dataFormat: 'text/plain'
      }
    });

    const { record: childRecord } = await web5.dwn.records.create({
      data: 'Hello, world!',
      message: {
        protocol: protocol.definition.protocol,
        protocolPath: 'post/comment',
        schema: 'http://example.com/comment',
        dataFormat: 'text/plain',
        parentContextId: parentRecord.contextId
      }
    });

    // :snippet-start: pruneRecords
    const { status: deleteStatus } = await parentRecord.delete({ prune: true });
    // :snippet-end:

    const { records: childrenRecordsAfterDelete } = await web5.dwn.records.query({
      message: {
        filter: {
          protocol: protocol.definition.protocol,
          protocolPath: 'post/comment'
        }
      }
    });

    const { records: parentRecordsAfterDelete } = await web5.dwn.records.query({
      message: {
        filter: {
          protocol: protocol.definition.protocol,
          protocolPath: 'post'
        }
      }
    });
    expect(deleteStatus.code).toBe(202);
    expect(parentRecordsAfterDelete).to.have.lengthOf(0);
    expect(childrenRecordsAfterDelete).to.have.lengthOf(0);
  });
});
