import { beforeAll, describe, test, expect, vi } from 'vitest';
import { setUpWeb5 } from '../../../setup-web5';

describe('Testing upgrade to PWA', () => {
  let web5, did;
  const recordId = "bafyreifsfh74ghrkmok7rw5ci6ayhz2bdoeaen4udygmq52twi5lu2jsju";  
  beforeAll(async () => {
    // Set up Web5 with whatever global setup you need
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;

    // Mock @web5/api
    vi.mock('@web5/api', () => {
      return {
        Web5: {
          connect: vi.fn(() => Promise.resolve({ web5, did }))
        }
      };
    });

    // Mock fetch globally in your test environment
    global.fetch = vi.fn((url) => {
      if (url === `https://dweb/${did}/read/records/${recordId}`) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ data: "Hello, World" })
        });
      }
      return Promise.reject(new Error('URL not found'));
    });
  });

  test('drl fetches a read record', async () => {
     // :snippet-start: drlFetchReadRecord
    const dwebUrl = `https://dweb/${did}/read/records/${recordId}`;
    const response = await fetch(dwebUrl);
    const data = await response.json();
    // :snippet-end:

    expect(response.ok).toBeTruthy();
    expect(response.status).toBe(200);
    expect(data).toEqual({ data: "Hello, World" });
  });
});
