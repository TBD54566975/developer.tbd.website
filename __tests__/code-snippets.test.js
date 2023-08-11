import { test, beforeAll, expect, describe } from "vitest";
import {
  didCreate,
  createRecordWithSchema,
  deleteRecord,
  updateRecord,
  readRecord,
  queryRecordsWithFilter,
} from "../code-snippets.js";

// This is the web5 instance that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let web5;
// This is the decentralized ID that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let aliceDid;
// This record result is what comes back from the createTextRecord function. This is used to test the record's attributes and methods.
let recordResult;

const textInput = {
  completed: false,
  description: "YEEERR!",
};
const updatedTextInput = {
  completed: true,
  description: "YEEERR! UPDATED",
};

describe("/site/tests/quickstart.test.js", () => {
  // This is where we create a DID, assign the web5 and aliceDid variables, and then use the aliceDid to write a text record.
  beforeAll(async () => {
    const result = await didCreate();

    web5 = result.web5;
    aliceDid = result.did;
  });

  test("didCreate returns a decentralized ID", async () => {
    expect(typeof aliceDid).toBe("string");
    const didRegex = /^did:[a-z0-9]+:.+/i;
    expect(didRegex.test(aliceDid)).toBe(true);
  });

  test("createRecordWithSchema returns a record with aliceDid being the same value as the author attribute", async () => {
    // This is where we write a text record and assign the result to the recordResult variable.
    const response = await createRecordWithSchema(web5, {
      data: textInput,
      message: {
        schema: "http://some-schema-registry.org/todo",
        dataFormat: "application/json",
      },
    });
    recordResult = response.record;
    expect.soft(response.status.code).toBe(202);
    expect(recordResult.author).toBe(aliceDid);
  });

  test("recordResult returns a record with the textInput being the same value as the data attribute", async () => {
    const dataResult = await recordResult.data.json();
    expect(dataResult).toEqual(textInput);
  });

  test("updateRecord successfully sends an updated textInput", async () => {
    const updatedRecordResult = await updateRecord(recordResult, {
      data: updatedTextInput,
    });

    expect.soft(updatedRecordResult.status.code).toBe(202);
    expect(updatedTextInput).toEqual(await recordResult.data.json());
  });

  test("recordResult successfully deletes the record", async () => {
    const deletedRecordResult = await recordResult.delete();
    expect.soft(deletedRecordResult.status.code).toBe(202);

    expect(recordResult.isDeleted).toBe(true);
  });
});

test("queryRecordsWithFilter returns a record with the textInput being the same value as the data attribute", async () => {
  const result = await queryRecordsWithFilter(web5, {
    message: {
      filter: {
        protocol: "http://social-media.xyz",
      },
      dateSort: "createdDescending",
    },
  });

  console.log("protocols", result);
});
