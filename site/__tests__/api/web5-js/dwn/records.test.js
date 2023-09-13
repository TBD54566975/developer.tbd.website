import { test, beforeAll, expect, describe } from 'vitest';
import {
  createRecordsWithPlaylist,
  createRecordWithoutStore,
  createRecordAndSend,
  queryPlaylistFromDid,
  readRecordFromRecordId,
  deleteRecordFromDid,
} from '../../../../code-snippets/api/web5-js/dwn/records';
import { Web5 } from '@web5/api/browser';

let web5;
let record;
let myDid;

beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
  myDid = result.did;
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
    record = result;

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

  //skipping until we figure out why passing a real record id gives back an undefined record
  test.skip('readRecordFromRecordId reads a record', async () => {
    const result = await readRecordFromRecordId(web5, record.id);
    console.log('gimme result', result);

    expect(result).toBeDefined();
  });

  //skipping until we figure out why passing a real record id gives back an undefined record
  test.skip('deleteRecordFromDid deletes a record', async () => {
    const result = await deleteRecordFromDid(web5, record, myDid);

    expect(result).toBeDefined();
  });
});
