import { test, expect, describe, it } from 'vitest';
// :prepend-start: createStatusListCredentialJs
import { VerifiableCredential, StatusListCredential, StatusPurpose } from '@web5/credentials';
// :prepend-end:
import { DidDht } from '@web5/dids';


const issuerDid = await DidDht.create({ publish: true });
const subjectDid = await DidDht.create({ publish: true });
const subjectDidUri = subjectDid.uri;
let statusListCredential;
let revocableVC;

describe('Revoke Credentials', () => {

  it('create Status List Credential', async () => {
    // :snippet-start: createStatusListCredentialJs
    statusListCredential = StatusListCredential.create({
      statusListCredentialId : 'https://example.com/credentials/status/1',
      issuer                 : issuerDid.uri,
      statusPurpose          : StatusPurpose.revocation,
      credentialsToDisable   : []
    });
    // :snippet-end:

    expect(statusListCredential).toBeDefined();

    const credentialSubject = statusListCredential.vcDataModel.credentialSubject;
    expect.soft(credentialSubject.type).to.equal('StatusList2021');
    expect.soft(credentialSubject.statusPurpose).to.equal(StatusPurpose.revocation);
  });

  it('create revocable VC', async () => {
    // :snippet-start: createRevocableVerifiableCredentialJs
    revocableVC = await VerifiableCredential.create({
      type             : 'StreetCred',
      issuer           : issuerDid.uri,
      subject          : subjectDidUri,
      data             : {
        streetCred : 'high',
        legit   : true
      },

      // highlight-start
      credentialStatus : {
        id                   : 'https://example.com/credentials/status/1#94567',
        type                 : 'StatusList2021Entry',
        statusPurpose        : StatusPurpose.revocation,
        statusListIndex      : '94567',
        statusListCredential : 'https://example.com/credentials/status/1',
      }
      // highlight-end

    });
    // :snippet-end:

    const credentialStatus = revocableVC.vcDataModel.credentialStatus;
    expect(credentialStatus).toBeDefined();
    expect(credentialStatus['type']).to.equal('StatusList2021Entry');
    expect(credentialStatus['statusPurpose']).to.equal('revocation');
  });

  it('revoke credential', async () => {
    // :snippet-start: revokeCredentialJs
    statusListCredential = StatusListCredential.create({
        statusListCredentialId : 'https://example.com/credentials/status/1',
        issuer                 : issuerDid.uri,
        statusPurpose          : StatusPurpose.revocation,
        // highlight-next-line
        credentialsToDisable   : [revocableVC]
    });
    // :snippet-end:

    // :snippet-start: checkIfCredentialIsRevokedJs
    const isRevoked = StatusListCredential.validateCredentialInStatusList(
      revocableVC, statusListCredential
    );
    // :snippet-end:

    expect(isRevoked).toBe(true);
  });

});
