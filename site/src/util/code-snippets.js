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
  return async function () {
    class UserDetailsCredential {
      constructor(name, dob, address, phoneNumber) {
        this.name = name;
        this.dob = dob;
        this.address = address;
        this.phoneNumber = phoneNumber;
      }
    }

    return await VerifiableCredential.create({
      type: 'UserDetailsCredential',
      issuer: aliceDid,
      subject: aliceDid,
      expirationDate: '2026-09-30T12:34:56Z',
      data: new UserDetailsCredential(
        inputName,
        '106th and Park NY, USA 02110',
        '678-999-8212'
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
