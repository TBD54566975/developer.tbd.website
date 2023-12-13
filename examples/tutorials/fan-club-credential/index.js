/** This is an example of how to use the web5/credentials package:  https://www.npmjs.com/package/@web5/credentials */
import { VerifiableCredential, PresentationExchange } from '@web5/credentials';
import { DidKeyMethod } from '@web5/dids';
import { Web5 } from '@web5/api';

import { webcrypto } from 'node:crypto';
if (!globalThis.crypto) globalThis.crypto = webcrypto;

/**
 * Issue and Sign Verifiable Credentials
 */

// Prerequisites: Create issuer (fan club issuer)
const fanClubIssuerDid = await DidKeyMethod.create();

// Prerequisites: Create subject (alice)
const aliceDid = await DidKeyMethod.create();

// Create new credential
class SwiftiesFanClub {
  constructor(level, legit) {
    this.level = level;
    this.legit = legit;
  }
}
// Credential needs: type, issuer, subject, data
const vc = await VerifiableCredential.create({ type: 'SwiftiesFanClub', issuer: fanClubIssuerDid.did, subject: aliceDid.did, data: new SwiftiesFanClub('#1 Fan', true) });
console.log('Unsigned VC: \n ' + vc.toString() + '\n');

// Sign credential
const signedVcJwt = await vc.sign({ did: fanClubIssuerDid });
console.log('\nSigned VC: \n' + signedVcJwt + '\n');

// Verify
try {
  await VerifiableCredential.verify({ vcJwt: signedVcJwt });
  console.log('\nVC Verification successful!\n');
} catch (err) {
  console.log('\nVC Verification failed: ' + err.message + '\n');
}

// Parse
const parsedVc = VerifiableCredential.parseJwt({ vcJwt: signedVcJwt} );
console.log('\nParsed VC: \n' + parsedVc.toString() + '\n');

/** 
 * Presentation Exchange 
 */

// Prerequisites: Create Presentation Definition
const presentationDefinition = {
  'id'                : 'presDefId123',
  'name'              : 'T Swift Fan Club Presentation Definition',
  'purpose'           : 'for getting into the fan club',
  'input_descriptors' : [
    {
      'id'          : 'legitness',
      'purpose'     : 'are you legit or not?',
      'constraints' : {
        'fields': [
          {
            'path': [
              '$.credentialSubject.legit',
            ]
          }
        ]
      }
    }
  ]
};

// Satisfies Presentation Definition
try {
  PresentationExchange.validateDefinition({ presentationDefinition });
  PresentationExchange.satisfiesPresentationDefinition({vcJwts: [signedVcJwt], presentationDefinition: presentationDefinition});
  console.log('\nVC Satisfies Presentation Definition!\n');
} catch (err) {
  console.log('VC does not satisfy Presentation Definition: ' + err.message);
}


// Create Presentation Result that contains a Verifiable Presentation and Presentation Submission
const presentationResult = PresentationExchange.createPresentationFromCredentials({vcJwts: [signedVcJwt], presentationDefinition: presentationDefinition });
console.log('\nPresentation Result: ' + JSON.stringify(presentationResult));

/** 
 * Storing a self signed VC in a DWN
 */

// Web5 Connect
const web5Did = await DidKeyMethod.create();
const { web5, did: myDid } = await Web5.connect({ did: web5Did.did });

class DateOfBirth {
  constructor(dob) {
    this.dob = dob;
  }
}

// Create self signed VC
const dwnVc = await VerifiableCredential.create({ type: 'DateOfBirth', issuer: web5Did.did, subject: web5Did.did, data: new DateOfBirth('1989-11-11') });
const signedDwnVc = await dwnVc.sign({ did: web5Did });

console.log(signedDwnVc)

// Storing VC in DWN
const { record } = await web5.dwn.records.create({
  data    : signedDwnVc,
  message : {
    schema     : 'DateOfBirth',
    dataFormat : 'application/vc+jwt',
  },
});

console.log('\nVC Record ID: ' + record.id + '\n');


// Reading VC from DWN
const { record: readRecord } = await web5.dwn.records.read({
  message: {
    filter: {
      recordId: record.id
    }
  }
});

const readVcJwt = await readRecord.data.text();
console.log('\nVC Record: \n' + readVcJwt + '\n');

console.log('Finished!');