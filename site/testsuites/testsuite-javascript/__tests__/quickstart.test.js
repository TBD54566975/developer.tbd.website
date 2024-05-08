import { test, beforeAll, expect, describe } from 'vitest';
import {
  createTextRecord,
  readTextRecord,
  updateTextRecord,
  deleteTextRecord,
} from '../../../code-snippets/web5/quickstart';
import { setUpWeb5 } from './setup-web5';
import { VerifiableCredential } from '@web5/credentials';

// This is the web5 instance that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let web5;
// This is the decentralized ID that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let aliceDid;
// This record result is what comes back from the createTextRecord function. This is used to test the record's attributes and methods.
let recordResult;

const textInput = 'Hello, Web5!';
const updatedTextInput = 'Hello, Web5! I am updated.';

describe('/site/tests/quickstart.test.js', async () => {
  // This is where we create a DID, assign the web5 and aliceDid variables, and then use the aliceDid to write a text record.
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    aliceDid = globalThis.did;
  });

  test('didCreate returns a decentralized ID', async () => {
    expect(typeof aliceDid).toBe('string');
    const didRegex = /^did:[a-z0-9]+:.+/i;
    expect(didRegex.test(aliceDid)).toBe(true);
  });

  test('getBearerId returns a bearer identity', async () => {
    // :snippet-start: getBearerId
    const alice = await web5.agent.identity.get({ didUri: aliceDid });
    // :snippet-end:
    expect(alice.did.uri).toBe(aliceDid);
  });

  test('createQuickstartVc returns a vc', async () => {
    const alice = await web5.agent.identity.get({ didUri: aliceDid });
    // :snippet-start: createQuickstartVc
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
      issuer: alice.did.uri,
      subject: alice.did.uri,
      expirationDate: '2026-09-30T12:34:56Z',
      data: new UserDetailsCredential(
        'Alice Smith',
        '1995-07-04T12:34:56Z',
        '106th and Park NY, USA 02110',
        '678-999-8212'
      )
    });
    // :snippet-end:
    expect(vc.vcDataModel.issuer).toBe(aliceDid);
  });

  test('signQuickstartVc returns a jwt', async () => {
    const alice = await web5.agent.identity.get({ didUri: aliceDid });
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
      issuer: alice.did.uri,
      subject: alice.did.uri,
      expirationDate: '2026-09-30T12:34:56Z',
      data: new UserDetailsCredential(
        'Alice Smith',
        '1995-07-04T12:34:56Z',
        '106th and Park NY, USA 02110',
        '678-999-8212'
      )
    });
    // :snippet-start: signQuickstartVc
    const signedVc = await vc.sign({ did: alice.did });
    // :snippet-end:
    expect(typeof signedVc).toBe('string');
  });

  test('writeQuickstartVcToDwn writes a signed vc to dwn', async () => {
    const alice = await web5.agent.identity.get({ didUri: aliceDid });
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
      issuer: alice.did.uri,
      subject: alice.did.uri,
      expirationDate: '2026-09-30T12:34:56Z',
      data: new UserDetailsCredential(
        'Alice Smith',
        '1995-07-04T12:34:56Z',
        '106th and Park NY, USA 02110',
        '678-999-8212'
      )
    });
    const signedVc = await vc.sign({ did: alice.did });
    // :snippet-start: writeQuickstartVcToDwn
    const { record } = await web5.dwn.records.create({
      data: signedVc,
      message: {
        schema: 'UserDetailsCredential',
        dataFormat: 'application/vc+jwt',
      }
    });
    // :snippet-end:
    expect(record.author).toBe(aliceDid);
  });

  test('readQuickstartVc reads jwt from DWN', async () => {
    const alice = await web5.agent.identity.get({ didUri: aliceDid });
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
      issuer: alice.did.uri,
      subject: alice.did.uri,
      expirationDate: '2026-09-30T12:34:56Z',
      data: new UserDetailsCredential(
        'Alice Smith',
        '1995-07-04T12:34:56Z',
        '106th and Park NY, USA 02110',
        '678-999-8212'
      )
    });
    const signedVc = await vc.sign({ did: alice.did });

    const { record } = await web5.dwn.records.create({
      data: signedVc,
      message: {
        schema: 'UserDetailsCredential',
        dataFormat: 'application/vc+jwt',
      }
    });
    // :snippet-start: readQuickstartVc
    const readSignedVc = await record.data.text();
    // :snippet-end:
    expect(typeof readSignedVc).toBe('string');
  });

  test('parseQuickstartVc reads jwt from DWN', async () => {
    const alice = await web5.agent.identity.get({ didUri: aliceDid });
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
      issuer: alice.did.uri,
      subject: alice.did.uri,
      expirationDate: '2026-09-30T12:34:56Z',
      data: new UserDetailsCredential(
        'Alice Smith',
        '1995-07-04T12:34:56Z',
        '106th and Park NY, USA 02110',
        '678-999-8212'
      )
    });
    const signedVc = await vc.sign({ did: alice.did });

    const { record } = await web5.dwn.records.create({
      data: signedVc,
      message: {
        schema: 'UserDetailsCredential',
        dataFormat: 'application/vc+jwt',
      }
    });

    const readSignedVc = await record.data.text();
    // :snippet-start: parseQuickstartVc
    const parsedVc = VerifiableCredential.parseJwt({ vcJwt: readSignedVc });
    // :snippet-end:
    expect(parsedVc.vcDataModel.issuer).toBe(aliceDid);
  });

});

function getFrontPageHtml(pariss) {}
