import { test, beforeAll, expect, describe } from 'vitest';
import { setUpWeb5 } from './setup-web5';
import { VerifiableCredential } from '@web5/credentials';

// This is the web5 instance that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let web5;
// This is the decentralized ID that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let aliceDid;
// This record result is what comes back from the createTextRecord function. This is used to test the record's attributes and methods.

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

  test('getBearerDid returns a bearer identity', async () => {
    // :snippet-start: getBearerDid
    const { did: aliceBearerDid } = await web5.agent.identity.get({ didUri: aliceDid });
    // :snippet-end:
    expect(aliceBearerDid.uri).toBe(aliceDid);
  });

  test('createQuickstartVc returns a vc', async () => {
    // :snippet-start: createQuickstartVc
    const vc = await VerifiableCredential.create({
      type: 'Web5QuickstartCompletionCredential',
      issuer: aliceDid,
      subject: aliceDid,
      data: {
        name: 'Alice Smith',
        completionDate: new Date().toISOString(),
        expertiseLevel: 'Beginner'
      }
    });
    // :snippet-end:
    expect(vc.vcDataModel.issuer).toBe(aliceDid);
  });

  test('signQuickstartVc returns a jwt', async () => {
    const { did: aliceBearerDid } = await web5.agent.identity.get({ didUri: aliceDid });
    class Web5QuickstartCompletionCredential {
      constructor(name, completionDate, expertiseLevel) {
        this.name = name;
        this.completionDate = completionDate;
        this.expertiseLevel = expertiseLevel;
      }
    }

    const vc = await VerifiableCredential.create({
      type: 'Web5QuickstartCompletionCredential',
      issuer: aliceDid,
      subject: aliceDid,
      data: new Web5QuickstartCompletionCredential(
        'Alice Smith',
        '2024-05-22',
        'Beginner',
      )
    });
    // :snippet-start: signQuickstartVc
    const signedVc = await vc.sign({ did: aliceBearerDid });
    // :snippet-end:
    expect(typeof signedVc).toBe('string');
  });

  test('writeQuickstartVcToDwn writes a signed vc to dwn', async () => {
    const { did: aliceBearerDid } = await web5.agent.identity.get({ didUri: aliceDid });
    class Web5QuickstartCompletionCredential {
      constructor(name, completionDate, expertiseLevel) {
        this.name = name;
        this.completionDate = completionDate;
        this.expertiseLevel = expertiseLevel;
      }
    }

    const vc = await VerifiableCredential.create({
      type: 'Web5QuickstartCompletionCredential',
      issuer: aliceDid,
      subject: aliceDid,
      data: new Web5QuickstartCompletionCredential(
        'Alice Smith',
        '2024-05-22',
        'Beginner',
      )
    });
    const signedVc = await vc.sign({ did: aliceBearerDid });
    // :snippet-start: writeQuickstartVcToDwn
    const { record } = await web5.dwn.records.create({
      data: signedVc,
      message: {
        schema: 'Web5QuickstartCompletionCredential',
        dataFormat: 'application/vc+jwt',
        published: true
      }
    });
    // :snippet-end:
    expect(record.author).toBe(aliceDid);
  });

  test('readQuickstartVc reads jwt from DWN', async () => {
    const { did: aliceBearerDid } = await web5.agent.identity.get({ didUri: aliceDid });
    class Web5QuickstartCompletionCredential {
      constructor(name, completionDate, expertiseLevel) {
        this.name = name;
        this.completionDate = completionDate;
        this.expertiseLevel = expertiseLevel;
      }
    }

    const vc = await VerifiableCredential.create({
      type: 'Web5QuickstartCompletionCredential',
      issuer: aliceDid,
      subject: aliceDid,
      data: new Web5QuickstartCompletionCredential(
        'Alice Smith',
        '2024-05-22',
        'Beginner',
      )
    });
    const signedVc = await vc.sign({ did: aliceBearerDid });

    const { record } = await web5.dwn.records.create({
      data: signedVc,
      message: {
        schema: 'Web5QuickstartCompletionCredential',
        dataFormat: 'application/vc+jwt',
        published: true
      }
    });
    // :snippet-start: readQuickstartVc
    const readSignedVc = await record.data.text();
    // :snippet-end:
    expect(typeof readSignedVc).toBe('string');
  });

  test('parseQuickstartVc reads jwt from DWN', async () => {
    const { did: aliceBearerDid } = await web5.agent.identity.get({ didUri: aliceDid });
    class Web5QuickstartCompletionCredential {
      constructor(name, completionDate, expertiseLevel) {
        this.name = name;
        this.completionDate = completionDate;
        this.expertiseLevel = expertiseLevel;
      }
    }

    const vc = await VerifiableCredential.create({
      type: 'Web5QuickstartCompletionCredential',
      issuer: aliceDid,
      subject: aliceDid,
      data: new Web5QuickstartCompletionCredential(
        'Alice Smith',
        '2024-05-22',
        'Beginner',
      )
    });

    const signedVc = await vc.sign({ did: aliceBearerDid });

    const { record } = await web5.dwn.records.create({
      data: signedVc,
      message: {
        schema: 'Web5QuickstartCompletionCredential',
        dataFormat: 'application/vc+jwt',
        published: true
      }
    });

    const readSignedVc = await record.data.text();
    // :snippet-start: parseQuickstartVc
    const parsedVc = VerifiableCredential.parseJwt({ vcJwt: readSignedVc });
    // :snippet-end:
    expect(parsedVc.vcDataModel.issuer).toBe(aliceDid);
  });

});