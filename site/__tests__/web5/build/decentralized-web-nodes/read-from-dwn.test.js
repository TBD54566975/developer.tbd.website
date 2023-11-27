import { test, beforeAll, expect, describe } from 'vitest';
import { readFromDwn } from '../../../../code-snippets/web5/build/decentralized-web-nodes/read-from-dwn';

let web5;

describe('Testing snippet at /site/docs/web5/build/decentralized-web-nodes/read-from-dwn.mdx', () => {
  beforeAll(async () => {
    web5 = globalThis.web5;
  });

  test('readFromDwn fires successfully', async () => {
    const result = await readFromDwn(web5);

    console.log(result);

    expect(result.status.code).toBe(200);
  });
});
