import { test, expect, beforeAll, describe, vi } from 'vitest';
import { createAliceDid } from '../../../../code-snippets/web5/build/apps/upgrade-to-web5';

let web5;

describe('ugprade-to-web5', () => {
  beforeAll(async () => {
    web5 = globalThis.web5;
    did = globalThis.did;

    vi.mock('@web5/api', () => {
      return {
        Web5: {
          connect: vi.fn(() => {
            return {
              web5,
              did,
            };
          }),
        },
      };
    });
  });

  test('read result comes back from creating alice did', async () => {
    const readResult = await createAliceDid();
    expect(readResult).toBe('Hello Web5');
  });
});
