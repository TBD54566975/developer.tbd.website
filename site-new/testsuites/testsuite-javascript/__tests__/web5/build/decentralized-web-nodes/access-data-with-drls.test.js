import {
  beforeAll,
  beforeEach,
  afterEach,
  describe,
  test,
  expect,
  vi,
} from "vitest";
import { setUpWeb5 } from "../../../setup-web5";

export async function uploadImage(event) {
  // :snippet-start: uploadImage
  // Create a blob record
  async function upload(event) {
    const blob = new Blob(event.currentTarget.files, { type: "image/png" });
    const { record } = await web5.dwn.records.create({
      data: blob,
      message: {
        dataFormat: "image/png",
      },
    });
    return record;
  }
  return upload(event);
  // :snippet-end:
}

describe("Testing upgrade to PWA", () => {
  let web5, did;
  let originalFetch;
  let recordId;

  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;
  });

  beforeEach(() => {
    originalFetch = global.fetch;

    vi.mock("@web5/browser", () => ({
      Web5: {
        connect: vi.fn(() => Promise.resolve({ web5, did })),
      },
    }));

    global.fetch = vi.fn((url) => {
      // Step 3: Use the variable in your mocked fetch function
      if (url === `https://dweb/${did}/read/records/${recordId}`) {
        return Promise.resolve({
          ok: true,
          status: 200,
          blob: () =>
            Promise.resolve(
              new Blob(["fake image data"], { type: "image/png" }),
            ),
        });
      }
      return Promise.reject(new Error("URL not found"));
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    global.fetch = originalFetch;
  });

  test("drl fetches a read record", async () => {
    const mockEvent = {
      currentTarget: {
        files: [new Blob(["fake image data"], { type: "image/png" })],
      },
    };
    const record = await uploadImage(mockEvent);
    recordId = record.id;
    // :snippet-start: drlFetchReadRecord
    const drl = `https://dweb/${did}/read/records/${recordId}`;
    const response = await fetch(drl);
    const imageUrl = URL.createObjectURL(await response.blob());
    // :snippet-end:
    expect(response.ok).toBeTruthy();
    expect(response.status).toBe(200);
    expect(imageUrl.startsWith("blob:")).toBeTruthy();
  });

  test("set image src to url", async () => {
    const mockEvent = {
      currentTarget: {
        files: [new Blob(["fake image data"], { type: "image/png" })],
      },
    };
    const record = await uploadImage(mockEvent);
    recordId = record.id;
    const drl = `https://dweb/${did}/read/records/${recordId}`;
    const response = await fetch(drl);
    const imageUrl = URL.createObjectURL(await response.blob());
    return `
          // :snippet-start: renderImageUrlTag
         <img src="${imageUrl}" alt="uploaded image" />
         // :snippet-end:
         `;
  });
});
