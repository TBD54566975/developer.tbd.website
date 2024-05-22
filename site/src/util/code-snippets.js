import { Web5 } from '@web5/api';
import { VerifiableCredential } from '@web5/credentials';

export function didCreate() {
  return async function () {
    return await Web5.connect();
  }
}

export function getBearerDid(web5, didUri) {
  return async function () {
    const { did: aliceBearerDid } = await web5.agent.identity.get({ didUri });
    return await aliceBearerDid;
  }
}

export function createQuickstartVc(aliceDid, inputName) {
  const todaysDate = new Date().toISOString().split('T')[0];
  return async function () {
    class Web5QuickstartCompletionCredential {
      constructor(username, completionDate, expertiseLevel) {
        this.username = username || '@alicesmith123';
        this.completionDate = completionDate;
        this.expertiseLevel = expertiseLevel;
      }
    }

    return await VerifiableCredential.create({
      type: 'Web5QuickstartCompletionCredential',
      issuer: aliceDid,
      subject: aliceDid,
      expirationDate: '2026-09-30T12:34:56Z',
      data: new Web5QuickstartCompletionCredential(
        inputName,
        todaysDate,
        'Beginner',
      )
    });
  }
}

export function signQuickstartVc(bearerDid, verifiableCred) {
  return async function () {
    return await verifiableCred.sign(({ did: bearerDid }));

  }
}

export function writeVcToDwn(web5, signedJwt) {
  return async function () {

    const { record } = await web5.dwn.records.create({
      data: signedJwt,
      message: {
        dataFormat: 'application/vc+jwt',
      },
    });

    return record
  }
}

export function readVcFromDwn(dwnRecord) {
  return async function () {
    return await dwnRecord.data.text()
  }
}

export function parseVc(signedJwt) {
  return async function () {
    return await VerifiableCredential.parseJwt({ vcJwt: signedJwt })
  }
}
