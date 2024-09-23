import { test, expect, describe, vi } from 'vitest';
import { VerifiableCredential, PresentationExchange, VerifiablePresentation } from '@web5/credentials';
import { DidDht } from '@web5/dids';

const expectedVerificationResults = [
  {
    "jwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1wbG95bWVudENyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDpiNzJmNTM5Zi1mZjcyLTRhNDYtYmIyOS1iYWI4ZGVjYjMxZTYiLCJpc3N1ZXIiOiJkaWQ6ZGh0OmJvNGRtYXdlNGI2ajFyN203cGZ5bmVoYmg2bzViemE4aTgxZTVmOWVxbXI0YWdmb3lyeW8iLCJpc3N1YW5jZURhdGUiOiIyMDI0LTA3LTEwVDE4OjQ4OjIyWiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmRodDpqeWtjNzFvZzMzbWdlejR0eGZwajk4aXpwY205eXN5dTMxcjVoZDQ2YmVmN2I5NHpoaGR5IiwiZW1wbG95bWVudFN0YXR1cyI6ImVtcGxveWVkIn19LCJuYmYiOjE3MjA2MzczMDIsImp0aSI6InVybjp1dWlkOmI3MmY1MzlmLWZmNzItNGE0Ni1iYjI5LWJhYjhkZWNiMzFlNiIsImlzcyI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byIsInN1YiI6ImRpZDpkaHQ6anlrYzcxb2czM21nZXo0dHhmcGo5OGl6cGNtOXlzeXUzMXI1aGQ0NmJlZjdiOTR6aGhkeSIsImlhdCI6MTcyMDYzNzMwMn0.sE1JKPNeONA4eSGEl_xzyiqZHuHaXtJ4LRqppNPmLJbJdxzD3FnajQAd8Co1lCoHkD_LoQxdkqfPTY5Os1rdCQ","isValid":true,
    "error":null
  },
  {
    "jwt":"eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUElJQ3JlZGVudGlhbCJdLCJpZCI6InVybjp1dWlkOjBiMjAxMTA1LWQyZGUtNDhiYi04ZjVjLTUwZGEwNmZmZjc2NSIsImlzc3VlciI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byIsImlzc3VhbmNlRGF0ZSI6IjIwMjQtMDctMTBUMTg6NDg6MjJaIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6ZGh0Omp5a2M3MW9nMzNtZ2V6NHR4ZnBqOThpenBjbTl5c3l1MzFyNWhkNDZiZWY3Yjk0emhoZHkiLCJuYW1lIjoiQWxpY2UgU21pdGgiLCJkYXRlT2ZCaXJ0aCI6IjEyLzIxLzIwMDEifX0sIm5iZiI6MTcyMDYzNzMwMiwianRpIjoidXJuOnV1aWQ6MGIyMDExMDUtZDJkZS00OGJiLThmNWMtNTBkYTA2ZmZmNzY1IiwiaXNzIjoiZGlkOmRodDpibzRkbWF3ZTRiNmoxcjdtN3BmeW5laGJoNm81YnphOGk4MWU1ZjllcW1yNGFnZm95cnlvIiwic3ViIjoiZGlkOmRodDpqeWtjNzFvZzMzbWdlejR0eGZwajk4aXpwY205eXN5dTMxcjVoZDQ2YmVmN2I5NHpoaGR5IiwiaWF0IjoxNzIwNjM3MzAyfQ.y2h7DH3EiwDBgh6RE9ICRbyJ1JWHN3jeiEF_zmgh4sTKON756-9Dx1GpOmt5eOgBze_anWdgYUg13ol72f2WDg",
    "isValid":true,
    "error":null
  }
];

const expectedEvaluationResults = {
  areRequiredCredentialsPresent: 'info',
  verifiableCredential: [
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1wbG95bWVudENyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDpiNzJmNTM5Zi1mZjcyLTRhNDYtYmIyOS1iYWI4ZGVjYjMxZTYiLCJpc3N1ZXIiOiJkaWQ6ZGh0OmJvNGRtYXdlNGI2ajFyN203cGZ5bmVoYmg2bzViemE4aTgxZTVmOWVxbXI0YWdmb3lyeW8iLCJpc3N1YW5jZURhdGUiOiIyMDI0LTA3LTEwVDE4OjQ4OjIyWiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmRodDpqeWtjNzFvZzMzbWdlejR0eGZwajk4aXpwY205eXN5dTMxcjVoZDQ2YmVmN2I5NHpoaGR5IiwiZW1wbG95bWVudFN0YXR1cyI6ImVtcGxveWVkIn19LCJuYmYiOjE3MjA2MzczMDIsImp0aSI6InVybjp1dWlkOmI3MmY1MzlmLWZmNzItNGE0Ni1iYjI5LWJhYjhkZWNiMzFlNiIsImlzcyI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byIsInN1YiI6ImRpZDpkaHQ6anlrYzcxb2czM21nZXo0dHhmcGo5OGl6cGNtOXlzeXUzMXI1aGQ0NmJlZjdiOTR6aGhkeSIsImlhdCI6MTcyMDYzNzMwMn0.sE1JKPNeONA4eSGEl_xzyiqZHuHaXtJ4LRqppNPmLJbJdxzD3FnajQAd8Co1lCoHkD_LoQxdkqfPTY5Os1rdCQ',
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUElJQ3JlZGVudGlhbCJdLCJpZCI6InVybjp1dWlkOjBiMjAxMTA1LWQyZGUtNDhiYi04ZjVjLTUwZGEwNmZmZjc2NSIsImlzc3VlciI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byIsImlzc3VhbmNlRGF0ZSI6IjIwMjQtMDctMTBUMTg6NDg6MjJaIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6ZGh0Omp5a2M3MW9nMzNtZ2V6NHR4ZnBqOThpenBjbTl5c3l1MzFyNWhkNDZiZWY3Yjk0emhoZHkiLCJuYW1lIjoiQWxpY2UgU21pdGgiLCJkYXRlT2ZCaXJ0aCI6IjEyLzIxLzIwMDEifX0sIm5iZiI6MTcyMDYzNzMwMiwianRpIjoidXJuOnV1aWQ6MGIyMDExMDUtZDJkZS00OGJiLThmNWMtNTBkYTA2ZmZmNzY1IiwiaXNzIjoiZGlkOmRodDpibzRkbWF3ZTRiNmoxcjdtN3BmeW5laGJoNm81YnphOGk4MWU1ZjllcW1yNGFnZm95cnlvIiwic3ViIjoiZGlkOmRodDpqeWtjNzFvZzMzbWdlejR0eGZwajk4aXpwY205eXN5dTMxcjVoZDQ2YmVmN2I5NHpoaGR5IiwiaWF0IjoxNzIwNjM3MzAyfQ.y2h7DH3EiwDBgh6RE9ICRbyJ1JWHN3jeiEF_zmgh4sTKON756-9Dx1GpOmt5eOgBze_anWdgYUg13ol72f2WDg',
  ],
  warnings: [],
  errors: [],
  value: {
    id: 'bPLV_jMdN5XJengbX4M-l',
    definition_id: 'presDefIdloanAppVerification123',
    descriptor_map: [
      {
        id: 'employmentVerification',
        format: 'jwt_vc',
        path: '$.verifiableCredential[0]',
      },
      {
        id: 'dobVerification',
        format: 'jwt_vc',
        path: '$.verifiableCredential[1]',
      },
      {
        id: 'nameVerification',
        format: 'jwt_vc',
        path: '$.verifiableCredential[1]',
      },
    ],
  },
};

const presentationDefinition = {
  'id': 'presDefIdloanAppVerification123',
  'name': 'Loan Application Employment Verification',
  'purpose': 'To verify applicant’s employment, date of birth, and name',
  'input_descriptors': [
    // Employment Verification
    {
      'id': 'employmentVerification',
      'purpose': 'Confirm current employment status',
      'constraints': {
        'fields': [
          {
            'path': ['$.vc.credentialSubject.employmentStatus'],
            'filter': {
              'type': 'string',
              'pattern': 'employed'
            }
          }
        ]
      }
    },
    // Date of Birth Verification
    {
      'id': 'dobVerification',
      'purpose': 'Confirm the applicant’s date of birth',
      'constraints': {
        'fields': [
          {
            'path': ['$.vc.credentialSubject.dateOfBirth'],
            'filter': {
              'type': 'string',
              'format': 'date'
            }
          }
        ]
      }
    },
    // Name Verification
    {
      'id': 'nameVerification',
      'purpose': 'Confirm the applicant’s legal name',
      'constraints': {
        'fields': [
          {
            'path': ['$.vc.credentialSubject.name'],
            'filter': {
              'type': 'string'
            }
          }
        ]
      }
    }
  ]
};

const presentationResult = {
  "presentation": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://identity.foundation/presentation-exchange/submission/v1"
    ],
    "type": [
      "VerifiablePresentation",
      "PresentationSubmission"
    ],
    "presentation_submission": {
      "id": "bPLV_jMdN5XJengbX4M-l",
      "definition_id": "presDefIdloanAppVerification123",
      "descriptor_map": [
        {
          "id": "employmentVerification",
          "format": "jwt_vc",
          "path": "$.verifiableCredential[0]"
        },
        {
          "id": "dobVerification",
          "format": "jwt_vc",
          "path": "$.verifiableCredential[1]"
        },
        {
          "id": "nameVerification",
          "format": "jwt_vc",
          "path": "$.verifiableCredential[1]"
        }
      ]
    },
    "verifiableCredential": [
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1wbG95bWVudENyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDpiNzJmNTM5Zi1mZjcyLTRhNDYtYmIyOS1iYWI4ZGVjYjMxZTYiLCJpc3N1ZXIiOiJkaWQ6ZGh0OmJvNGRtYXdlNGI2ajFyN203cGZ5bmVoYmg2bzViemE4aTgxZTVmOWVxbXI0YWdmb3lyeW8iLCJpc3N1YW5jZURhdGUiOiIyMDI0LTA3LTEwVDE4OjQ4OjIyWiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmRodDpqeWtjNzFvZzMzbWdlejR0eGZwajk4aXpwY205eXN5dTMxcjVoZDQ2YmVmN2I5NHpoaGR5IiwiZW1wbG95bWVudFN0YXR1cyI6ImVtcGxveWVkIn19LCJuYmYiOjE3MjA2MzczMDIsImp0aSI6InVybjp1dWlkOmI3MmY1MzlmLWZmNzItNGE0Ni1iYjI5LWJhYjhkZWNiMzFlNiIsImlzcyI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byIsInN1YiI6ImRpZDpkaHQ6anlrYzcxb2czM21nZXo0dHhmcGo5OGl6cGNtOXlzeXUzMXI1aGQ0NmJlZjdiOTR6aGhkeSIsImlhdCI6MTcyMDYzNzMwMn0.sE1JKPNeONA4eSGEl_xzyiqZHuHaXtJ4LRqppNPmLJbJdxzD3FnajQAd8Co1lCoHkD_LoQxdkqfPTY5Os1rdCQ',
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUElJQ3JlZGVudGlhbCJdLCJpZCI6InVybjp1dWlkOjBiMjAxMTA1LWQyZGUtNDhiYi04ZjVjLTUwZGEwNmZmZjc2NSIsImlzc3VlciI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byIsImlzc3VhbmNlRGF0ZSI6IjIwMjQtMDctMTBUMTg6NDg6MjJaIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6ZGh0Omp5a2M3MW9nMzNtZ2V6NHR4ZnBqOThpenBjbTl5c3l1MzFyNWhkNDZiZWY3Yjk0emhoZHkiLCJuYW1lIjoiQWxpY2UgU21pdGgiLCJkYXRlT2ZCaXJ0aCI6IjEyLzIxLzIwMDEifX0sIm5iZiI6MTcyMDYzNzMwMiwianRpIjoidXJuOnV1aWQ6MGIyMDExMDUtZDJkZS00OGJiLThmNWMtNTBkYTA2ZmZmNzY1IiwiaXNzIjoiZGlkOmRodDpibzRkbWF3ZTRiNmoxcjdtN3BmeW5laGJoNm81YnphOGk4MWU1ZjllcW1yNGFnZm95cnlvIiwic3ViIjoiZGlkOmRodDpqeWtjNzFvZzMzbWdlejR0eGZwajk4aXpwY205eXN5dTMxcjVoZDQ2YmVmN2I5NHpoaGR5IiwiaWF0IjoxNzIwNjM3MzAyfQ.y2h7DH3EiwDBgh6RE9ICRbyJ1JWHN3jeiEF_zmgh4sTKON756-9Dx1GpOmt5eOgBze_anWdgYUg13ol72f2WDg'
    ]
  },
  "presentationSubmissionLocation": 1,
  "presentationSubmission": {
    "id": "bPLV_jMdN5XJengbX4M-l",
    "definition_id": "presDefIdloanAppVerification123",
    "descriptor_map": [
      {
        "id": "employmentVerification",
        "format": "jwt_vc",
        "path": "$.verifiableCredential[0]"
      },
      {
        "id": "dobVerification",
        "format": "jwt_vc",
        "path": "$.verifiableCredential[1]"
      },
      {
        "id": "nameVerification",
        "format": "jwt_vc",
        "path": "$.verifiableCredential[1]"
      }
    ]
  }
};


describe('verify presentation of credentials', () => {
  test('verifyVCs verifies a verifiable credential', async () => {
    // :snippet-start: verifyVcs
    //highlight-next-line
    const vcJwtArray = presentationResult.presentation.verifiableCredential;
    const verificationResults = [];
    let errorsFound = false;

    for (let vcJwt of vcJwtArray) {
      try {
        //highlight-next-line
        await VerifiableCredential.verify({ vcJwt: vcJwt });

        // No error thrown, verification successful
        verificationResults.push({
          jwt: vcJwt,
          isValid: true,
          error: null
        });
      } catch (error) {
        errorsFound = true;
        verificationResults.push({
          jwt: vcJwt,
          isValid: false,
          error: error.message
        });
      }
    }
    // :snippet-end:

    // :snippet-start: errorsFound
    if (errorsFound) {
      verificationResults.forEach(result => {
        if (!result.isValid) {
          console.error(`Verification Error: ${result.error} for JWT ${result.jwt}`);
        }
      });
    }
    else {
      //no errors are found. continue processing
    }
    // :snippet-end:
    expect(verificationResults).toEqual(expectedVerificationResults);
  });

  test('verifyVpJs signs and verifies a verifiable presenation', async () => {
    const vcJwt1 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1wbG95bWVudENyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDpiNzJmNTM5Zi1mZjcyLTRhNDYtYmIyOS1iYWI4ZGVjYjMxZTYiLCJpc3N1ZXIiOiJkaWQ6ZGh0OmJvNGRtYXdlNGI2ajFyN203cGZ5bmVoYmg2bzViemE4aTgxZTVmOWVxbXI0YWdmb3lyeW8iLCJpc3N1YW5jZURhdGUiOiIyMDI0LTA3LTEwVDE4OjQ4OjIyWiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmRodDpqeWtjNzFvZzMzbWdlejR0eGZwajk4aXpwY205eXN5dTMxcjVoZDQ2YmVmN2I5NHpoaGR5IiwiZW1wbG95bWVudFN0YXR1cyI6ImVtcGxveWVkIn19LCJuYmYiOjE3MjA2MzczMDIsImp0aSI6InVybjp1dWlkOmI3MmY1MzlmLWZmNzItNGE0Ni1iYjI5LWJhYjhkZWNiMzFlNiIsImlzcyI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byIsInN1YiI6ImRpZDpkaHQ6anlrYzcxb2czM21nZXo0dHhmcGo5OGl6cGNtOXlzeXUzMXI1aGQ0NmJlZjdiOTR6aGhkeSIsImlhdCI6MTcyMDYzNzMwMn0.sE1JKPNeONA4eSGEl_xzyiqZHuHaXtJ4LRqppNPmLJbJdxzD3FnajQAd8Co1lCoHkD_LoQxdkqfPTY5Os1rdCQ'
    const vcJwt2 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUElJQ3JlZGVudGlhbCJdLCJpZCI6InVybjp1dWlkOjBiMjAxMTA1LWQyZGUtNDhiYi04ZjVjLTUwZGEwNmZmZjc2NSIsImlzc3VlciI6ImRpZDpkaHQ6Ym80ZG1hd2U0YjZqMXI3bTdwZnluZWhiaDZvNWJ6YThpODFlNWY5ZXFtcjRhZ2ZveXJ5byIsImlzc3VhbmNlRGF0ZSI6IjIwMjQtMDctMTBUMTg6NDg6MjJaIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6ZGh0Omp5a2M3MW9nMzNtZ2V6NHR4ZnBqOThpenBjbTl5c3l1MzFyNWhkNDZiZWY3Yjk0emhoZHkiLCJuYW1lIjoiQWxpY2UgU21pdGgiLCJkYXRlT2ZCaXJ0aCI6IjEyLzIxLzIwMDEifX0sIm5iZiI6MTcyMDYzNzMwMiwianRpIjoidXJuOnV1aWQ6MGIyMDExMDUtZDJkZS00OGJiLThmNWMtNTBkYTA2ZmZmNzY1IiwiaXNzIjoiZGlkOmRodDpibzRkbWF3ZTRiNmoxcjdtN3BmeW5laGJoNm81YnphOGk4MWU1ZjllcW1yNGFnZm95cnlvIiwic3ViIjoiZGlkOmRodDpqeWtjNzFvZzMzbWdlejR0eGZwajk4aXpwY205eXN5dTMxcjVoZDQ2YmVmN2I5NHpoaGR5IiwiaWF0IjoxNzIwNjM3MzAyfQ.y2h7DH3EiwDBgh6RE9ICRbyJ1JWHN3jeiEF_zmgh4sTKON756-9Dx1GpOmt5eOgBze_anWdgYUg13ol72f2WDg'

    const holderDid = await DidDht.create();

    const vp = await VerifiablePresentation.create({
      holder: holderDid.uri,
      vcJwts: [vcJwt1, vcJwt2],
      additionalData: { presentationResult }
    });

    const logSpy = vi.spyOn(console, 'log');
    const vpJwt = await vp.sign({ did: holderDid });
    // :snippet-start: verifyVpJs
    try {
      await VerifiablePresentation.verify({ vpJwt: vpJwt });
    } catch (err) {
      console.log('\nVP Verification failed: ' + err.message + '\n');
    }

    // :snippet-end:
    expect(logSpy).not.toHaveBeenCalled();
    logSpy.mockRestore();

  });

  test('PresentationExchange.evaluatePresentation() evaluates presentation against definition', async () => {
    // :snippet-start: evaluatePresentation
    const evaluationResults = PresentationExchange.evaluatePresentation({
      presentationDefinition: presentationDefinition,
      presentation: presentationResult.presentation
    });
    // :snippet-end:
    expect(evaluationResults).toEqual(expectedEvaluationResults);

  });

});