import { test, beforeAll, expect, describe } from 'vitest';
import { readFromDwn } from '../../../../code-snippets/web5/build/decentralized-web-nodes/read-from-dwn';

let web5;

describe('Testing reading from DWNs', () => {
  beforeAll(async () => {
    web5 = globalThis.web5;
  });

  test('readFromDwn returns 200 status code', async () => {
    const result = await readFromDwn(web5);
    expect(result.status.code).toBe(200);
  });
});
