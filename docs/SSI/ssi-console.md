# SSI Console

The SSI Console leverages the SSI Service API to simplify credential issuance and verification in an easy to manage web interface.

## Core Functionality
- Create and Collect Decentralized Identifiers (DIDs)
- Issue and Verify Verifiable Credentials (VCs)

## Installation
:::info
The SSI Console leverages the SSI Service which is packaged as a Docker container. Make sure you have [Docker downloaded](https://www.docker.com/products/docker-desktop/) and running on your desktop.
:::

### 1. Clone and Run SSI Console
```code
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
There are three different DID methods to choose from: Ion, Web, and Key. Select 'Key' for now.

_To learn more about these methods click [here](https://www.w3.org/TR/did-spec-registries/#did-methods)._

### 3. Set keyType and Options:
Click `Try sample input` and then submit.

_To learn more about what you can add to this JSON field see here._

<!-- TODO: 
- JSON `see here` field link above needs to be added, Kirah can you help me out.
- Refresh page and you should see your new DID listed under the `All DIDs` index. -->

## Create a Verifiable Credential (VC):
### 1. Navigate to `localhost:3000/credentials` and click `Create New`

### 2. Add name and description:
Feel free to use the default placeholders or describe your new VC.

### 3. Prep VC Schema:
- Set 'Schema' to 'New Data set'
- Click 'Try sample input' and fill in the reciever of the VC's first and last name.

_See [here](https://developer.tbd.website/docs/apis/ssi-service#tag/SchemaAPI) for the fields you can add to this schema._

### 4. Set Presentation Definition / Requirements:
Click 'Try sample input' and leave the default added JSON for now.
_See [here](https://developer.tbd.website/docs/apis/ssi-service#tag/PresentationDefinitionAPI/paths/~1v1~1presentations~1definitions/put) to learn more about presentation definitions._

<!-- TODOs:
- Rename to Presentation.
- I feel weird we're telling them `try sample input` here without explaining even just a little bit before clicking them out to the API reference. Kirah can you help me out here. -->

### 5. Set issuer information:
Fill in an issuer name (company name) for the employment verification.

## Next Steps for VCs:
### Send an Application:
Share the Application URL with employees, in this case, to apply for their new employment verifiable credential.

<!-- TODOs:
- The Application URL opens up to a hardcoded KYC Credential application, we need to make dynamic.
- Can we somehow show an example of the Application URL? 
- Explain this JSON field more. Kirah can you help me out here. -->

### Issue a VC:
  - `Subject DID`: Add your employees DID.
  - `Subject Data`: Fill in your employees first and last name.
  - Decide whether you want this DID to be `revocable` or `suspendable`
  - Set an `expiration` date if you want it to expire.
  - `Issuer DID`: Chose one of the employers' DIDs.

## Verify a Credential:
### 1. Navigate to: `localhost:3000/verification`
### Json:
Click `try sample input`
_See [here](https://developer.tbd.website/docs/apis/ssi-service#tag/PresentationDefinitionAPI/paths/~1v1~1presentations~1definitions/put) for how to configure your own Json._

<!-- TODO: Explain this JSON field more. Kirah can you help me out here. -->

:::info
Verification `Applications` vs `Submissions`:
Applications: When an employee applies for a credential with your applicaton link, and you as the employeer will see that application here for the you (the employer) to approve or decline. If you approve their application you would then issue their employment credential.

Submissions: When an employer asks a job applicant to submit an education VC for example before accepting their role.
:::

<!-- TODO ## Next Steps -->