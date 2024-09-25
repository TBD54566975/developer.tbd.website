import { test, describe, expect, beforeAll } from 'vitest';

import {
  pex_createPresentationFromCredentials,
  pex_getLoanAppPresentationDefinition,
} from '../../../../../../code-snippets/web5/build/verifiable-credentials/presentation-exchange';
import { PresentationExchange, VerifiablePresentation } from '@web5/credentials';
import  { DidDht } from '@web5/dids'

const pd = await pex_getLoanAppPresentationDefinition();

describe('Presentation Exchange Process', () => {
  let signedEmploymentVcJwt;
  let signedNameAndDobVcJwt;
  let credentials;
  let holderDid;
  let selectedCredentials;
  let presentationResult;
  let verifiablePresentation;

  beforeAll(async () => {

    signedEmploymentVcJwt =
      'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6NmM0ODc1aHJod3o3cDhwdXRtdDZ4b2ZodHBoZ3BjdGp6Ym5pcjFneHlhbXRuYXU5ajRjbyMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSIsImh0dHBzOi8vdzNpZC5vcmcvdmMvc3RhdHVzLWxpc3QvMjAyMS92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1wbG95bWVudENyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDo5Mzg3ZTlhNi03NGY5LTQyNTctOTNmNS05NTk4YTg4YWNmZTAiLCJpc3N1ZXIiOiJkaWQ6ZGh0OjZjNDg3NWhyaHd6N3A4cHV0bXQ2eG9maHRwaGdwY3RqemJuaXIxZ3h5YW10bmF1OWo0Y28iLCJpc3N1YW5jZURhdGUiOiIyMDI0LTA5LTIwVDE3OjU2OjM3WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmRodDpjMXlvc2czcDd4cDhrdGk3ODN5cWpwZ2Vnczg4dHFyeWhyZHJ1cHJ0dHNjYzdqa3VuYWJ5IiwiZW1wbG95bWVudFN0YXR1cyI6ImVtcGxveWVkIn0sImV4cGlyYXRpb25EYXRlIjoiMjAyNS0wOS0yMFQxNzo1NjozNy4xMTZaIn0sIm5iZiI6MTcyNjg1NDk5NywianRpIjoidXJuOnV1aWQ6OTM4N2U5YTYtNzRmOS00MjU3LTkzZjUtOTU5OGE4OGFjZmUwIiwiaXNzIjoiZGlkOmRodDo2YzQ4NzVocmh3ejdwOHB1dG10NnhvZmh0cGhncGN0anpibmlyMWd4eWFtdG5hdTlqNGNvIiwic3ViIjoiZGlkOmRodDpjMXlvc2czcDd4cDhrdGk3ODN5cWpwZ2Vnczg4dHFyeWhyZHJ1cHJ0dHNjYzdqa3VuYWJ5IiwiaWF0IjoxNzI2ODU0OTk3LCJleHAiOjE3NTgzOTA5OTd9.tviXnkmsk7ebCJOQs81HwFHqfnNKfi07OPzwTd8qgYSbGq3zUt6mCU3qQ5v0vZQ-LCHTID_-jie0qds_sYJkBA';
    signedNameAndDobVcJwt =
      'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6NmM0ODc1aHJod3o3cDhwdXRtdDZ4b2ZodHBoZ3BjdGp6Ym5pcjFneHlhbXRuYXU5ajRjbyMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSIsImh0dHBzOi8vdzNpZC5vcmcvdmMvc3RhdHVzLWxpc3QvMjAyMS92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiTmFtZUFuZERvYkNyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDo4NTA3OTg1Ni0zNDBhLTQ1YjYtYWY1NS01NTA5NDc2MjE5YWQiLCJpc3N1ZXIiOiJkaWQ6ZGh0OjZjNDg3NWhyaHd6N3A4cHV0bXQ2eG9maHRwaGdwY3RqemJuaXIxZ3h5YW10bmF1OWo0Y28iLCJpc3N1YW5jZURhdGUiOiIyMDI0LTA5LTIwVDE3OjU2OjM3WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmRodDpjMXlvc2czcDd4cDhrdGk3ODN5cWpwZ2Vnczg4dHFyeWhyZHJ1cHJ0dHNjYzdqa3VuYWJ5IiwibmFtZSI6ImFsaWNlIGJvYiIsImRhdGVPZkJpcnRoIjoiMTAtMDEtMTk5MCJ9LCJleHBpcmF0aW9uRGF0ZSI6IjIwMjUtMDktMjBUMTc6NTY6MzcuMTE2WiJ9LCJuYmYiOjE3MjY4NTQ5OTcsImp0aSI6InVybjp1dWlkOjg1MDc5ODU2LTM0MGEtNDViNi1hZjU1LTU1MDk0NzYyMTlhZCIsImlzcyI6ImRpZDpkaHQ6NmM0ODc1aHJod3o3cDhwdXRtdDZ4b2ZodHBoZ3BjdGp6Ym5pcjFneHlhbXRuYXU5ajRjbyIsInN1YiI6ImRpZDpkaHQ6YzF5b3NnM3A3eHA4a3RpNzgzeXFqcGdlZ3M4OHRxcnlocmRydXBydHRzY2M3amt1bmFieSIsImlhdCI6MTcyNjg1NDk5NywiZXhwIjoxNzU4MzkwOTk3fQ._ONzs3LXLTo4LCbsaYwQXFbBT81s5RCvM7NrfRvdpQdvPcjSN7R6jTESV6uN5Wfxbt14qJVjGOkn6bmQbqI-BQ';

    credentials = [signedEmploymentVcJwt, signedNameAndDobVcJwt];
    selectedCredentials = credentials

    holderDid = await DidDht.create();

    presentationResult = PresentationExchange.createPresentationFromCredentials({
      vcJwts: selectedCredentials,
      presentationDefinition: presentationDefinition
    });

     verifiablePresentation = await VerifiablePresentation.create({
      holder: holderDid.uri,
      vcJwts: [selectedCredentials],
      additionalData: { presentationResult }
     });
    
  });


  const presentationDefinition = {
    id: 'presDefIdloanAppVerification123',
    name: 'Loan Application Employment Verification',
    purpose: 'To verify applicant’s employment, date of birth, and name',
    input_descriptors: [
      // Employment Verification
      {
        id: 'employmentVerification',
        purpose: 'Confirm current employment status',
        constraints: {
          fields: [
            {
              path: ['$.vc.credentialSubject.employmentStatus'],
              filter: {
                type: 'string',
                pattern: 'employed',
              },
            },
          ],
        },
      },
      // Date of Birth Verification
      {
        id: 'dobVerification',
        purpose: 'Confirm the applicant’s date of birth',
        constraints: {
          fields: [
            {
              path: ['$.vc.credentialSubject.dateOfBirth'],
              filter: {
                type: 'string',
                format: 'date',
              },
            },
          ],
        },
      },
      // Name Verification
      {
        id: 'nameVerification',
        purpose: 'Confirm the applicant’s legal name',
        constraints: {
          fields: [
            {
              path: ['$.vc.credentialSubject.name'],
              filter: {
                type: 'string'
              }
            }
          ]
        }
      }
    ]
  };
  
  test('getLoanAppPresentationDefinition returns a presentation definition', async () => {
    // :snippet-start: getLoanAppPresentationDefinition
    const presentationDefinition = {
      id: 'presDefIdloanAppVerification123',
      name: 'Loan Application Employment Verification',
      purpose: 'To verify applicant’s employment, date of birth, and name',
      input_descriptors: [
        // Employment Verification
        {
          id: 'employmentVerification',
          purpose: 'Confirm current employment status',
          constraints: {
            fields: [
              {
                path: ['$.vc.credentialSubject.employmentStatus'],
                filter: {
                  type: 'string',
                  pattern: 'employed',
                },
              },
            ],
          },
        },
        // Date of Birth Verification
        {
          id: 'dobVerification',
          purpose: 'Confirm the applicant’s date of birth',
          constraints: {
            fields: [
              {
                path: ['$.vc.credentialSubject.dateOfBirth'],
                filter: {
                  type: 'string',
                  format: 'date',
                },
              },
            ],
          },
        },
        // Name Verification
        {
          id: 'nameVerification',
          purpose: 'Confirm the applicant’s legal name',
          constraints: {
            fields: [
              {
                path: ['$.vc.credentialSubject.name'],
                filter: {
                  type: 'string'
                }
              }
            ]
          }
        }
      ]
    };
    // :snippet-end:
    expect(presentationDefinition).toBeDefined();
    expect(presentationDefinition).toHaveProperty('input_descriptors');
    expect(presentationDefinition.input_descriptors).toBeInstanceOf(Array);
    expect(presentationDefinition.input_descriptors.length).toBe(3);
  });
  test('selectCredentialsForPex selects VCs that match presentation defintion', async () => {
    const allCredentials = credentials
    // :snippet-start: selectCredentialsForPex
    const selectedCredentials = PresentationExchange.selectCredentials({
      vcJwts: allCredentials,
      presentationDefinition: presentationDefinition
    });
    // :snippet-end:
    
    expect(selectedCredentials).toBeDefined();
    expect(selectedCredentials).toBeInstanceOf(Array);
    expect.soft(selectedCredentials.length).toBe(2);
    expect.soft(selectedCredentials).toContain(signedEmploymentVcJwt);
    expect.soft(selectedCredentials).toContain(signedNameAndDobVcJwt);
  });

  test('satisfiesPresentationDefinitionForPex checks if VCs satisfy PD', async () => {
    const selectedCredentials = credentials
    expect(() => {
    // :snippet-start: satisfiesPresentationDefinitionForPex
    try {
      PresentationExchange.satisfiesPresentationDefinition({
        vcJwts: selectedCredentials,
        presentationDefinition: presentationDefinition
      });
    } catch (err) {
      //Handle errors here

    }
    // :snippet-end:
    }).not.toThrow();
  });

  test('createPresentationFromCredentialsForPex creates a presentation result', async () => {
    // :snippet-start: createPresentationFromCredentialsForPex
    const presentationResult = PresentationExchange.createPresentationFromCredentials({
      vcJwts: selectedCredentials,
      presentationDefinition: presentationDefinition
    });

    const vp = await VerifiablePresentation.create({
      holder: holderDid.uri,
      vcJwts: [selectedCredentials],
      additionalData: { presentationResult }
    });
    // :snippet-end:
    expect(presentationResult).toBeDefined();
    expect.soft(presentationResult).toHaveProperty('presentation');
    expect.soft(presentationResult.presentation).toHaveProperty('presentation_submission');
    expect.soft(presentationResult.presentation).toHaveProperty('verifiableCredential');
    expect.soft(presentationResult.presentation.type).toContain('VerifiablePresentation');
    expect.soft(vp).toHaveProperty('vpDataModel')
    }
  );

  test('validPresentationSubmissionForPex check if the presention submission is valid', async () => {
    const presentationResult = await pex_createPresentationFromCredentials(credentials, pd);
    // :snippet-start: validPresentationSubmissionForPex
    const submissionCheck = PresentationExchange.validateSubmission({
      presentationSubmission: presentationResult.presentationSubmission
    });
    // :snippet-end:
    expect(submissionCheck.length).toBe(1);
    expect.soft(submissionCheck[0]).toHaveProperty('tag', 'root');
    expect.soft(submissionCheck[0]).toHaveProperty('status', 'info');
    expect.soft(submissionCheck[0]).toHaveProperty('message', 'ok');
  });

  test('validVerifiablePresentationForPex creates a valid VP', async () => {
    // :snippet-start: validVerifiablePresentationForPex
    const vpJwt = await verifiablePresentation.sign({ did: holderDid });
    // :snippet-end:
    expect.soft(typeof vpJwt).toBe('string');
  });

});