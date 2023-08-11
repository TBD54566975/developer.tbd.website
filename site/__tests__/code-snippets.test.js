import { test, beforeAll, expect, describe } from 'vitest';
import { queryRecordsWithFilter } from '../code-snippets/query-from-dwn';
import { Web5 } from '@tbd54566975/web5/browser';

let web5;

// connect to web5 beforeAll tests and assign it to web5 variable
beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
});

// test that queryRecordsWithFilter returns an array of protocols
test('queryRecordsWithFilter returns an array of protocols', async () => {
  const protocols = await queryRecordsWithFilter(web5);

  expect(Array.isArray(protocols)).toBe(true);
});
