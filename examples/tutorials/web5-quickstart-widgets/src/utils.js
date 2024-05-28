import { Web5 } from '@web5/api';
import { VerifiableCredential } from '@web5/credentials';

export async function didCreate() {
    let result = await Web5.connect();
    return result;
}

export async function getBearerDid(web5, myDid) {
    const { did: myBearerDid } = await web5.agent.identity.get({ didUri: myDid });
    return myBearerDid;
}

export async function createVc(web5, myDid, username) {
    const vc = await VerifiableCredential.create({
        type: 'Web5QuickstartCompletionCredential',
        issuer: myDid,
        subject: myDid,
        expirationDate: '2026-09-30T12:34:56Z',
        data: {
            username: username || '@alicesmith123',
            completionDate: '2024-05-22',
            expertiseLevel: 'Beginner',
        },
    });
    return vc;
}

export async function signVc(vc, bearerDid) {
    const signedVc = await vc.sign({ did: bearerDid });
    return signedVc;
}

export async function writeVc(web5, signedVc) {
    const { record } = await web5.dwn.records.create({
        data: signedVc,
        message: {
            schema: 'Web5QuickstartCompletionCredential',
            dataFormat: 'application/vc+jwt',
        },
    });
    return record;
}

export async function readSignedVc(record) {
    const readSignedVc = await record.data.text();
    return readSignedVc;
}

export async function parseSignedVc(vcJwt) {
    const parsedVc = await VerifiableCredential.parseJwt({ vcJwt });
    return parsedVc;
}
