import { PresentationExchange } from '@web5/credentials';

export async function pex_getLoanAppPresentationDefinition() {
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
              path: ['$.credentialSubject.employmentStatus'],
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
              path: ['$.credentialSubject.dateOfBirth'],
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
              path: ['$.credentialSubject.name'],
              filter: {
                type: 'string'
              }
            }
          ]
        }
      }
    ]
  };
  return presentationDefinition;
}

export async function pex_selectCredentials(allCredentials, presentationDefinition) {
  const selectedCredentials = PresentationExchange.selectCredentials({
    vcJwts: allCredentials,
    presentationDefinition: presentationDefinition
  });
  return selectedCredentials;
}

export async function pex_checkPresentationDefinitionSatisfaction(selectedCredentials, presentationDefinition) {
  try {
    PresentationExchange.satisfiesPresentationDefinition({ 
        vcJwts: selectedCredentials, 
        presentationDefinition: presentationDefinition
    });
  } catch (err) {
    //Handle errors here
    return false;
  }
  return true;
}

export async function pex_createPresentationFromCredentials(selectedCredentials, presentationDefinition) {
  const presentationResult = PresentationExchange.createPresentationFromCredentials({
      vcJwts: selectedCredentials,
      presentationDefinition: presentationDefinition
    });
  return presentationResult;
}

export async function pex_submissionCheck(presentationResult) {
  const submissionCheck = PresentationExchange.validateSubmission({
    presentationSubmission: presentationResult.presentationSubmission
  });
  return submissionCheck;
}

export async function pex_getPresentationFromResult(presentationResult) {
  const presentation = presentationResult.presentation;
  return presentation;
}