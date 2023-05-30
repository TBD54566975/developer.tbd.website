---
sidebar_position: 1
title: Run SSI Service
hide_title: true
---

import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div className="prose prose-pink">

# Self Sovereign Identity (SSI) Service API

### A web service that exposes the SSI SDK as an HTTP API.

The SSI Service facilitates all things relating to DIDs and Verifiable Credentials - in a box!

Not sure what Self Sovereign Identity (SSI) means? See definition [here](https://developer.tbd.website/docs/glossary/#ssi).

<ButtonGroup
  className="pt-12"
  buttons={[
    {
      type: 'button',
      data: {
        label: 'Source',
        url: 'https://github.com/TBD54566975/ssi-service',
        isExternalLink: true,
        imageURL: '/img/external-link-blue-icon.svg',
      },
    },
  ]}
/>

<Divider type="slash" />

</div>

## Core Functionality
- Create and manage [Decentralized Identifiers](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers)
- Create and manage [Verifiable Credentials](https://www.w3.org/TR/vc-data-model/)
- Credential status updates, including suspension and revocation
- Interacting with the SSI ecosystem and its myriad components to apply for credentials, present credentials, verify credentials, and create verifiable schemas.

## Run SSI Service
:::info
The SSI Service is packaged as a Docker container and a Docker Compose file is included to make it simple to run the service locally. First make sure you have [Docker downloaded](https://www.docker.com/products/docker-desktop/) and running on your desktop.
:::

Verify that both `docker` and `docker-compose` commands are available:
```bash
docker --version
Docker version 20.10.24, build 297e128

docker-compose --version
Docker Compose version v2.17.2
```

Locally clone the SSI Service repo:
```bash
git clone https://github.com/TBD54566975/ssi-service.git
```

Run the Docker Compose file:
```bash
cd ssi-service/build && docker-compose up --build
```

If you'd like to confirm the SSI service and sub-services are functioning, check the health and readiness endpoints:

```bash
curl localhost:8080/health
```

The following response should be returned:

```js
{"status":"OK"}
curl localhost:8080/readiness
{ 
  "status": { 
    "status": "ready",
    "message": "all service ready"
  },
  "serviceStatuses": {
    "credential": { 
      "status": "ready" 
    },
    "did": { 
      "status": "ready"
    }, "schema": {
      "status": "ready"
    } ...
  }
}
```

## Next Steps:
- Learn how to [manually issue a VC](https://developer.tbd.website/blog/issue-verifiable-credential-manually/)
- Check out our [SSI Console](https://developer.tbd.website/docs/ssi/ssi-console) which leverages the SSI Service to simplify credential issuance and verification via a web interface.
- Check out our [SSI SDK](https://github.com/TBD54566975/ssi-sdk).