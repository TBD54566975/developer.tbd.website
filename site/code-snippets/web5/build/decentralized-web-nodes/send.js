export async function createLocalRecord(web5) {
const { record } = await web5.dwn.records.create({
    data: "this record will be written to the local DWN",
    message: {
        dataFormat: 'text/plain'
    }
});

return record;
}

export async function createLocalProtocol(web5, protocolDefinition) {
const response = await web5.dwn.protocols.configure({
    message: {
        definition: protocolDefinition
    }
});

return response;
}

export async function sendLocalRecordToRecipient(web5, recipientDid) {
const { record } = await web5.dwn.records.create({
    data: "this record will be written to the recipient's local DWN",
    message: {
        recipient: recipientDid,
        dataFormat: 'text/plain'
    }
});

return record;
}

export async function sendRecordToRemoteDWNs(web5, userDid) {
const { record } = await web5.dwn.records.create({
    data: "this record will be written to the local DWN",
    message: {
        dataFormat: 'text/plain'
    }
});

//immediately send record to user's remote DWNs
const {status} = await record.send(userDid);

return status;
}

export async function sendProtocolToRemoteDWNs(web5, protocolDefinition, userDid) {
const { protocol } = await web5.dwn.protocols.configure({
    message: {
        definition: protocolDefinition
    }
});

//immediately send protocol to user's remote DWNs
const {status} = await protocol.send(userDid);

return status;
}

export async function sendRecordToRemoteDWNsOfRecipient(web5, recipientDid) {
const { record } = await web5.dwn.records.create({
    data: "this record will be written to the recipient's local DWN",
    message: {
        recipient: recipientDid,
        dataFormat: 'text/plain'
    },
});

//immediately send record to recipient's remote DWNs
const {status} = await record.send(recipientDid);

return status;
}