import { test, beforeAll, expect, describe } from 'vitest';

import {
  readRecordFromId,
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
      const text = 'readRecordFromId';
      const { record: textRecord } = await web5.dwn.records.create({
        data: text,
        message: {
          dataFormat: 'text/plain',
        },
      });
      const returnedText = await readRecordFromId(web5, textRecord.id);
      expect(returnedText).toBe(text);
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
