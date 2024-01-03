import { test, expect, describe } from 'vitest';
import { DidDhtMethod } from '@web5/dids';
import {
    createEmploymentCredential,
    signCredential
} from '../../../../code-snippets/web5/build/verifiable-credentials/vc-issuance';

const issuerDid = await DidDhtMethod.create();
const subjectDid = await DidDhtMethod.create();

describe('issue a credential', () => {

    test('VerifiableCredential.create() creates a VC', async () => {
      const vc = await createEmploymentCredential(issuerDid.did, subjectDid.did);
      expect(vc).toBeDefined();
      expect.soft(vc).toHaveProperty('type', 'EmploymentCredential');
      expect.soft(vc).toHaveProperty('issuer', issuerDid.did);
      expect.soft(vc).toHaveProperty('subject', subjectDid.did);
      expect.soft(vc.vcDataModel).toHaveProperty('id');
      expect.soft(vc.vcDataModel).toHaveProperty('expirationDate', '2023-09-30T12:34:56Z');
      expect.soft(vc.vcDataModel.credentialSubject).toHaveProperty('id');
      expect.soft(vc.vcDataModel.credentialSubject).toHaveProperty('position', 'Software Developer');
      expect.soft(vc.vcDataModel.credentialSubject).toHaveProperty('startDate', '2023-04-01T12:34:56Z');
      expect.soft(vc.vcDataModel.credentialSubject).toHaveProperty('employmentStatus', 'Contractor');
    });

    test('VerifiableCredential.sign() signs a VC', async () => {
        const vc = await createEmploymentCredential(issuerDid.did, subjectDid.did);
        const vc_jwt = await signCredential(vc, issuerDid);
        expect(vc_jwt).toBeDefined();
        expect(vc_jwt).toMatch(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/);
    });
});
  