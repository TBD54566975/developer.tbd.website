import { test, expect } from 'vitest';
import { createAliceDid } from '../../../../code-snippets/web5/build/apps/upgrade-to-web5';

test('read result comes back from creating alice did', async () => {
  const readResult = await createAliceDid();
  expect(readResult).toBe('Hello Web5');
});
