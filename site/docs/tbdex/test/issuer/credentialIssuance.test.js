import { describe, test, expect } from 'vitest';
import express from 'express';
import { Jwt, VerifiableCredential } from '@web5/credentials';
import { DidDht } from '@web5/dids';

const issuerDid = await DidDht.create({
  options: { publish: true },
});

const signerDid = await DidDht.create({
  options: { publish: true },
});

// :snippet-start: sanctionsCredentialClass
class SanctionsCredential {
  constructor(check) {
    this.listsCleared = check.listsCleared;
  }
}

export default SanctionsCredential;
// :snippet-end:

// :snippet-start: checkSanctionsListsFunction
function checkSanctionsList(payload) {
  // This is where you would add the functionality to perform the actual sanction checks
  return {
    isSanctioned: false,
    listsCleared: ["FBI's Most Wanted, USA Watchlist", 'EU Watchlist'],
  };
}
// :snippet-end:

// :snippet-start: createADidWithServiceEndpointJS
const issuerBearerDid = await DidDht.create({
  options: {
    publish: true,
    services: [
      {
        id: 'idv',
        type: 'IDV',
        serviceEndpoint: 'https://exampleIdvEndpoint.com/idv/siopv2/initiate',
      },
    ],
  },
});
// :snippet-end:

const app = express();
app.use(express.json());

// :snippet-start: checkSanctionsEndpoint
app.get('/check-sanctions', async (req, res) => {
  /***********************************************
   * Accepts a JWT in the Authorization header
   * and parse to get the signer DID
   ************************************************/
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({
        errors: ['Authorization header required'],
      });
    }

    const tokenParts = authHeader.split('Bearer ');

    if (tokenParts.length !== 2) {
      return res.status(401).json({
        errors: ['Authorization header format is Bearer <token>'],
      });
    }

    const compactJwt = tokenParts[1];

    let subject, payload;

    try {
      const verificationResult = await Jwt.verify({ jwt: compactJwt });
      subject = verificationResult.payload.sub;
      payload = verificationResult.payload;
    } catch (error) {
      return res.status(401).json({
        errors: ['Invalid token'],
      });
    }

    /***********************************************
     * Perform the sanctions check and get the result
     ************************************************/
    const sanctionsListResult = checkSanctionsList(payload);

    if (!sanctionsListResult || sanctionsListResult.isSanctioned) {
      return res.status(403).json({
        errors: ['User is not eligible for a credential due to sanctions'],
      });
    }

    /***********************************************
     * Create credential
     ************************************************/
    const sanctions_credential = await VerifiableCredential.create({
      type: 'SanctionsCredential',
      issuer: issuerDid.uri,
      subject: subject,
      data: new SanctionsCredential(sanctionsListResult),
    });

    /***********************************************
     * To secure the VC, you must sign it
     ************************************************/
    const credential_token = await sanctions_credential.sign({
      did: issuerDid,
    });

    return res.status(200).json({ credential: credential_token });
  } catch (error) {
    // Generic error handling
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

describe('Sanctions Credential Issuance', () => {
  const sanctionsListResult = {
    listsCleared: ["FBI's Most Wanted, USA Watchlist", 'EU Watchlist'],
  };

  test('Jwt.verify() works with a valid JWT', async () => {
    const validJwt =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3djSmkzeVVONDJFZ1N2cmNHRlFyQzRKY1pkenlWWkhQOVdmMXFRZWRuVlRQI3o2TWt3Y0ppM3lVTjQyRWdTdnJjR0ZRckM0SmNaZHp5VlpIUDlXZjFxUWVkblZUUCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSWRlbnRpZmljYXRpb25DcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6MDQ3ZTg0ZWItY2NhMS00NjFlLWFjZjAtMGMyZGE5ZDczOTNhIiwiaXNzdWVyIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJpc3N1YW5jZURhdGUiOiIyMDI0LTAyLTE1VDE5OjMyOjE2WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJuYW1lIjoiam9obiJ9fSwiaXNzIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJzdWIiOiJkaWQ6a2V5Ono2TWt3Y0ppM3lVTjQyRWdTdnJjR0ZRckM0SmNaZHp5VlpIUDlXZjFxUWVkblZUUCJ9.7oFAPckx-vxCbbzKSk9bU7eXlnjBFvMborl9woHCbcvWaLt0LvTRuDfvGDPC24V9D1K5OFpTnnBiN5jtIOmbBg';
    const verificationResult = await Jwt.verify({ jwt: validJwt });

    expect(verificationResult).toHaveProperty('header');
    expect(verificationResult).toHaveProperty('payload');
    expect(verificationResult.payload).toHaveProperty('iss');
    expect(verificationResult.payload).toHaveProperty('sub');
  });

  test('add service endpoint to existing DID document', async () => {
    // :snippet-start: updateADidWithServiceEndpointJS
    issuerBearerDid.document.service.push({
      id: 'idv',
      type: 'IDV',
      serviceEndpoint: 'https://exampleIdvEndpoint.com/idv/siopv2/initiate',
    });
    
    const updatedDidDocument = await DidDht.publish({ did: issuerBearerDid });
    // :snippet-end:

    expect(updatedDidDocument.didDocument).toHaveProperty('service');
    expect(updatedDidDocument.didDocument.service.some(service => service.id === 'idv')).toBeTruthy();
  });

  test('.create() creates a credential with expected fields', async () => {
    const createdCredential = await VerifiableCredential.create({
      type: 'SanctionsCredential',
      issuer: issuerDid.uri,
      subject: signerDid.uri,
      data: new SanctionsCredential(sanctionsListResult),
    });

    expect(createdCredential).toHaveProperty('type');
    expect(createdCredential).toHaveProperty('issuer', issuerDid.uri);
  });

  test('.sign() method signs the credential and includes expected fields', async () => {
    const sanctionsCredential = await VerifiableCredential.create({
      type: 'SanctionsCredential',
      issuer: issuerDid.uri,
      subject: signerDid.uri,
      data: new SanctionsCredential(sanctionsListResult),
    });

    const signedCredential = await sanctionsCredential.sign({
      did: issuerDid,
    });

    expect(typeof signedCredential).toBe('string');
    expect(signedCredential).not.toBe('');
  });
});
