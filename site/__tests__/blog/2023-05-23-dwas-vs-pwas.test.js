import { test, beforeAll, expect, describe } from 'vitest';
import { createRecordWithTodoItem } from '../../code-snippets/blog/2023-05-23-dwas-vs-pwas';
import { Web5 } from '@web5/api/browser';

let web5;

let did;

beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
  did = result.did;
});

test.skip('createRecordWithTodoItem returns a record with the todoItem being the same value as the data attribute', async () => {
  const todoItem = 'Some todo item';
  const recordResult = await createRecordWithTodoItem(web5, did, todoItem);

  console.log('recordResult', JSON.stringify(recordResult, null, 2));

  expect(recordResult.data).toBe(todoItem);
});
