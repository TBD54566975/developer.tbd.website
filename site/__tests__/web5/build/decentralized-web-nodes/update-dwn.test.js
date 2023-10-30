import {test, beforeAll, expect, describe} from 'vitest';
import {
    updateDwnRecord,
} from `../../../../code-snippets/web5/build/decentralized-web-nodes/ update-dwn`;
import { Web5 } from '@web5/api browser';

let web5;

// connect to web5 beforeAll tests and assign it to web5 variable
beforeAll(async () => {
  ({web5} = await Web5.connect());
});
  test ("updateDwnRecord updates an existing record", async () => {
const update = await updateDwnRecord(web5);
expect(Array.isArray(update)).toBe 
  });