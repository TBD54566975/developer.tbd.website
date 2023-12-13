import { VerifiableCredential, PresentationExchange } from '@web5/credentials';
import { DidKeyMethod, utils as didUtils } from '@web5/dids';
import { Ed25519 } from '@web5/crypto';
import { Web5 } from '@web5/api';

// From: https://developer.tbd.website/docs/web5/quickstart
import { webcrypto } from 'node:crypto';
if (!globalThis.crypto) globalThis.crypto = webcrypto;

const issuerDid = await DidKeyMethod.create();
const subjectDid = await DidKeyMethod.create();

class TeacherCredentialData {
    constructor(teacherName, teacherEmail, title) {
      this.teacherName = teacherName;
      this.teacherEmail = teacherEmail;
      this.title = title;
    }
  }

const teacherData = new TeacherCredentialData(
    "Sally Smith",
    "SmithSmith@Gmail.com",
    "Instructor"
);

console.log("Teacher Data:", teacherData);
const teacherCredential = VerifiableCredential.create({
    type: "TeacherCredential",
    issuer: issuerDid.did,
    subject: subjectDid.did,
    data: teacherData,
});

console.log("Unsigned VC: \n " + teacherCredential.toString() + "\n");

const { privateKeyJwk } = issuerDid.keySet.verificationMethodKeys[0];

// Sign the VC
const signOptions = {
    issuerDid: issuerDid.did,
    subjectDid: subjectDid.did,
    kid: `${issuerDid.did}#${issuerDid.did.split(":")[2]}`,
    signer: async (data) => await Ed25519.sign({ data, key: privateKeyJwk }),
};

const signedVcJwt = await teacherCredential.sign(signOptions);
console.log("\nSigned VC: \n" + signedVcJwt + "\n");

// Verify
try {
    await VerifiableCredential.verify(signedVcJwt);
    console.log("\nVC Verification successful!\n");
} catch (err) {
    console.log("\nVC Verification failed: " + err.message + "\n");
}