import { describe, test, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import { Jwt, VerifiableCredential } from '@web5/credentials';

const app = express();
app.use(express.json());

// :snippet-start: sanctionsCredentialClass
class SanctionsCredential {
  constructor(check) {
    this.listsCleared = check.listsCleared;
  }
}

export default SanctionsCredential;
// :snippet-end:

const issuerDid = {
  did: 'did:key:z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs',
  document: {
    'id': 'did:key:z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs',
    'verificationMethod': [
      {
        id: 'did:key:z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs#z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs',
        type: 'JsonWebKey2020',
        controller: 'did:key:z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs',
        publicKeyJwk: {
          alg: 'EdDSA',
          crv: 'Ed25519',
          kty: 'OKP',
          x: 'Hgw0rAhANmxjM6YLzhwN87hHM7PM0HUsMAUulE2W634',
        },
      },
    ],
    'authentication': [
      'did:key:z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs#z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs',
    ],
    'assertionMethod': [
      'did:key:z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs#z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs',
    ],
    'capabilityInvocation': [
      'did:key:z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs#z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs',
    ],
    'capabilityDelegation': [
      'did:key:z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs#z6MkgUZ55uLZGb4qcCLfZaJwCTXUxhxFJtKwkTaimigbaSqs',
    ],
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/jws-2020/v1',
    ],
  },
  keySet: {
    verificationMethodKeys: [
      {
        publicKeyJwk: {
          alg: 'EdDSA',
          crv: 'Ed25519',
          kty: 'OKP',
          ext: 'true',
          key_ops: ['verify'],
          x: 'Hgw0rAhANmxjM6YLzhwN87hHM7PM0HUsMAUulE2W634',
        },
        privateKeyJwk: {
          d: 'xEv-wUYjDOi-SahxPCoKyuh8aqTiV6CtEgUfHg3ys2Y',
          alg: 'EdDSA',
          crv: 'Ed25519',
          kty: 'OKP',
          ext: 'true',
          key_ops: ['sign'],
          x: 'Hgw0rAhANmxjM6YLzhwN87hHM7PM0HUsMAUulE2W634',
        },
        relationships: ['authentication'],
      },
    ],
  },
};

const signerDid = 'did:key:z6MkwcJi3yUN42EgSvrcGFQrC4JcZdzyVZHP9Wf1qQednVTP';

// :snippet-start: checkSacntionsListsFunction
function checkSanctionsList(payload) {
  // this is where you would add all the functionality to
  // actually perform these sanction checks
  return {
    isSanctioned: false,
    listsCleared: ["FBI's Most Wanted, USA Watchlist", 'EU Watchlist'],
  };
}
// :snippet-end:

// :snippet-start: checkSanctionsEndpoint
app.get('/check-sanctions', async (req, res) => {
  try {
    //  Intake user data or send back any responses/redirects requesting more info
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

    let signer, payload;
    try {
      const verificationResult = await Jwt.verify({ jwt: compactJwt });

      // Assuming the user signed the JWT, this is their DID
      signer = verificationResult.payload.sub;
      payload = verificationResult.payload;
    } catch (error) {
      return res.status(401).json({
        errors: ['Invalid token'],
      });
    }

    // Perform the sanctions check and get the result
    const sanctionsListResult = checkSanctionsList(payload);
    //:snippet-end:

    //:snippet-start: createVerifiableCredentialWithSanctionsListResult
    // Check if the sanctions list result is valid for credential creation
    if (!sanctionsListResult || sanctionsListResult.isSanctioned) {
      return res.status(403).json({
        errors: ['User is not eligible for a credential due to sanctions'],
      });
    }
    //highlight-start
    const sanctions_credential = await VerifiableCredential.create({
      type: 'SanctionsCredential',
      issuer: issuerDid.did,
      subject: signer,
      data: new SanctionsCredential(sanctionsListResult),
    });
    //highlight-end
    //:snippet-end:

    // :snippet-start: signCreatedSanctionsCredential
    //highlight-start
    // Sign the credential
    const credential_token = await sanctions_credential.sign({
      did: issuerDid,
    });
    //highlight-end

    return res.status(200).json({ credential: credential_token });
  } catch (error) {
    // Generic error handling
    return res.status(500).json({
      errors: [`An unexpected error occurred: ${error.message}`],
    });
  }
});
// :snippet-end:

describe('Direct method functionality tests', () => {
  test('Jwt.verify works with a valid JWT', async () => {
    const validJwt =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3djSmkzeVVONDJFZ1N2cmNHRlFyQzRKY1pkenlWWkhQOVdmMXFRZWRuVlRQI3o2TWt3Y0ppM3lVTjQyRWdTdnJjR0ZRckM0SmNaZHp5VlpIUDlXZjFxUWVkblZUUCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSWRlbnRpZmljYXRpb25DcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6MDQ3ZTg0ZWItY2NhMS00NjFlLWFjZjAtMGMyZGE5ZDczOTNhIiwiaXNzdWVyIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJpc3N1YW5jZURhdGUiOiIyMDI0LTAyLTE1VDE5OjMyOjE2WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJuYW1lIjoiam9obiJ9fSwiaXNzIjoiZGlkOmtleTp6Nk1rd2NKaTN5VU40MkVnU3ZyY0dGUXJDNEpjWmR6eVZaSFA5V2YxcVFlZG5WVFAiLCJzdWIiOiJkaWQ6a2V5Ono2TWt3Y0ppM3lVTjQyRWdTdnJjR0ZRckM0SmNaZHp5VlpIUDlXZjFxUWVkblZUUCJ9.7oFAPckx-vxCbbzKSk9bU7eXlnjBFvMborl9woHCbcvWaLt0LvTRuDfvGDPC24V9D1K5OFpTnnBiN5jtIOmbBg';
    const verificationResult = await Jwt.verify({ jwt: validJwt });

    expect(verificationResult).toHaveProperty('header');
    expect(verificationResult).toHaveProperty('payload');
    expect(verificationResult.payload).toHaveProperty('iss');
    expect(verificationResult.payload).toHaveProperty('sub');
  });

  test('.create() creates a credential with expected fields', async () => {
    const sanctionsListResult = {
      listsCleared: ["FBI's Most Wanted, USA Watchlist", 'EU Watchlist'],
    };

    const createdCredential = await VerifiableCredential.create({
      type: 'SanctionsCredential',
      issuer: issuerDid.did,
      subject: signerDid,
      data: new SanctionsCredential(sanctionsListResult),
    });

    expect(createdCredential).toHaveProperty('type');
    expect(createdCredential).toHaveProperty('issuer', issuerDid.did);
  });

  test('.sign() method signs the credential and includes expected fields', async () => {
    const sanctionsListResult = {
      listsCleared: ["FBI's Most Wanted, USA Watchlist", 'EU Watchlist'],
    };
    const sanctionsCredential = await VerifiableCredential.create({
      type: 'SanctionsCredential',
      issuer: issuerDid.did,
      subject: signerDid,
      data: new SanctionsCredential(sanctionsListResult),
    });

    const signedCredential = await sanctionsCredential.sign({ did: issuerDid });

    expect(typeof signedCredential).toBe('string');
    expect(signedCredential).not.toBe('');
  });
});
