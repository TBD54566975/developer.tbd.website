import { test, beforeAll, expect, describe } from 'vitest';
import { updateDwnRecord } from '../../../../code-snippets/web5/build/decentralized-web-nodes/update-dwn';
import { Web5 } from '@web5/api';

let web5;

describe('update-dwn-test', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
    web5 = globalThis.web5;
  });

  test('updateDwnRecord updates an existing record', async () => {
    //Create record to update
    const { record: createdRecord } = await web5.dwn.records.create({
      data: 'test record',
      message: {
        dataFormat: 'text/plain',
      },
    });

    //Call code snippet to update record
    const updateStatus = await updateDwnRecord(web5, createdRecord);

    //Assert that status code is 202
    expect(updateStatus.code).toBe(202);
  });
});
