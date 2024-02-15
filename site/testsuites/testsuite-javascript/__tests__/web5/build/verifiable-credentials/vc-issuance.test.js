import { test, expect, describe } from 'vitest';
import { DidDhtMethod } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials';
import {
  signCredential,
} from '../../../../../../code-snippets/web5/build/verifiable-credentials/vc-issuance';

const employer = await DidDhtMethod.create();
const employee = await DidDhtMethod.create();

describe('issue a credential', () => {
  test('createEmploymentCredential creates a VC and signEmploymentCredential returns a jwt', async () => {
    // :snippet-start: createEmploymentCredential
    const vc = await VerifiableCredential.create({
      type: 'EmploymentCredential',
      issuer: employer.did,
      subject: employee.did,
      expirationDate: '2023-09-30T12:34:56Z',
      data: {
        "position": "Software Developer",
        "startDate": "2023-04-01T12:34:56Z",
        "employmentStatus": "Contractor"
      }
    });
    // :snippet-end:

    // :snippet-start: signEmploymentCredential
    const vc_jwt_employment = await vc.sign({ did: employer });
    // :snippet-end:

    expect(vc).toBeDefined();
    expect.soft(vc).toHaveProperty('type', 'EmploymentCredential');
    expect.soft(vc).toHaveProperty('issuer', employer.did);
    expect.soft(vc).toHaveProperty('subject', employee.did);
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

    expect(vc_jwt_employment).toBeDefined();
    expect(vc_jwt_employment).toMatch(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/);
  });
});