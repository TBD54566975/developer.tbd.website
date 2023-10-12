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

//blocked by https://github.com/TBD54566975/dwn-sdk-js/issues/550
export async function sendLocalRecordToTarget(web5, targetDid) {
const { record } = await web5.dwn.records.create({
    data: "this record will be written to the target's local DWN",
    message: {
        target: targetDid,
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

export async function sendRecordToDWNOfRecipient(web5, recipientDid) {
const { record } = await web5.dwn.records.create({
    data: "this record will be created but not saved to DWN",
    store: false, //remove this line if you want to keep a copy of the record in the sender's DWN
    message: {
        dataFormat: 'text/plain'
    },
});

//send record to recipient's DWN
const {status} = await record.send(recipientDid);

return status;
}