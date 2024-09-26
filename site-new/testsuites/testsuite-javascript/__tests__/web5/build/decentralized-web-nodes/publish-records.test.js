import { test, beforeAll, expect, describe } from 'vitest';
import { setUpWeb5 } from '../../../setup-web5';

let web5;
let did;

describe('publish-records', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;
  });

  test('createPublishedRecord creates a public record', async () => {
    // :snippet-start: createPublishedRecord
    const {record} = await web5.dwn.records.create({
      data: "a published record",
      message: {
        dataFormat: "text/plain",
        //highlight-start
        published: true
        //highlight-end
      }
    });
    // :snippet-end:
    expect(record.published).toBe(true);
  });

  test('createRecordWithDatePublished creates a record that will be published later', async () => {
    // :snippet-start: createRecordWithDatePublished
    // Create a new Date instance for tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Format the date and time in YYYY-MM-DDThh:mm:ss.ssssssZ format
    const formattedDate = tomorrow.toISOString().replace(/\.\d{3}Z$/, '.000000Z');

    // Create a record today to be published tomorrow
    const { record } = await web5.dwn.records.create({
      data: "This record will be created now and published tomorrow",
      message: {
        dataFormat: "text/plain",
        //highlight-start
        published: true,
        datePublished: formattedDate
        //highlight-end
      },
    });
    // :snippet-end:
    const isDateCorrect = record.datePublished === formattedDate;
    expect(isDateCorrect).toBe(true);
  });
});
