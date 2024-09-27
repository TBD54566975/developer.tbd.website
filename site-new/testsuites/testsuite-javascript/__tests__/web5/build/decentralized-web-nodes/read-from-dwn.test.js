import { test, beforeAll, expect, describe } from "vitest";
import { setUpWeb5 } from "../../../setup-web5";

export async function readFromDwn(web5) {
  const response = await web5.dwn.records.query({
    message: {
      filter: {
        dataFormat: "text/plain",
      },
    },
  });

  return response;
}

let web5;

describe("Testing reading from DWNs", () => {
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
  });

  test("readFromDwn returns 200 status code", async () => {
    const result = await readFromDwn(web5);
    expect(result.status.code).toBe(200);
  });
});
