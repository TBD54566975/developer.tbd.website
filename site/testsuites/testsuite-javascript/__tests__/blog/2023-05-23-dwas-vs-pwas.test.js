import { test, beforeAll, expect, describe } from 'vitest';

import { createRecordWithTodoItem } from '../../../../code-snippets/blog/2023-05-23-dwas-vs-pwas';
import { setUpWeb5 } from '../setup-web5';

let web5;
let did;

describe('delete-from-dwn', () => {
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;
  });

  test.skip('createRecordWithTodoItem returns a record with the todoItem being the same value as the data attribute', async () => {
    const todoItem = 'Some todo item';
    const recordResult = await createRecordWithTodoItem(web5, did, todoItem);

    console.log('recordResult', JSON.stringify(recordResult, null, 2));

    expect(recordResult.data).toBe(todoItem);
  });
});
