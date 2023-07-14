---
title: Publishing Records
---

**1 minute read**

When records are created, they are private by default. Private records are not accessible without the use of a [protocol](/docs/web5/learn/protocols/) or permissions. To make a record publicly available, the record must be published.

In this guide, we’ll discuss how to publish a record.

## Publish a record upon creation

To publish a record, you must explicitly declare that record as published by setting the `published` attribute to `true` when creating it:

```js
const {record} = await web5.dwn.records.create({
  data: "a published record",
  message: {
    dataFormat: "text/plain",
    //highlight-start
    published: true,
    //highlight-end
  }
});
```

## Publishing records in the future

When specifying to publish a record without providing the `datePublished` attribute, the record will be published now (the same date it was created). However, it's also possible to publish a record in the future by providing a future date for the `datePublished` attribute:


```js
import { Temporal } from '@js-temporal/polyfill';

let today = Temporal.Now.instant();
let tomorrow = today.add({seconds: 86400});

//Create a record today to be published tomorrow 
const {record} = await web5.dwn.records.create({
  data: "This record will be created now and published tomorrow",
  message: {
    dataFormat: "text/plain",
    //highlight-start
    published: true,
    datePublished: tomorrow.toString({smallestUnit: 'microseconds' }),
    //highlight-end
  }
});
```

:::info
The `datePublished` value must be in ISO 8601 standard format for representing dates and times. It must be expressed in the **'YYYY-MM-DDThh:mm:ss.ssssssZ'** format, where YYYY is the 4-digit year, MM is the 2-digit month, DD is the 2-digit day, T is a separator, hh is the 2-digit hour in 24-hour format, mm is the 2-digit minute, ss.ssssss is the 2-digit second with microsecond precision of 6, and Z indicates the time is in Coordinated Universal Time (UTC).
:::
