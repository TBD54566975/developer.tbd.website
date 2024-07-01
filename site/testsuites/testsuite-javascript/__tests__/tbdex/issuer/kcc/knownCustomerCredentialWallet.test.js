import { describe, test, expect, vi, beforeEach } from 'vitest';
// :prepend-start: knownCustomerCredentialhandleSiopRequestWalletJS
import { Jwt, PresentationExchange } from '@web5/credentials';
// :prepend-end:
import { DidJwk } from '@web5/dids';
// :prepend-start: knownCustomerCredentialResolveIssuerDidJS
import { resolveDid } from '@tbdex/protocol'
// :prepend-end:

const issuerBearerDid = await DidJwk.create();
const issuerDidUri = issuerBearerDid.uri;
const customerBearerDid = await DidJwk.create();

describe('Presentation Exchange Process', () => {
  const nameCredentialJwt =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSURDYXJkQ3JlZGVudGlhbFBhcnQxIl0sImlkIjoidXJuOnV1aWQ6NTdhNWU4ZWUtYmZlMC00YjQwLWJmMDAtZTA4MTY5ZDk5Y2Q1IiwiaXNzdWVyIjoiZGlkOmRodDpmYzZyNmJnNjl0Nms4dTl1OXN1NTNhYWY2anUxeGRwd2R6dXcza2p1OHNzYW1iM3Bwc3VvIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMy0yMVQyMToyMTo1MVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byIsImdpdmVuX25hbWUiOiJBbGljZSIsImZhbWlseV9uYW1lIjoiU21pdGgifX0sImlzcyI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byIsInN1YiI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byJ9.kt0rKEgZ1_U4eTUNDgUU9LzmFViHsx_1z6llfFAqCdpzwIsKKYbqfbtgckJDsoV9xqgG5TYAVPxeLo5hCAguDA';
  const idCredentialJwt =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSURDYXJkQ3JlZGVudGlhbFBhcnQyIl0sImlkIjoidXJuOnV1aWQ6YTM5ZmQ3NjgtNjVjMy00MDZhLWIwMGItMTg1MjIxM2ExYzhjIiwiaXNzdWVyIjoiZGlkOmRodDpmYzZyNmJnNjl0Nms4dTl1OXN1NTNhYWY2anUxeGRwd2R6dXcza2p1OHNzYW1iM3Bwc3VvIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMy0yMVQyMToyMTo1MVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byIsImJpcnRoZGF0ZSI6IjE5OTAtMDEtMDEiLCJuYXRpb25hbF9pZGVudGlmaWVyIjoiMTIzLTQ1LTY3ODkifX0sImlzcyI6ImRpZDpkaHQ6ZmM2cjZiZzY5dDZrOHU5dTlzdTUzYWFmNmp1MXhkcHdkenV3M2tqdThzc2FtYjNwcHN1byIsInN1YiI6ImRpZDpkaHQ6ejU0Z3U0NnU5Y2VxYjQ4dzM0dGVvNGdxMzR3Z2FvNHJvNzVjd3VyZTk1YWNlNXNpOGR0byJ9.lQOBdE3LGQ_rLz69SQoI_auOsFpsOESBIbHNf9HpYTGYTT2aYw8WrKd1rXQuRqzgELcv92iWQRpWoVm193x3CQ';
  const credentials = [nameCredentialJwt, idCredentialJwt];
  const presentation_definition = {
    id: 'IDCardCredentials',
    input_descriptors: [
      // Given Name Verification
      {
        id: 'givenNameVerification',
        purpose: 'We need to verify your given name.',
        constraints: {
          fields: [
            {
              path: [
                '$.credentialSubject.given_name',
                '$.vc.credentialSubject.given_name',
              ],
              filter: {
                type: 'string',
              },
            },
          ],
        },
      },
      // Family Name Verification
      {
        id: 'familyNameVerification',
        purpose: 'We need to verify your family name.',
        constraints: {
          fields: [
            {
              path: [
                '$.credentialSubject.family_name',
                '$.vc.credentialSubject.family_name',
              ],
              filter: {
                type: 'string',
              },
            },
          ],
        },
      },
      // Birthdate Verification
      {
        id: 'birthdateVerification',
        purpose: 'We need to verify your birthdate.',
        constraints: {
          fields: [
            {
              path: [
                '$.credentialSubject.birthdate',
                '$.vc.credentialSubject.birthdate',
              ],
              filter: {
                type: 'string',
                format: 'date',
              },
            },
          ],
        },
      },
      // National Identifier Verification
      {
        id: 'nationalIdentifierVerification',
        purpose: 'We need to verify your national identifier.',
        constraints: {
          fields: [
            {
              path: [
                '$.credentialSubject.national_identifier',
                '$.vc.credentialSubject.national_identifier',
              ],
              filter: {
                type: 'string',
              },
            },
          ],
        },
      },
    ],
  };

  test('presentation exchange selects, satisfies and creates VP', async () => {
    const allCredentials = credentials;
    const selectedCredentials = PresentationExchange.selectCredentials({
      vcJwts: allCredentials,
      presentationDefinition: presentation_definition,
    });

    PresentationExchange.satisfiesPresentationDefinition({
      vcJwts: selectedCredentials,
      presentationDefinition: presentation_definition,
    });

    const vp = PresentationExchange.createPresentationFromCredentials({
      vcJwts: selectedCredentials,
      presentationDefinition: presentation_definition,
    });

    expect(selectedCredentials).toBeDefined();
    expect(selectedCredentials).toBeInstanceOf(Array);
    expect.soft(selectedCredentials.length).toBe(2);
    expect(vp).toBeDefined();
    expect(vp).toHaveProperty('presentation');
    expect(vp.presentation).toHaveProperty('presentation_submission');
    expect(vp.presentation).toHaveProperty('verifiableCredential');
    expect(vp.presentation.type).toContain('VerifiablePresentation');
  });

  test('Jwt.sign() works with a bearer DID & valid payload', async () => {
    const accessTokenPayload = {
      sub: customerBearerDid.uri,
      iss: issuerBearerDid.uri,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400,
    };
    const accessToken = await Jwt.sign({
      signerDid: issuerBearerDid,
      payload: accessTokenPayload,
    });

    expect(typeof accessToken).toBe('string');
    expect(accessToken).not.toBe('');
  });
});

// :snippet-start: knownCustomerCredentialResolveIssuerDidJS
async function resolveIssuerDid(issuerDidUri) {
  try {
    /****************************************
     * Resolve DID & Get IDV Service Endpoint
     ****************************************/
    const didDocument = await resolveDid(issuerDidUri)
    const idvService = didDocument.service.find(
      (service) => service.type === 'IDV',
    );

    if (idvService) {
      return idvService.serviceEndpoint;
    } else {
      throw new Error('IDV service not found in DID Document');
    }
  } catch (error) {
    throw new Error(`Error resolving DID: ${error.message}`);
  }
}
// :snippet-end:

// :snippet-start: knownCustomerCredentialSendRequestToIdvServiceEndpointJS
async function sendRequestToIdvServiceEndpoint(idvServiceEndpoint) {
  try {
    const response = await fetch(idvServiceEndpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const encodedSiopRequest = await response.text();
    handleSiopRequest(encodedSiopRequest); // function shown in next step
  } catch (error) {
    throw new Error(
      `There was a problem with the fetch operation: ${error.message}`,
    );
  }
}
// :snippet-end:

// :snippet-start: knownCustomerCredentialhandleSiopRequestWalletJS
async function handleSiopRequest(encodedSiopRequest) {
  /*************************************************************
   * Decode the SIOP request JAR from the encoded URL parameters
   *************************************************************/
  const params = new URLSearchParams(encodedSiopRequest);
  const jwtRequest = params.get('request');

  if (!jwtRequest) {
    throw new Error('No JWT found in SIOP Request');
  }

  let decodedSiopRequest;
  try {
    decodedSiopRequest = await Jwt.verify({ jwt: jwtRequest });
  } catch (error) {
    throw new Error(`Error decoding SIOP Request JWT: ${error.message}`);
  }

  // Extract the payload from the verified JWT
  const siopRequest = decodedSiopRequest.payload.request;

  /*******************************************************
   * Generate & sign id_token
   *******************************************************/
  const idTokenPayload = {
    iss: customerBearerDid.uri, // user's DID string
    sub: customerBearerDid.uri,
    aud: siopRequest.client_id,
    nonce: siopRequest.nonce,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expiration time
    iat: Math.floor(Date.now() / 1000), // Issued at time
  };

  const idToken = await Jwt.sign({
    signerDid: customerBearerDid,
    payload: idTokenPayload,
  });

  let vpToken;
  if (siopRequest.response_type.includes('vp_token')) {
    try {
      /*******************************************************
       * Select Credentials based on the Presentation Definition
       *******************************************************/
      const selectedCredentials = await PresentationExchange.selectCredentials({
        vcJwts: userVcJwts, // Array of VC JWTs stored in the user's Wallet
        presentationDefinition: siopRequest.presentation_definition,
      });

      PresentationExchange.satisfiesPresentationDefinition({
        vcJwts: selectedCredentials,
        presentationDefinition: siopRequest.presentation_definition,
      });

      /*******************************************************
       * Generate & sign vp_token
       *******************************************************/
      const vp = await PresentationExchange.createPresentationFromCredentials({
        vcJwts: selectedCredentials,
        presentationDefinition: siopRequest.presentation_definition,
      });

      vpToken = await Jwt.sign({ signerDid: customerBearerDid, payload: vp });
    } catch (error) {
      throw new Error(
        `Presentation Definition not satisfied: ${error.message}`,
      );
    }
  }
  /*******************************************************
   * POST SIOPv2 Authorization response to the response_uri
   *******************************************************/
  const responsePayload = {
    id_token: idToken,
    ...(vpToken && { vp_token: vpToken }),
  };

  fetch(siopRequest.response_uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(responsePayload),
  })
    .then((response) => response.json())
    .then((data) => {
      handleIssuerResponse(data); // function shown in next step
    })
    .catch((error) => {
      throw new Error(`Error sending SIOP response: ${error.message}`);
    });
}
// :snippet-end:

// :snippet-start: knownCustomerCredentialHandleIssuerResponseWalletJS
let walletStorage = {
  credentialIssuer: null,
  preAuthorizedCode: null,
  credentialEndpoint: null,
  tokenEndpoint: null,
  accessToken: null,
  cNonce: null,
};

function handleIssuerResponse(issuerResponse) {
  const { credential_issuer, grants } = issuerResponse.credential_offer;
  const preAuthorizedCode =
    grants['urn:ietf:params:oauth:grant-type:pre-authorized_code'];

  /***********************************************************************
   * Store the credential_issuer URL and pre_authorized_code for future use
   ************************************************************************/
  walletStorage.credentialIssuer = credential_issuer;
  walletStorage.preAuthorizedCode = preAuthorizedCode;

  if (issuerResponse.url) {
    // Direct the user to this URL to complete their Identity Verification
    openIdvForm(issuerResponse.url);
  } else {
    fetchIssuerMetadata(); // function shown in next step
  }
}
// :snippet-end:

// :snippet-start: knownCustomerCredentialFetchIssuerMetadataWalletJS
function fetchIssuerMetadata() {
  /*****************************
   * Fetch the Issuer's metadata
   *****************************/
  const issuerMetadataUrl = `${walletStorage.credentialIssuer}/.well-known/openid-credential-issuer`;
  fetch(issuerMetadataUrl)
    .then((response) => response.json())
    .then((issuerMetadata) => {
      /**********************************************
       * Store the credential endpoint for future use
       **********************************************/
      walletStorage.credentialEndpoint = issuerMetadata.credential_endpoint;
      fetchAuthServerMetadata(); // function shown in next step
    })
    .catch((error) => {
      console.error(`Error in fetching issuer metadata: ${error.message}`);
    });
}
// :snippet-end:

// :snippet-start: knownCustomerCredentialFetchAuthServerMetadataWalletJS
function fetchAuthServerMetadata() {
  /*******************************************
   * Fetch the authorization server's metadata
   *******************************************/
  const authServerMetadataUrl = `${walletStorage.credentialIssuer}/.well-known/oauth-authorization-server`;
  fetch(authServerMetadataUrl)
    .then((response) => response.json())
    .then((authServerMetadata) => {
      /****************************************************
       * Extract and store the token_endpoint for future use
       *****************************************************/
      walletStorage.tokenEndpoint = authServerMetadata.token_endpoint;
      fetchAccessToken(
        walletStorage.preAuthorizedCode,
        walletStorage.tokenEndpoint,
      ); // function shown in next step
    })
    .catch((error) => {
      console.error(
        `Error in fetching authorization server metadata: ${error.message}`,
      );
    });
}
// :snippet-end:

// :snippet-start: knownCustomerCredentialFetchAccessTokenWalletJS
function fetchAccessToken(
  preAuthorizationCode,
  tokenEndpoint,
  retryDelay = 10000,
) {
  const requestBody = {
    grant_type: 'urn:ietf:params:oauth:grant-type:pre-authorized_code',
    code: preAuthorizationCode,
    client_id: customerBearerDid.uri, // user's did string
  };

  /*********************************************
   * Send the POST request to the token endpoint
   **********************************************/
  fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      /*******************************************
       * Handle the "authorization_pending" error
       ********************************************/
      if (data.error === 'authorization_pending') {
        displayNotification(
          "Hang tight, we're still waiting for IDV to complete.",
        );

        setTimeout(() => {
          fetchAccessToken(preAuthorizationCode, tokenEndpoint, retryDelay);
        }, retryDelay);
        /*************************************************
         * Store the access token & c_nonce for future use
         **************************************************/
      } else if (data.access_token) {
        walletStorage.accessToken = data.access_token;
        walletStorage.cNonce = data.c_nonce;
        if (walletStorage.credentialEndpoint) {
          requestKnownCustomerCredential(
            walletStorage.credentialEndpoint,
            walletStorage.accessToken,
          ); // function shown in next step
        } else {
          console.error('Credential endpoint is missing in walletStorage.');
        }
      } else {
        throw new Error('Access token not found in the response');
      }
    })
    .catch((error) => {
      throw new Error(`Error fetching access token: ${error.message} `);
    });
}
// :snippet-end:

// :snippet-start: knownCustomerCredentialRequestCredentialWalletJS
function requestKnownCustomerCredential(credentialEndpoint, accessToken) {
  if (!walletStorage.cNonce) {
    throw new Error('cNonce is missing in Wallet storage');
  }
  /*************************************************
   * Construct & sign the JWT payload
   **************************************************/
  const jwtPayload = {
    iss: customerBearerDid.uri, // user's DID string
    aud: issuerDidUri, // Issuer's DID string
    iat: Math.floor(Date.now() / 1000),
    nonce: walletStorage.cNonce,
  };

  Jwt.sign({ signerDid: customerBearerDid, payload: jwtPayload })
    .then((signedJwt) => {
      const requestBody = {
        proof: {
          proof_type: 'jwt',
          jwt: signedJwt,
        },
      };
      /*************************************************
       * Request & securely store KCC
       **************************************************/

      fetch(credentialEndpoint, {
        method: 'POST',
        headers: {
          // Include the access token in the Authorization header
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`,
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data.credential) {
            secureStorage.setItem('signedCredential', data.credential);
          } else {
            throw new Error('Signed credential not found in the response');
          }
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      throw new Error(`Error signing JWT: ${error.message}`);
    });
}
// :snippet-end:
