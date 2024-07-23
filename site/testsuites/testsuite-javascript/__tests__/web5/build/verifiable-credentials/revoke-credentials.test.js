import { test, expect, describe, vi } from 'vitest';
import { VerifiableCredential, StatusListCredential, StatusPurpose  } from '@web5/credentials';
import { DidDht } from '@web5/dids';


const issuerDid = await DidDht.create({ publish: true });
const subjectDid = await DidDht.create({ publish: true });
let statusListCredential;
let credentialWithCredStatus;

describe('Revoke Credentials', () => {

  test('create credential with credentialStatus', async () => {
    // :snippet-start: createStatusListCredential
    const statusListCred = StatusListCredential.create({
      statusListCredentialId : 'https://statuslistcred.com/123',
      issuer                 : issuerDid.uri,
      statusPurpose          : 'revocation',
      credentialsToDisable   : []
    });
    // :snippet-end:

    // :snippet-start: createRevocableVerifiableCredential
    const credentialStatus = {
      id                   : 'cred-with-status-id',
      type                 : 'StatusList2021Entry',
      statusPurpose        : 'revocation',
      statusListIndex      : '94567',
      statusListCredential : 'https://statuslistcred.com/123',
    };

    const credWithCredStatus = await VerifiableCredential.create({
      type             : 'StreetCred',
      issuer           : issuerDid.uri,
      subject          : subjectDid.uri,
      data             : {
        streetCred : 'high',
        verified   : true
      },
      credentialStatus : credentialStatus
    });
    // :snippet-end:
    credentialWithCredStatus = credWithCredStatus;
    const credentialSubject = statusListCred.vcDataModel.credentialSubject;


    expect(statusListCred).not.be.undefined;
    expect(credentialSubject['type']).to.equal('StatusList2021');
    expect(credentialSubject['statusPurpose']).to.equal('revocation');
  });

  test('revoke credential', async () => {
    // :snippet-start: revokeCredential
    const credentialstoRevoke = credentialWithCredStatus
    const statusListCred = StatusListCredential.create({
        statusListCredentialId : 'https://statuslistcred.com/123',
        issuer                 : issuerDid.uri,
        statusPurpose          : StatusPurpose.revocation,
        credentialsToDisable   : [credentialstoRevoke]
    });
    // :snippet-end:
    statusListCredential = statusListCred;

    expect(statusListCred).toBeDefined();

  });

  test('check if credential is revoked.', async () => {
    // :snippet-start: checkIfCredentialIsRevoked
    const isRevoked = StatusListCredential.validateCredentialInStatusList(credentialWithCredStatus, statusListCredential);
    // :snippet-end:

    expect(isRevoked).toBe(true);
  });

});
