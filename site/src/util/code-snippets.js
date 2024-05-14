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

export function createQuickstartVc(web5, aliceDid, inputName, inputDate) {
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
        inputDate,
        '106th and Park NY, USA 02110',
        '678-999-8212'
      )
    });
  }
}

export function signQuickstartVc(web5, aliceDid) {  
  return async function () {

   // console.log(aliceDid)
    const { did: aliceBearerDid } = await web5.agent.identity.get({ didUri: aliceDid });

    console.log(aliceBearerDid)
    
    class UserDetailsCredential {
      constructor(name, dob, address, phoneNumber) {
        this.name = name;
        this.dob = dob;
        this.address = address;
        this.phoneNumber = phoneNumber;
      }
    }

    const vc = await VerifiableCredential.create({
      type: 'UserDetailsCredential',
      issuer: aliceDid,
      subject: aliceDid,
      expirationDate: '2026-09-30T12:34:56Z',
      data: new UserDetailsCredential(
        'Alice Smith',
        '1995-07-04T12:34:56Z',
        '106th and Park NY, USA 02110',
        '678-999-8212'
      )
    });

    return await vc.sign(({ did: aliceBearerDid }));
  
  }
}

export function writeVcToDwn(web5, vc) {
  return async function () {
    return await web5.dwn.records.create({
      data: vc,
      message: {
        dataFormat: 'application/vc+jwt',
      },
    });
  }
}

export function readVcFromDwn(web5, recordId) {
  return async function () {
    const { record } = await web5.dwn.records.get({ recordId });
    return await record.data.json();
  }
}

export function parseVc(web5, vc) {
  return async function () {
    return await VerifiableCredential.parseJwt({ vcJwt: vc })
  }
}
