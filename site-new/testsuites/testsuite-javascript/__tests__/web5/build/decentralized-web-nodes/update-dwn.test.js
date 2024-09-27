import { test, beforeAll, expect, describe } from 'vitest';
import { setUpWeb5 } from '../../../setup-web5';

let web5;

describe('update-dwn-test', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
    await setUpWeb5();
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
    
    // :snippet-start: updateDwnRecord
    // Get the record
    const { record } = await web5.dwn.records.read({
      message: {
        filter: {
          recordId: createdRecord.id
        }
      }
    });

    // Update the record
    // highlight-next-line
    const {status} = await record.update({ data: "Hello, I'm updated!" });
    // :snippet-end:

    expect(status.code).toBe(202);
  });
});
