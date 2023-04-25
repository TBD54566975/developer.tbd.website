import { Web5 } from '@tbd54566975/web5';

const web5 = new Web5;

const did = await web5.did.create('ion');

// manager.set not working right now, fix tomorrow
await web5.did.register({
    connected: true,
    did: did.id,
    endpoint: 'app://dwn',
    keys: did.keys[0].keypair,
});

const data = 'Hello Web5';

const writeResult = await web5.dwn.records.write(did.id, {
    author: did.id,
    data,
    message: {
        dataFormat: 'text/plain',
    },
});

const queryResult = await web5.dwn.records.query(did.id, {
    author: did.id,
    message: {
        filter: {
          dataFormat: 'text/plain',
        },
    },
});

const readResult = await web5.dwn.records.read(did.id, {
    author: did.id,
    message: {
        recordId: queryResult.entries[0].recordId,
    },
});

const deleteResult = await web5.dwn.records.delete(did.id, {
    author: did.id,
    message: {
        recordId: queryResult.entries[0].recordId,
    },
});