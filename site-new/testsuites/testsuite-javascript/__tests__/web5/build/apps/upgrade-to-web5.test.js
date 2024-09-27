import { test, expect, beforeAll, describe, vi } from "vitest";
import { setUpWeb5 } from "../../../setup-web5";
import { Web5 } from "@web5/api";

let web5, did;

describe("upgrade-to-web5", () => {
  beforeAll(async () => {
    // Set up web5 and did using the setUpWeb5 harness
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;

    // Mock the Web5 API to return the global web5 and did
    vi.mock("@web5/api", () => {
      return {
        Web5: {
          connect: vi.fn(() => ({
            web5,
            did,
          })),
        },
      };
    });
  });

  test("read result comes back from creating alice did", async () => {
    // :snippet-start: createAliceDid
    const { web5, did: aliceDid } = await Web5.connect();

    // Create the record
    const { record } = await web5.dwn.records.create({
      data: "Hello Web5",
      message: {
        dataFormat: "text/plain",
      },
    });

    // Read the record data
    const readResult = await record.data.text();
    // :snippet-end:

    // Check the result
    expect(readResult).toBe("Hello Web5");
  });
});
