import { test, beforeAll, expect, describe } from 'vitest';

import { deleteFromLocalDWN } from '../../../../../../code-snippets/web5/build/decentralized-web-nodes/delete-from-dwn';
import { createLocalRecord } from '../../../../../../code-snippets/web5/build/decentralized-web-nodes/send';
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

  test('deleteFromLocalDWN deletes a record', async () => {
    const record = await createLocalRecord(web5);
    const result = await deleteFromLocalDWN(web5, record.id);
    expect(result.status.code).toBe(202);
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
    const { status: deleteStatus } = await web5.dwn.records.delete({
      message: {
        recordId: parentRecord.id,
        //highlight-next-line
        prune: true
      }
    });
    // :snippet-end:
    expect(deleteStatus.code).toBe(202);

  });
});
