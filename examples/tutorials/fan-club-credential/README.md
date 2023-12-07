# Fan Club Credential Example
## Overview
This example demonstrates how to use the @web5/credentials package to issue and verify Verifiable Credentials (VCs). It includes creating issuer and subject DIDs, issuing a signed VC, and then verifying it. Also it will show how to issue a self signed VC and store it in your DWN.

## Prerequisites
* Node.js v18.16.1 or later
* npm (Node Package Manager)

## Installation
Clone the tutorial repository and navigate to the `fan-club-credential` directory:

```bash
git clone https://github.com/TBD54566975/developer.tbd.website.git
cd developer.tbd.website/examples/tutorials/fan-club-credential
```

Install the required npm packages:
```bash
npm install
```

## Usage
The index.js file contains the main logic for the example. It performs the following steps:

* Creates issuer and subject DIDs.
* Defines a ticket credential class (SwiftiesFanClub).
* Creates an unsigned VC.
* Signs the VC using the issuer's did.
* Verifies the signed VC.

Run the script using Node.js:

```bash
node index.js
```

