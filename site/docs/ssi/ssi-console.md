# SSI Console

The SSI Console leverages the SSI Service API to simplify credential issuance and verification in an easy to manage web interface.

![SSI Console](/img/ssi-console.png)

## Core Functionality
- Create and manage Decentralized Identifiers (DIDs)
- Issue and Verify Verifiable Credentials (VCs)

<Divider type="slash" />

## Installation
:::info
The SSI Console leverages the SSI Service which is packaged as a Docker container. Make sure you have [Docker downloaded](https://www.docker.com/products/docker-desktop/) and running on your desktop.

Alternatively, you can visit the [SSI playground](https://console.benri.io/), and skip ahead to the [next section](#create-a-decentralized-identifier-did).
:::

Verify that both `docker` and `docker-compose` commands are available:
```bash
docker --version

docker-compose --version
```

### Clone and Run SSI Console
```bash
git clone https://github.com/TBD54566975/ssi-console.git
cd ssi-console
npm install
npm start
```

Open [localhost:3000](http://localhost:3000/) in a browser and follow the guide below for all actions you can take from the homepage.

<Divider type="slash" />

## Create a Decentralized Identifier (DID)

Upon installation, a [DID](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers) will be created by default, but you can follow the steps below to create one for yourself.

### 1. Click `DIDs` tab

### 2. Click `Add New`

### 3. Set DID Method
There are three different [DID methods](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers/#methods) to choose from: `Ion`, `Web`, and `Key`. The DID `Key` method is a good method for testing purposes so let's select that for now.

### 4. Set keyType and options
Click `Try sample input` and then submit.

_Learn more about what you can [add to this field](https://developer.tbd.website/docs/apis/ssi-service/#tag/DecentralizedIdentityAPI/paths/~1v1~1dids~1%7Bmethod%7D/put)._

<Divider type="slash" />

## Create a Verifiable Credential (VC)

### 1. Click `Credentials` tab 

### 2. Click `Create New`

### 3. Add name and description
Feel free to use the default placeholders or describe your new VC. Then click `Next`.

### 4. Prep VC Schema
- Set `Schema` to `New data set`.
- Click `Try sample input` and fill in the VC subject's first and last name.
- Click `Next`.

_See [properties you can add to this schema](https://developer.tbd.website/docs/apis/ssi-service#tag/SchemaAPI)._

### 5. Set Input Descriptors (optional)
Click `Try sample input` and leave the default JSON for now, and click `Next`.

This field populates the [presentation_definition](https://developer.tbd.website/docs/apis/ssi-service#tag/PresentationDefinitionAPI/paths/~1v1~1presentations~1definitions/put) field of the `credential_manifest`. When a subject, for example an employee, applies for this credential, they will be required to present any credentials defined in this field. Here, we are asking for a credential with the subject's `firstName` and a credential with the subject's `lastName`. The `path` field defines which path we can expect to find these values in the subject's provided credentials.

### 6. Set issuer information
Fill in an issuer name (company name) for the employment verification, then click `Submit`.

A new VC has now been created.

<Divider type="slash" />

## Next Steps for VCs

### Send an Application
Share the Application URL with subjects, employees in this case, to apply for their new employment verifiable credential.

The credential applicant will need to submit a credential application as a [JSON Web Token (JWT)](https://jwt.io/). Once they submit the JWT, the application will become available for review in the dashboard, under Credentials > Applications.

_Learn more about [applications](https://developer.tbd.website/docs/apis/ssi-service/#tag/ApplicationAPI/paths/~1v1~1manifests~1applications/put)._

### Issue a VC
  - Click `Issue` on a created VC.
  - `Subject DID`: Add your employee's DID.
  - `Subject Data`: Fill in your employee's first and last name.
  - Decide whether you want this DID to be `revocable` or `suspendable`
  - Set an `expiration` date if you want it to expire.
  - `Issuer DID`: Choose one of the employers' DIDs.

<Divider type="slash" />

## Verify a Credential

We use presentation definitions to create submission links, through which subjects can submit their relevant credentials for verification.

### 1. Click `Verification` tab 

### 2. Click `Create New`

### 3. Name your presentation definition

### 4. Set Purpose
Include the purpose of your presentation definition. It should answer: why are you requesting this credential?

### 5. Set Input Constraints
Click `Try sample input` again and leave the default added JSON for now.
It will look for credentials to verify the `firstName` and `lastName`.

### 6. Set verifier
Choose your verifier DID from the dropdown. You can use the same Ion DID you used to create the VC.

:::info
Verification `Applications` vs `Submissions`:

Applications: When an employee applies for a credential with your applicaton link, and you as the employeer will see that application here for the you (the employer) to approve or decline. If you approve their application you would then issue their employment credential.

Submissions: When an employer asks a job applicant to submit an education VC for example before accepting their role.
:::

<Divider type="slash" />

## Next Steps
- See SSI Service [API Docs](https://developer.tbd.website/docs/apis/ssi-service)
- Learn how to [manually issue a VC](https://developer.tbd.website/blog/issue-verifiable-credential-manually/)
