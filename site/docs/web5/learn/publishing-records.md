---
title: Publishing Records
---

**3 minute read**

When records are created, they are private by default. Private records are not accessible without the use of a [protocol](/api/web5-js/dwn/protocol) or permissions. To make a record publicly available, the record must be published.

In this guide, we’ll discuss how to publish a record upon creation or in the future.

## Publish a record upon creation

To publish a record, you must explicitly declare that record as published by setting the `published` attribute to `true` when creating it like so:

```js
const {record} = await web5.dwn.records.create({
  data: "a published record",
  message: {
    dataFormat: "text/plain",
    published: true,
  }
});
```

## Publishing records in the future

When specifying to publish a record without providing the `datePublished` attribute, the record will be published now (the same day it was created). However, it's also possible to publish a record in the future by providing a future date for the `datePublished` attribute like so:

```js
import { Temporal } from '@js-temporal/polyfill';

let today = Temporal.Now.instant();
let tomorrow = today.add({seconds: 86400});

//Create a record today to be published tomorrow 
const {record} = await web5.dwn.records.create({
  data: "This record will be created now and published tomorrow",
  message: {
    dataFormat: "text/plain",
    published: true,
    datePublished: tomorrow.toString({smallestUnit: 'microseconds' }),
  }
});
```