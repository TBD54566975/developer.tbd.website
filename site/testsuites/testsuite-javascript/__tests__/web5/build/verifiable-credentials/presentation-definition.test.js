import { test, expect, describe } from 'vitest';
import { PresentationExchange } from '@web5/credentials';

const pd = {
  id: 'PD_JobApplication_123456',
  name: 'Credentials Verification for Ethical Hacker Job Application',
  purpose:
    "To verify the applicant's employment history, and either their academic degree or Certified Ethical Hacker certification",
  input_descriptors: [
    {
      id: 'employmentHistoryVerification',
      name: 'Employment History',
      purpose: "Verify the applicant's previous employment experiences",
      constraints: {
        fields: [
          {
            path: ['$.type[*]'],
            filter: {
              type: 'string',
              pattern: 'Employment',
            },
          },
        ],
      },
    },
    {
      id: 'degreeVerification',
      name: 'Degree',
      purpose: "Confirm the applicant's academic qualification",
      constraints: {
        fields: [
          {
            path: ['$.credentialSubject.degree.type'],
            filter: {
              type: 'string',
              pattern: '(Engineering|Computer|Cyber|Security)',
            },
          },
        ],
      },
    },
    {
      id: 'CEH_CertificationVerification',
      name: 'Certified Ethical Hacker Certification',
      purpose: 'Confirm the applicant holds a Certified Ethical Hacker certification',
      constraints: {
        fields: [
          {
            path: ['$.credentialSubject.certifications[*].name'],
            filter: {
              type: 'string',
              pattern: 'Certified Ethical Hacker',
            },
          },
          {
            path: ['$.issuer'],
            filter: {
              type: 'string',
              const: 'did:example:123456789abcdefghi',
            },
          },
        ],
      },
    },
  ],
};

describe('VC presentation definitions', () => {
  test('validate presentation definition', async () => {
    // :snippet-start: validatePresentationDefinition
    const validation = PresentationExchange.validateDefinition({
      presentationDefinition: pd,
    });
    // :snippet-end:

    expect(Array.isArray(validation)).toBe(true);
    expect.soft(validation[0]).toHaveProperty('status', 'info');
    expect.soft(validation[0]).toHaveProperty('message', 'ok');
  });
});
