import { describe, test, expect } from 'vitest';
import { Jwt, VerifiableCredential } from '@web5/credentials';
import { DidJwk } from '@web5/dids';
import express from 'express';

const issuerBearerDid = await DidJwk.create();
const customerBearerDid = await DidJwk.create();

const app = express();
app.use(express.json());

// :snippet-start: siopv2InitiateId_tokenEndpointIssuerJs
app.get('/idv/siopv2/initiate', async (req, res) => {
  const siopRequestOnlyIdToken = {
    client_id: issuerBearerDid.uri, // Issuer's Decentralized Identifier string
    scope: 'openid', // Standard OpenID Connect scope
    response_type: 'id_token', // Only requesting an ID Token
    response_uri: 'https://issuer.example.com/siopv2/response', // Endpoint for SIOP response delivery
    response_mode: 'direct_post', // Delivery method of the SIOP response
    nonce: 'n-0S6_WzA2Mj', // Unique string to link the request and response
    // Note: No presentation_definition is included, as we're not requesting a vp_token
  };

  // Sign and send the SIOPv2 Authorization Request as JAR
});
// :snippet-end:

// :snippet-start: siopv2InitiateId_tokenAndVp_tokenEndpointIssuerJs
app.get('/idv/siopv2/initiate', async (req, res) => {
  // Construct the SIOPv2 Authorization Request
  const siopRequestPayload = {
    client_id: issuerBearerDid.uri, // Issuer's Decentralized Identifier string
    scope: 'openid', // Standard OpenID Connect scope
    response_type: 'id_token vp_token', // Expected response formats: ID Token and optionally, Verifiable Presentation Token
    response_uri: 'https://issuer.example.com/siopv2/response', // Endpoint for SIOP response delivery
    response_mode: 'direct_post', // Delivery method of the SIOP response
    nonce: 'n-0S6_WzA2Mj', // Unique string to link the request and response
    client_metadata: {
      // Descriptive metadata about the requesting party (Issuer)
      subject_syntax_types_supported: 'did:dht did:jwk',
      client_name: 'Issuance Service Name',
      client_uri: 'https://issuer.example.com',
      logo_uri: 'https://issuer.example.com/logo.png',
      tos_uri: 'https://issuer.example.com/tos',
      policy_uri: 'https://issuer.example.com/privacy',
    },
    presentation_definition: {
      id: 'IDCardCredentials',
      input_descriptors: [
        {
          id: 'IDCardCredential',
          schema: {
            uri: [
              'https://www.w3.org/2018/credentials#VerifiableCredential',
              'https://www.w3.org/2018/credentials/examples/v1#IDCardCredential',
            ],
            name: 'ID Card Credential',
            purpose: 'We need to verify your identity.',
          },
          constraints: {
            fields: [
              {
                path: ['$.vc.credentialSubject.given_name'],
                purpose: 'The given name on your ID card.',
              },
              {
                path: ['$.vc.credentialSubject.family_name'],
                purpose: 'The family name on your ID card.',
              },
              {
                path: ['$.vc.credentialSubject.birthdate'],
                purpose: 'Your birth date.',
              },
              {
                path: ['$.vc.credentialSubject.national_identifier'],
                purpose: 'Your national identifier.',
              },
            ],
          },
        },
      ],
    },
  };

  // Sign and send the SIOPv2 Authorization Request as JAR
});
// :snippet-end:

// :snippet-start: encodeSiopv2AuthRequestIssuerJs
app.get('/idv/siopv2/initiate', async (req, res) => {
  // Construct the SIOPv2 Authorization Request
  const siopRequestPayload = {
    client_id: issuerBearerDid.uri, // Issuer's Decentralized Identifier string
    scope: 'openid', // Standard OpenID Connect scope
    response_type: 'id_token vp_token', // Expected response formats: ID Token and optionally, Verifiable Presentation Token
    response_uri: 'https://issuer.example.com/siopv2/response', // Endpoint for SIOP response delivery
    response_mode: 'direct_post', // Delivery method of the SIOP response
    nonce: 'n-0S6_WzA2Mj', // Unique string to link the request and response
    client_metadata: {
      // Descriptive metadata about the requesting party (Issuer)
      subject_syntax_types_supported: 'did:dht did:jwk',
      client_name: 'Issuance Service Name',
      client_uri: 'https://issuer.example.com',
      logo_uri: 'https://issuer.example.com/logo.png',
      tos_uri: 'https://issuer.example.com/tos',
      policy_uri: 'https://issuer.example.com/privacy',
    },
    presentation_definition: {
      id: 'IDCardCredentials',
      input_descriptors: [
        {
          id: 'IDCardCredential',
          schema: {
            uri: [
              'https://www.w3.org/2018/credentials#VerifiableCredential',
              'https://www.w3.org/2018/credentials/examples/v1#IDCardCredential',
            ],
            name: 'ID Card Credential',
            purpose: 'We need to verify your identity.',
          },
          constraints: {
            fields: [
              {
                path: ['$.vc.credentialSubject.given_name'],
                purpose: 'The given name on your ID card.',
              },
              {
                path: ['$.vc.credentialSubject.family_name'],
                purpose: 'The family name on your ID card.',
              },
              {
                path: ['$.vc.credentialSubject.birthdate'],
                purpose: 'Your birth date.',
              },
              {
                path: ['$.vc.credentialSubject.national_identifier'],
                purpose: 'Your national identifier.',
              },
            ],
          },
        },
      ],
    },
  };
  //highlight-start
  // Sign the SIOPv2 Auth Request
  const siopRequestJwtPayload = {
    sub: issuerBearerDid.uri, // Issuer's Decentralized Identifier string
    iss: issuerBearerDid.uri, // Issuer's Decentralized Identifier string
    iat: Math.floor(Date.now() / 1000), // Issued at
    exp: Math.floor(Date.now() / 1000) + 86400, // Expiration time
    request: siopRequestPayload, // Embed the SIOPv2 Auth request payload
  };

  try {
    const jwtToken = await Jwt.sign({
      signerDid: issuerBearerDid, 
      payload: siopRequestJwtPayload,
    });
  // Send the SIOPv2 Auth Request in JAR format 
    const queryString = `client_id=${encodeURIComponent(issuerBearerDid.uri)}&request=${encodeURIComponent(jwtToken)}`;
    res.send(queryString);
  } catch (err) {
    console.error('Error signing the SIOPv2 request:', err);
    res.status(500).send('Failed to generate JWT for SIOPv2 Authorization Request');
  }
  //highlight-end
});


// :snippet-end:

// :snippet-start: siopv2ResponseEndpointIssuerJs
import { VerifiableCredential, Jwt } from '@web5/credentials';

const preAuthCodeToDidMap = new Map();

app.post('/siopv2/response', async (req, res) => {
  const walletResponse = req.body; // The SIOPv2 Authorization Response from the Wallet

  /************************************************************
   * Extract and verify the ID Token from the Wallet's response
   *************************************************************/
  try {
    const compactIdToken = walletResponse.id_token;
    if (!compactIdToken) {
      return res.status(400).json({ message: 'Missing ID Token' });
    }
    const idTokenVerificationResult = await Jwt.verify({ jwt: compactIdToken });

    /************************************************************
     * Extract customers Did from verificationResult
     *************************************************************/
    const customersDidUri = idTokenVerificationResult.payload.sub;
    // Perform additional checks (e.g., nonce, audience, expiration)

    const preAuthCode = generateUniquePreAuthCode();
    preAuthCodeToDidMap.set(preAuthCode, customersDidUri); // needed for subsequent '/token' endpoint

    /********************************************************************
     * Define the initial structure for the Identity Verification Request
     ********************************************************************/

    let idvRequest = {
      credential_offer: {
        credential_issuer: 'https://issuer.example.com',
        credential_configuration_ids: [
          'knownCustomerCredential-basic',
          'knownCustomerCredential-extended',
        ],
        grants: {
          'urn:ietf:params:oauth:grant-type:pre-authorized_code': preAuthCode,
        },
      },
    };

    let isVPValidIDV = false;
    if (walletResponse.vp_token) {
      const compactVpToken = walletResponse.vp_token;
      const vpTokenVerificationResult = await Jwt.verify({
        jwt: compactVpToken,
      });

      isVPValidIDV = true;
    }

    /********************************************************************
     * If vp_token is not present include `url` for IDV form
     ********************************************************************/

    if (!isVPValidIDV) {
      idvRequest = {
        ...idvRequest,
        url: 'https://issuer.example.com/idv/form',
      };
    }

    res.json(credentialOffer);
  } catch (error) {
    // Handle verification errors
    return res.status(401).json({
      errors: ['Invalid token', error.message],
    });
  }
});
// :snippet-end:

// :snippet-start: wellKnownIssuerMetadataEndpointIssuerJs
app.get('/.well-known/openid-credential-issuer', (req, res) => {
  const issuerMetadata = {
    credential_issuer: 'https://issuer.example.com',
    credential_endpoint: 'https://issuer.example.com/credentials',
    credential_configurations_supported: {
      // type of credentials Issuer supports and what credential will look like
      KnownCustomerCredential: {
        format: 'jwt_vc_json',
        scope: 'CustomerIdentity',
        cryptographic_binding_methods_supported: ['did:example'],
        credential_signing_alg_values_supported: ['EdDSA', 'ES256K'],
        credential_definition: {
          type: ['VerifiableCredential'],
          credentialSubject: {
            country: {
              display: [{ name: 'Country', locale: 'en-US' }],
            },
          },
        },
        proof_types_supported: {
          jwt: {
            proof_signing_alg_values_supported: ['EdDSA', 'ES256K'],
          },
        },
        display: [
          {
            name: 'Known Customer Credential',
            locale: 'en-US',
            logo: {
              url: 'https://issuer.example.com/public/logo.png',
              alt_text: 'Issuer Logo',
            },
            background_color: '#FFFFFF',
            text_color: '#000000',
          },
        ],
      },
    },
  };

  res.json(issuerMetadata);
});
// :snippet-end:

// :snippet-start: wellKnownAuthorizationServerEndpointIssuerJs
app.get('/.well-known/oauth-authorization-server', (req, res) => {
  const oauthAuthorizationServerMetadata = {
    issuer: 'https://issuer.example.com', // URL of the Credential Issuer
    token_endpoint: 'https://issuer.example.com/token', // URL for the Access Token Request
  };

  res.json(oauthAuthorizationServerMetadata);
});
// :snippet-end:

// :snippet-start: accessTokenEndpointIssuerJs
import { VerifiableCredential, Jwt } from '@web5/credentials';

const accessTokenToCNonceMap = new Map();

app.post('/token', async (req, res) => {
  const { grant_type, code } = req.body;

  if (grant_type !== 'urn:ietf:params:oauth:grant-type:pre-authorized_code') {
    return res.status(400).json({ error: 'unsupported_grant_type' });
  }

  const customersDidUri = preAuthCodeToDidMap.get(code);
  if (!customersDidUri) {
    return res.status(400).json({ error: 'invalid_grant' });
  }

  // Check the status of the IDV
  const idvCompleted = checkIDVStatus(customersDidUri);
  if (!idvCompleted) {
    return res.status(400).json({ error: 'authorization_pending' });
  }

  /********************************************
   * Create the payload for the access token
   ********************************************/
  const accessTokenPayload = {
    sub: customersDidUri, // Customer's Decentralized Identifier string
    iss: issuerBearerDid.uri, // Issuer's Decentralized Identifier string
    iat: Math.floor(Date.now() / 1000), // Issued at
    exp: Math.floor(Date.now() / 1000) + 86400, // Expiration time
  };
  /********************************************
   * sign accessToken and generate a c_nonce
   ********************************************/
  try {
    const accessToken = await Jwt.sign({
      signerDid: issuerBearerDid,
      payload: accessTokenPayload,
    });

    const cNonce = generateCNonce();
    accessTokenToCNonceMap.set(accessToken, cNonce);

    preAuthCodeToDidMap.delete(code);

    res.json({
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: 86400, // Token expiration time
      c_nonce: cNonce, // Challenge nonce to be signed
      c_nonce_expires_in: 86400, // cNonce expiration time
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'internal_server_error', message: error.message });
  }
});
// :snippet-end:

// :snippet-start: KnownCustomerCredentialsClass
class KccCredential {
  constructor(country, tier, jurisdiction, credentialSchema, evidence) {
    this.data = {
      countryOfResidence: country,
      tier: tier, // optional
      jurisdiction: jurisdiction // optional
    };
    this.credentialSchema = credentialSchema;
    this.evidence = evidence; // optional
  }
}

export default KccCredential;
// :snippet-end:

// :snippet-start: knownCustomerCredentialEndpointIssuerJs
app.post('/credentials', async (req, res) => {
  try {
    /*****************************************************************
     * Extract and validate the access token from Authorization header
     ******************************************************************/
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res
        .status(401)
        .json({ errors: ['Authorization header required'] });
    }

    const tokenParts = authHeader.split('Bearer ');
    if (tokenParts.length !== 2) {
      return res
        .status(401)
        .json({ errors: ['Authorization header format is Bearer <token>'] });
    }

    const accessToken = tokenParts[1];
    const storedCNonce = accessTokenToCNonceMap.get(accessToken);
    if (!storedCNonce) {
      return res
        .status(401)
        .json({ errors: ['Invalid or expired access token'] });
    }

    /**************************************************************
     * Extract and validate the JWT and nonce from the proof object
     **************************************************************/
    const { proof } = req.body;
    if (!proof || proof.proof_type !== 'jwt' || !proof.jwt) {
      return res.status(400).json({ errors: ['Invalid proof provided'] });
    }

    let customersDidUri, payload;

    try {
      const verificationResult = await Jwt.verify({ jwt: proof.jwt });
      customersDidUri = verificationResult.payload.iss; // Customer's Decentralized Identifier string
      if (storedCNonce === payload.nonce) {
        accessTokenToCNonceMap.delete(accessToken);
      } else {
        return res.status(401).json({ errors: ['Invalid nonce in proof'] });
      }
    } catch (error) {
      return res.status(401).json({ errors: ['Invalid JWT in proof'] });
    }

    /***********************************************
     * Create and sign the credential
     ************************************************/
    const kccCredentialInstance = new KccCredential('US', 'Gold', {
      country: "US" 
      },
      {
        id: "https://vc.schemas.host/kcc.schema.json",
        type: "JsonSchema"
      },
      [
        {
          kind: 'document_verification',
          checks: ['passport', 'utility_bill'],
        },
        {
          kind: 'sanction_screening',
          checks: ['PEP'],
        },
      ]
    );

    const known_customer_credential = await VerifiableCredential.create({
      issuer: issuerBearerDid.uri, // Issuer's Decentralized Identifier string
      subject: customersDidUri, // Customer's Decentralized Identifier string from the verified JWT
      expirationDate: '2026-05-19T08:02:04Z',
      data: {
        countryOfResidence: kccCredentialInstance.data.countryOfResidence,
        tier: kccCredentialInstance.data.tier, // optional
        jurisdiction: kccCredentialInstance.data.jurisdiction // optional
      },
      credentialSchema: kccCredentialInstance.credentialSchema,
      evidence: kccCredentialInstance.evidence, // optional
    });

    const credential_token = await known_customer_credential.sign({
      did: issuerBearerDid, // Signing with the issuer's bearer DID
    });
    /***********************************************
     * Respond with the signed credential
     ************************************************/
    return res.status(200).json({ credential: credential_token });
  } catch (error) {
    /***********************************************
     * Generic error handling
     ************************************************/
    return res.status(500).json({
      errors: [`An unexpected error occurred: ${error.message}`],
    });
  }
});
// :snippet-end:

/* 
Have to add tests separately because the big snippet is
contained within the express app and the objects within
are outside of the function's scope to be tested 
*/

describe('Known Customer Credental Issuer Flow', () => {
  test('Jwt.verify() works with a valid JWT', async () => {
    const validJwt =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3djSmkzeVVONDJFZ1N2cmNHRlFyQzRKY1pkenlWWkhQOVdmMXFRZWRuVlRQI3o2TWt3Y0ppM3lVTjQyRWdTdnJjR0ZRckM0SmNaZHp5VlpIUDlXZjFxUWVkblZUUCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSWRlbnRpZmljYXRpb25DcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6MDQ3ZTg0ZWItY2NhMS00NjFlLWFjZjAtMGMyZGE5ZDczOTNhIiwiaXNzdWVyIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJpc3N1YW5jZURhdGUiOiIyMDI0LTAyLTE1VDE5OjMyOjE2WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJuYW1lIjoiam9obiJ9fSwiaXNzIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJzdWIiOiJkaWQ6a2V5Ono2TWt3Y0ppM3lVTjQyRWdTdnJjR0ZRckM0SmNaZHp5VlpIUDlXZjFxUWVkblZUUCJ9.7oFAPckx-vxCbbzKSk9bU7eXlnjBFvMborl9woHCbcvWaLt0LvTRuDfvGDPC24V9D1K5OFpTnnBiN5jtIOmbBg';
    const verificationResult = await Jwt.verify({ jwt: validJwt });

    expect(verificationResult).toHaveProperty('header');
    expect(verificationResult).toHaveProperty('payload');
    expect(verificationResult.payload).toHaveProperty('iss');
    expect(verificationResult.payload).toHaveProperty('sub');
  });

  test('Jwt.sign() works with a valid payload & bearer DID', async () => {
    const accessTokenPayload = {
        "client_id": "did:web:192.168.4.23%3A8892:ingress",
        "client_metadata": "",
        "iss": "did:web:192.168.4.23%3A8892:ingress",
        "nonce": "168e442893f72390bbe4778b94848011",
        "response_mode": "direct_post",
        "response_type": "id_token vp_token",
        "response_uri": "http://192.168.4.23:8892/ingress/kcc",
        "scope": "openid"
    };

    const accessToken = await Jwt.sign({
      signerDid: issuerBearerDid,
      payload: accessTokenPayload,
    });

    expect(typeof accessToken).toBe('string');
    expect(accessToken).not.toBe('');
  });

  test('VerifiableCredential.create() creates credential & .sign() creates JWT', async () => {
    const known_customer_credential = await VerifiableCredential.create({
      issuer: issuerBearerDid.uri,
      subject: customerBearerDid.uri,
      expirationDate: '2026-05-19T08:02:04Z',
      data: new KccCredential('US'),
    });

    const credential_token = await known_customer_credential.sign({
      did: issuerBearerDid,
    });

    expect(typeof credential_token).toBe('string');
    expect(credential_token).not.toBe('');
  });
});
