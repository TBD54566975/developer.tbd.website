import { test, expect } from 'vitest';
import { createDidWithDWNEndpoint } from '../../../code-snippets/api/web5-js';

test('result comes back with web5 including dwnEndpoint in example', async () => {
  const result = await createDidWithDWNEndpoint();

  console.log(result);
});
