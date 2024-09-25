import { test, beforeAll, expect, describe } from 'vitest';

import {
  deleteRecordFromDid,
} from '../../../../../../code-snippets/web5/build/decentralized-web-nodes/records';
import { setUpWeb5 } from '../../../setup-web5';

let web5;
let record;
let myDid;

describe('records', () => {
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    myDid = globalThis.did;
  });

  describe('tests for /api/web5-js/dwn/records', async () => {

    test('readRecordFromId reads a record', async () => {
      const testText = 'readRecordFromId';
      const { record: textRecord } = await web5.dwn.records.create({
        data: testText,
        message: {
          dataFormat: 'text/plain',
        },
      });
      const recordId = textRecord.id
      // :snippet-start: readRecordFromId
      // Reads the indicated record from the user's DWNs
      let { record } = await web5.dwn.records.read({
        message: {
          filter: {
            recordId: recordId,
          },
        },
      });

      // assuming the record has a text payload
      const text = await record.data.text();
      // :snippet-end:
      expect(text).toBe(testText);
    });

    test('deleteRecordFromDid deletes a record', async () => {
      const { record } = await web5.dwn.records.create({
        data: "delete me",
        message: {
          dataFormat: 'text/plain',
        },
      });
      /*
       immediately send record to user's remote DWNs
        so that we can read it from there in the below test
      */
      await record.send(myDid);

      const result = await deleteRecordFromDid(web5, record, myDid);
      expect(result.status.code).toBe(202);
    });
  });
});
