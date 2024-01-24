import { test, beforeAll, expect, describe } from 'vitest';

import {
  createRecordsWithPlaylist,
  createRecordWithoutStore,
  createRecordAndSend,
  queryPlaylistFromDid,
  readRecordFromId,
  readRecordByIdFromDid,
  sortQueriedRecordsByDate,
  deleteRecordFromDid,
} from '../../../../code-snippets/api/web5-js/dwn/records';
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
    test('createRecordsWithPlaylist creates a record', async () => {
      const playlistJson = { songs: [{ title: 'song1' }, { title: 'song2' }] };
      const result = await createRecordsWithPlaylist(web5, playlistJson);
      record = result;

      expect(result).toBeDefined();
    });

    test('createRecordWithoutStore creates a record', async () => {
      const result = await createRecordWithoutStore(web5);
      expect(result).toBeDefined();
    });

    test('createRecordAndSend creates a record', async () => {
      // passing myDid twice because we can't show the second example of sending a status to bob without a real DID.
      // One solution to this would be creating another DID manually, but that's not possible at the moment.
      const result = await createRecordAndSend(web5, myDid, myDid);

      expect(result.myDidStatus).toBeDefined();
      expect(result.bobStatus).toBeDefined();
    });

    test('queryPlaylistFromDid queries records', async () => {
      const result = await queryPlaylistFromDid(web5, myDid);
      expect(result).toBeDefined();
    });

    test('sortQueriedRecordsByDate queries and sorts records', async () => {
      const result = await sortQueriedRecordsByDate(web5);
      expect(result).toBeDefined();
    });

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

    test('readRecordByIdFromDid reads a record by ID from a specific DID', async () => {
      const initialData = { name: 'bob' };
      const { record: jsonRecord } = await web5.dwn.records.create({
        data: initialData,
        message: {
          dataFormat: 'application/json',
        },
      });

      /*
       immediately send record to user's remote DWNs
        so that we can read it from there in the below test
      */
      await jsonRecord.send(myDid);

      const returnedData = await readRecordByIdFromDid(
        web5,
        myDid,
        jsonRecord.id,
      );
      expect(initialData).toEqual(returnedData);
    });

    test('deleteRecordFromDid deletes a record', async () => {
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
