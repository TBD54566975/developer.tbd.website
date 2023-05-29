# SSI Console

The SSI Console leverages the SSI Service API to simplify credential issuance and verification in an easy to manage web interface.

## Core Functionality
- Create and manage Decentralized Identifiers (DIDs)
- Issue and Verify Verifiable Credentials (VCs)

## Installation
:::info
The SSI Console leverages the SSI Service which is packaged as a Docker container. Make sure you have [Docker downloaded](https://www.docker.com/products/docker-desktop/) and running on your desktop.
:::

Verify that both `docker` and `docker-compose` commands are available:
```bash
docker --version
Docker version 20.10.24, build 297e128

docker-compose --version
Docker Compose version v2.17.2
```

### 1. Clone and Run SSI Console
```bash
git clone https://github.com/TBD54566975/ssi-console.git
cd ssi-console
npm install
npm start
```

Head to `localhost:3000` and follow the guide below for all actions you can take from the homepage.

## Create a Decentralized Identifier (DID):
_To learn more about DIDs see [here](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers)._

Upon installation a DID will be created by default, but you can follow the steps below to create one for yourself.

### 1. Navigate to `localhost:3000/dids` and click `Add New`

### 2. Set DID Method:
There are three different DID methods to choose from: `Ion`, `Web`, and `Key`. The DID `Key` method is a good method for testing purposes so let's select that for now.

_To learn more about these methods click [here](https://www.w3.org/TR/did-spec-registries/#did-methods)._

### 3. Set keyType and options:
Click `Try sample input` and then submit.

_To learn more about what you can add to this JSON field see [here](https://developer.tbd.website/docs/apis/ssi-service/#tag/DecentralizedIdentityAPI/paths/~1v1~1dids~1%7Bmethod%7D/put)._

<!-- TODO:
- Refresh page and you should see your new DID listed under the `All DIDs` index. -->

## Create a Verifiable Credential (VC):
### 1. Navigate to `localhost:3000/credentials` and click `Create New`

### 2. Add name and description:
Feel free to use the default placeholders or describe your new VC.

### 3. Prep VC Schema:
- Set 'Schema' to 'New Data set'
- Click `Try sample input` and fill in the VC subject's first and last name.

_See [here](https://developer.tbd.website/docs/apis/ssi-service#tag/SchemaAPI) for an example of schema properties._

### 4. Set Presentation Definition:
Click `Try sample input` and leave the default JSON for now.

This field populates the `presentation_definition` field of the `credential_manifest`. When a subject, for example an employee, applies for this credential, they will be required to present any credentials defined in this field. Here, we are asking for a credential with the subject's `firstName` and a credential with the subject's `lastName`. The `path` field defines which path we can expect to find these values in the subject's provided credentials.

_See [here](https://developer.tbd.website/docs/apis/ssi-service#tag/PresentationDefinitionAPI/paths/~1v1~1presentations~1definitions/put) to learn more about presentation definitions._

### 5. Set issuer information:
Fill in an issuer name (company name) for the employment verification.

## Next Steps for VCs:
### Send an Application:
Share the Application URL with subjects, employees in this case, to apply for their new employment verifiable credential.

The credential applicant will need to submit a credential application as a JWT. Once they submit the JWT, the application will become available for review in the dashboard, under Credentials > Applications.

_See [here](https://developer.tbd.website/docs/apis/ssi-service/#tag/ApplicationAPI/paths/~1v1~1manifests~1applications/put) for more details on applications.

<!-- TODO: The Application URL opens up to a hardcoded KYC Credential application in the console app, Kirah going to work on. -->

### Issue a VC:
  - `Subject DID`: Add your employees DID.
  - `Subject Data`: Fill in your employees first and last name.
  - Decide whether you want this DID to be `revocable` or `suspendable`
  - Set an `expiration` date if you want it to expire.
  - `Issuer DID`: Choose one of the employers' DIDs.

## Verify a Credential:
### 1. Navigate to: `localhost:3000/verification`
### Json:
Click `Try sample input`

We use presentation definitions to create submission links, through which Holders can submit their relevant credentials for verification.

### How to create a presentation definition:
- Choose a name for your presentation definition and add it to the `Name` field
- Include the purpose of your presentation definition (it should answer: why are you requesting this credential?)
- Click `Try sample input` again and leave the default added JSON for now. It will be looking for credentials to verify the `firstName` and `lastName`.
- Choose your verifier DID from the dropdown. You can use the same ion DID youve been using.

_See [here](https://developer.tbd.website/docs/apis/ssi-service#tag/PresentationDefinitionAPI/paths/~1v1~1presentations~1definitions/put) to learn more about presentation definitions_

:::info
Verification `Applications` vs `Submissions`:

Applications: When an employee applies for a credential with your applicaton link, and you as the employeer will see that application here for the you (the employer) to approve or decline. If you approve their application you would then issue their employment credential.

Submissions: When an employer asks a job applicant to submit an education VC for example before accepting their role.
:::

## Next Steps
- Learn how to manually issue a VC [here](https://developer.tbd.website/blog/issue-verifiable-credential-manually).
- See SSI Service [API Docs](https://developer.tbd.website/docs/apis/ssi-service).

<!-- TODO ## Add more next steps -->
