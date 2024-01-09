import { beforeAll, test, describe, expect } from 'vitest';
import { VerifiableCredential } from '@web5/credentials';
import { DidKeyMethod, utils as didUtils } from '@web5/dids';
import { Ed25519 } from '@web5/crypto';

import {
  selectCredentials,
  checkPresentationDefinitionSatisfaction,
  createPresentation,
  submissionCheck,
} from '../../../../code-snippets/web5/build/verifiable-credentials/presentation-exchange';

async function createVc() {
  const nameandDobDid = await DidKeyMethod.create();
  const employmentDid = await DidKeyMethod.create();
  const aliceDid = await DidKeyMethod.create();

  class NameAndDob {
    constructor(name, dob) {
      this.name = name;
      this.dob = dob;
    }
  }

  class EmploymentCredential {
    constructor(employmentStatus) {
      this.employmentStatus = employmentStatus;
    }
  }

  const namesAndDobVc = await VerifiableCredential.create({
    type: 'nameAndDob',
    issuer: nameandDobDid.did,
    subject: aliceDid.did,
    data: new NameAndDob('ebony', '2025-11-11'),
  });

  const employmentVc = await VerifiableCredential.create({
    type: 'EmploymentCredential',
    issuer: employmentDid.did,
    subject: aliceDid.did,
    data: new EmploymentCredential('employed'),
  });

  const nameAndDobSignOptions = {
    issuerDid: nameandDobDid.did,
    subjectDid: aliceDid.did,
    kid: `${nameandDobDid.did}#${nameandDobDid.did.split(':')[2]}`,
    signer: async (data) =>
      await Ed25519.sign({
        data,
        key: aliceDid.keySet.verificationMethodKeys[0].privateKeyJwk,
      }),
  };

  const employmentSignOptions = {
    issuerDid: employmentDid.did,
    subjectDid: aliceDid.did,
    kid: `${employmentDid.did}#${employmentDid.did.split(':')[2]}`,
    signer: async (data) =>
      await Ed25519.sign({
        data,
        key: aliceDid.keySet.verificationMethodKeys[0].privateKeyJwk,
      }),
  };

  const nameAndDobVcJwt = await namesAndDobVc.sign(nameAndDobSignOptions);
  const employmentVcJwt = await employmentVc.sign(employmentSignOptions);

  return {
    nameAndDobVcJwt,
    employmentVcJwt,
  };
}

let signedEmploymentVcJwt;
let signedNameandDobVcJwt;

beforeAll(() => {
  const { nameAndDobVcJwt, employmentvcJwt } = createVc();
  signedEmploymentVcJwt = employmentvcJwt;
  signedNameandDobVcJwt = nameAndDobVcJwt;
});

describe('Presentation Exchange Process', () => {
  test('selectCredentials() selects appropriate VCs', async () => {
    const selectedCredentials = await selectCredentials();
    expect(selectedCredentials).toBeDefined();
    expect(selectedCredentials).toBeInstanceOf(Array);
    expect(selectedCredentials.length).toBe(2);
  });

  test('satisfiesPresentationDefinition() checks if VCs meet criteria', async () => {
    const isSatisfied = await checkPresentationDefinitionSatisfaction();
    expect(isSatisfied).toBe(true);
  });

  test('createPresentationFromCredentials() creates a presentation', async () => {
    const presentationResult = await createPresentation();
    expect(presentationResult).toBeDefined();
    expect(presentationResult).toHaveProperty('presentation');
    expect(presentationResult.presentation).toHaveProperty(
      'presentation_submission',
    );
    expect(presentationResult.presentation).toHaveProperty(
      'verifiableCredential',
    );
    expect(presentationResult.presentation.type).toContain(
      'VerifiablePresentation',
    );
  });

  test('validateSubmission() checks if the presentation submission is valid', async () => {
    const validationResult = await submissionCheck();
    expect(validationResult).toBeDefined();
    expect(validationResult).toBeInstanceOf(Array);
    expect(validationResult.length).toBeGreaterThan(0);

    const firstResult = validationResult[0];
    console.log('this is it:', firstResult);
    expect(firstResult).toHaveProperty('tag', 'root');
    expect(firstResult).toHaveProperty('status', 'info');
    expect(firstResult).toHaveProperty('message', 'ok');
  });
});
