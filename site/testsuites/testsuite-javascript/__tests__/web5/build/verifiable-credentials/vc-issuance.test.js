import { test, expect, describe } from 'vitest';
import { DidDhtMethod } from '@web5/dids';
import {
  createEmploymentCredential,
  signCredential,
} from '../../../../../../code-snippets/web5/build/verifiable-credentials/vc-issuance';

const issuer = await DidDhtMethod.create();
const subject = await DidDhtMethod.create();

describe('issue a credential', () => {
  test('VerifiableCredential.create() creates a VC', async () => {
    const vc = await createEmploymentCredential(issuer, subject);
    expect(vc).toBeDefined();
    expect.soft(vc).toHaveProperty('type', 'EmploymentCredential');
    expect.soft(vc).toHaveProperty('issuer', issuer.did);
    expect.soft(vc).toHaveProperty('subject', subject.did);
    expect.soft(vc.vcDataModel).toHaveProperty('id');
    expect
      .soft(vc.vcDataModel)
      .toHaveProperty('expirationDate', '2023-09-30T12:34:56Z');
    expect.soft(vc.vcDataModel.credentialSubject).toHaveProperty('id');
    expect
      .soft(vc.vcDataModel.credentialSubject)
      .toHaveProperty('position', 'Software Developer');
    expect
      .soft(vc.vcDataModel.credentialSubject)
      .toHaveProperty('startDate', '2023-04-01T12:34:56Z');
    expect
      .soft(vc.vcDataModel.credentialSubject)
      .toHaveProperty('employmentStatus', 'Contractor');
  });

  test('VerifiableCredential.sign() signs a VC', async () => {
    const vc = await createEmploymentCredential(issuer, subject);
    const vc_jwt = await signCredential(vc, issuer);
    expect(vc_jwt).toBeDefined();
    expect(vc_jwt).toMatch(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/);
  });
});
