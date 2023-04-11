6. Query

Here’s how you’re able to query anything you've saved in your DWN.

:note: The dataFormat value isn’t limited to image/png; it can be any MIME type.

```
let queryResult = await
    web5.dwn.records.query(did.id, {
        author: did.id,
        message: {
            filter: {
            schema: 'test',
        },
    },
});
console.log('query result', queryResult);
```

Now let's find some information about the data you just wrote:

:::caution

[ADD DEVIN’S WIDGET]

:::

7. Reading your messages in DWN

```
let readResult = await web5.dwn.records.read(did.id, {
    author: did.id,
    message: {
        recordId: queryResult.entries[0].recordId,
    },
});
console.log('read result', readResult);
console.log('read data',
web5.dwn.SDK.Encoder.bytesToString(await web5.dwn.SDK.DataStream.toBytes(readResult.data)));
```

Now let's get the actual data for the information we just got (edit this sentence):

:::caution

[ADD DEVIN’S WIDGET]

:::

8. Deleting messages in your DWN

let deleteResult = await web5.dwn.records.delete(did.id, {
author: did.id,
message: {
recordId: queryResult.entries[0].recordId,
},
});
console.log('delete result', deleteResult);

:::caution

[ADD DEVIN’S WIDGET]

:::

Next Steps:

1. Learn more about DIDs (link to DID page)
2. Build your first ToDo app (link coming soon)
3. Learn what to do with a DID externally(linked in build>DID>how-to-use-externa..)
