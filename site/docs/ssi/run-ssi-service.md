---
sidebar_position: 1
title: Run SSI Service
hide_title: true
---

# Self Sovereign Identity (SSI) Service API

**A web service that exposes the SSI SDK as an HTTP API.**

The SSI Service facilitates all things relating to DIDs and Verifiable Credentials - in a box!

<ButtonGroup
  className="pt-12"
  buttons={[
    {
      type: 'button',
      data: {
        label: 'More on SSI',
        url: 'https://developer.tbd.website/docs/glossary#self-sovereign-identity-ssi',
        imageURL: '/img/external-link-blue-icon.svg',
        isExternalLink: true,
      },
    },
    {
      type: 'button',
      data: {
        label: 'Explore Playground',
        url: 'https://ssi.benri.io/',
        isExternalLink: true,
        imageURL: '/img/external-link-blue-icon.svg',
      }
    },    
    {
      type: 'button',
      data: {
        label: 'View Project',
        url: 'https://github.com/TBD54566975/ssi-service',
        isExternalLink: true,
        imageURL: '/img/external-link-blue-icon.svg',
      },
    },
  ]}
/>

<Divider type="slash" />

## Core Functionality
- Create and manage [Decentralized Identifiers](/docs/web5/learn/decentralized-identifiers)
- Create and manage [Verifiable Credentials](create-credentials)
- Credential status updates, including suspension and revocation
- Interacting with the SSI ecosystem and its myriad components to:
  - Apply for credentials
  - Present credentials
  - Verify credentials
  - Create verifiable schemas

<Divider type="slash" />

## Run SSI Service

:::info
The SSI Service is packaged as a Docker container and a Docker Compose file is included to make it simple to run the service locally. First make sure you have [Docker downloaded](https://www.docker.com/products/docker-desktop/) and running on your desktop.
:::

Verify that both `docker` and `docker-compose` commands are available:
```bash
docker --version

docker-compose --version
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
```

<Divider type="slash" />

## Next Steps
- Check out the [SSI Console](ssi-console) which leverages the SSI Service to simplify credential issuance and verification via a web interface.
- Check out the [SSI SDK project](https://github.com/TBD54566975/ssi-sdk).