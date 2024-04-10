

/** This is an example of how to use the web5/credentials package:  https://www.npmjs.com/package/@web5/credentials */
import { VerifiableCredential, PresentationExchange } from '@web5/credentials';
import { DidDht } from '@web5/dids';
import { Web5 } from '@web5/api';
import { Web5UserAgent } from '@web5/user-agent';

import { webcrypto } from 'node:crypto';
if (!globalThis.crypto) globalThis.crypto = webcrypto;

/**
 * Issue and Sign Verifiable Credentials
 */

// Prerequisites: Create issuer (fan club issuer)
const fanClubIssuerDid = await DidDht.create();

// Prerequisites: Create subject (alice)
const aliceDid = await DidDht.create();

// Create new credential
class SwiftiesFanClub {
  constructor(name, legit) {
    this.name = name;
    this.legit = legit;
  }
}

// Credential needs: type, issuer, subject, data
const vc = await VerifiableCredential.create({
  type: 'SwiftiesFanClub',
  issuer: fanClubIssuerDid.uri,
  subject: aliceDid.uri,
  data: new SwiftiesFanClub('Stan', true)
});

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
const parsedVc = VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });
console.log('\nParsed VC: \n' + parsedVc.toString() + '\n');

/** 
 * Presentation Exchange 
 */

// Prerequisites: Create Presentation Definition
const presentationDefinition = {
  'id': 'presDefId123',
  'name': 'T Swift Fan Club Presentation Definition',
  'purpose': 'for getting into the fan club',
  'input_descriptors': [
    {
      'id': 'legitness',
      'purpose': 'are you legit or not?',
      'constraints': {
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
  PresentationExchange.satisfiesPresentationDefinition({ vcJwts: [signedVcJwt], presentationDefinition: presentationDefinition });
  console.log('\nVC Satisfies Presentation Definition!\n');
} catch (err) {
  console.log('VC does not satisfy Presentation Definition: ' + err.message);
}


// Create Presentation Result that contains a Verifiable Presentation and Presentation Submission
const presentationResult = PresentationExchange.createPresentationFromCredentials({ vcJwts: [signedVcJwt], presentationDefinition: presentationDefinition });
console.log('\nPresentation Result: ' + JSON.stringify(presentationResult));

/** 
 * Storing a self signed VC in a DWN
 */

// Web5 Connect
const myDid = await DidDht.create();
const userAgent = await Web5UserAgent.create();

const portableDid = await myDid.export()

// // Start the agent.
if (await userAgent.firstLaunch()) {
  // The vault has not been initialized yet.
  await userAgent.initialize({ password: 'insecure-static-phrase' });
} else {
  // The vault is already initialized, so just unlock/start it.
  await userAgent.start({ password: 'insecure-static-phrase' });
}

const portableIdentity = {
  portableDid: {
    uri: portableDid.uri,
    document: portableDid.document,
    metadata: portableDid.metadata,
    privateKeys: portableDid.privateKeys
  },
  metadata: {
    name: "Alice", 
    tenant: portableDid.uri,
    uri: portableDid.uri
  }
};


// Import the did and create an identity
const identity = await userAgent.identity.import({
  portableIdentity: portableIdentity,
});

/** Import the Identity metadata to the User Agent's tenant so that it can be restored
 * on subsequent launches or page reloads. */
const web5 = new Web5({
  agent: userAgent, 
  connectedDid: myDid.uri,
});


// Create self signed VC
class DateOfBirth {
  constructor(dob) {
    this.dob = dob;
  }
}

// Create self signed VC
const dwnVc = await VerifiableCredential.create({ type: 'DateOfBirth', issuer: myDid.uri, subject: myDid.uri, data: new DateOfBirth('1989-11-11') });
const signedDwnVc = await dwnVc.sign({ did: myDid });
console.log(signedDwnVc)

// Storing VC in DWN
const { record } = await web5.dwn.records.create({
  data: signedDwnVc,
  message: {
    schema: 'DateOfBirth',
    dataFormat: 'application/vc+jwt',
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