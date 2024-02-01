import { test, expect, describe } from 'vitest';
import { validatePresentationDefinition } from '../../../../../../code-snippets/web5/build/verifiable-credentials/presentation-definition';

const pd = {
  id: 'PD_JobApplication_123456',
  name: 'Credentials Verification for Ethical Hacker Job Application',
  purpose:
    "To verify the applicant's employment history, and either their academic degree or Certified Ethical Hacker certification",
  submission_requirements: [
    {
      name: 'Employment and Academic/Certification Requirement',
      purpose:
        "Verify the applicant's employment history, and at least one of academic qualification or professional certification",
      rule: 'pick',
      min: 2,
      from_nested: [
        { rule: 'pick', min: 1, from: 'A' },
        { rule: 'pick', min: 1, from: 'B' },
      ],
    },
  ],
  input_descriptors: [
    {
      id: 'employmentHistoryVerification',
      name: 'Employment History',
      purpose: "Verify the applicant's previous employment experiences",
      group: ['A'],
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
      group: ['B'],
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
      purpose:
        'Confirm the applicant holds a Certified Ethical Hacker certification',
      group: ['B'],
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
    const valResult = await validatePresentationDefinition(pd);
    expect(Array.isArray(valResult)).toBe(true);
    expect.soft(valResult[0]).toHaveProperty('status', 'info');
    expect.soft(valResult[0]).toHaveProperty('message', 'ok');
  });
});
