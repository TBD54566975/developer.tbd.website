

4. Register your DID:

Registering your DID gives others a way to find you, message you, and send you data (provided they have permissions).

```
await web5.did.register({
    connected: true,
    did: did.id,
    endpoint: 'app://dwn',
    keys: did.keys[0].keypair,
});
```

Register your DID from step one here:

:::caution

[ADD DEVIN’S WIDGET]

:::

5. Now you’re able to write / store your data in a Decentralized Web Node (DWN):

The DWN is your personal data store - a home for messages, pictures, videos, and more. It’s how you retain ownership over your information. Later on you’ll have the opportunity to replicate it for redundancy. It can be hosted by others, but because the private information in your DWN is encrypted with your key - you’re in charge, and all your information is secure.

```
const data = 'Hello Web5';
console.log('write data', data);

let writeResult = await web5.dwn.records.write(did.id, {
    author: did.id,
    data,
    message: {
        schema: 'test',
        dataFormat: 'text/plain',
    },
});
console.log('write result', writeResult);
```

Practice writing something:

:::caution

[ADD DEVIN’S WIDGET]

:::

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