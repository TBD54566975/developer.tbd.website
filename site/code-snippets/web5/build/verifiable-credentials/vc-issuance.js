import { VerifiableCredential } from '@web5/credentials';

/*
The output of this credential is hard-coded in the guide.
If you change any of the data below, please regenerate the 
output and paste it in the guide.
*/
export async function createEmploymentCredential(employer, employee) {
const vc = await VerifiableCredential.create({
    type: 'EmploymentCredential',
    issuer: employer.did,
    subject: employee.did,
    expirationDate: '2023-09-30T12:34:56Z',
    data: {
        "position": "Software Developer",
        "startDate": "2023-04-01T12:34:56Z",
        "employmentStatus": "Contractor"
    }
});
return vc;
}

export async function signCredential(vc, employer) {
//sign with PortableDid
const vc_jwt_employment = await vc.sign({ did: employer });
return vc_jwt_employment;
}
