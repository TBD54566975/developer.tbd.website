import {test, beforeAll, expect, describe} from 'vitest';
import {
    updateDwnRecord,
} from `../../../../code-snippets/web5/build/decentralized-web-nodes/ update-dwn`;
import { Web5 } from '@web5/api browser';

let web5;

// connect to web5 beforeAll tests and assign it to web5 variable
beforeAll(async () => {
  ({web5} = await Web5.connect());
//Create record to update
const {record: createdRecord} = await web5.dwn.records.create({
    data: "test record",
    message: {
      dataFormat: "text/plain"
    }
  });

  //Call code snippet to update record


  //Assert that status code is 202
});