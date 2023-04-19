---
slug: benri-hosts-ssi-service
title: TBD's SSI Service hosted by benri.io
description: benri hosts TBD's SSI-Service to enable users to learn more about SSI technology
authors:
  name: Andor Kesselman (benri)
tags: [Self Sovereign Identity, Web5]
---

<head> 
  <meta property="og:url" content="https://developer.tbd.website/blog/benri-hosts-ssi-service/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="SSI-Service hosted by benri"/>
  <meta property="og:description" content="SSI-Service hosted by benri"/>
  <meta property="og:image" content="https://developer.tbd.website/assets/images/blog-benri-ssi-host3-22507e91e39ff2133a86d16d3e9bdd26.png"/>
  <meta name="twitter:card" content="summary" /> 
  <meta name="twitter:site" content="@tbddev" />
  <meta property="twitter:domain" content="developer.tbd.website"/>
  <meta property="twitter:url" content="https://developer.tbd.website/blog/benri-hosts-ssi-service/"/>
  <meta name="twitter:title" content="SSI-Service hosted by benri"/>
  <meta name="twitter:description" content="SSI-Service hosted by benri"/>
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/blog-benri-ssi-host3-22507e91e39ff2133a86d16d3e9bdd26.png"/>
        
  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" /> 

</head>

![benri Host](/img/blog-benri-ssi-host3.png)

[Benri](https://benri.io) is hosting [TBD's SSI Service](https://ssi.benri.io) to enable users to learn more about SSI technology.

<!--truncate-->

Self-sovereign identity (SSI) is a decentralized approach to identity management
that gives individuals control over their personal data. With SSI, people can
manage their personal information, credentials, and other digital assets,
without relying on centralized authorities. At benri, we are proud to provide a
playground for [TBD's SSI Service](https://github.com/TBD54566975/ssi-service)
at our subdomain [ssi.benri](https://ssi.benri.io), where users can explore the
power of SSI in a secure and easy-to-use environment. This is not meant to be
used for production, but can be a hands-on learning experience for those
interested in building decentralized apps and learning more about SSI.

At Benri, users can access TBD's SSI-Service, which supports a wide range of SSI functionality. 

Users can
- create and manage Decentralized Identifiers (DIDs), which provide a unique identifier for each user in a
decentralized system. 
- create and manage Verifiable Credentials (VCs), which allow users to share their identity information and credentials with others in a secure and privacy-preserving way. 
- facilitate credential suspension, credential revocations, applying for credentials, exchanging credentials, and data schemas for credentials and other verifiable data. 

It is not meant for production use, but is a learning tool to learn more about SSI technology.

To make it easy for users to access the SSI-Service, benri is providing 3 main endpoints:
- [ssi.benri](https://ssi.benri.io): which hosts a streamlit application.
- [docs](https://ssi.benri.io/docs): which hosts the swagger docs
- ssi.benri.io/api: which hosts the API
  endpoints corresponding to the docs. It hosts the RESTful API's which can be
  used to manage your services.

See below for an example of a DID resolution using the SSI Service API's:

```sh
# resolve a did
curl -X GET  https://ssi.benri.io/api/v1/dids/resolver/did:key:z6MkvsfnnzUXY57RoocLzaaQ3VYDAD7pdB4kc5jErcNBG1w2
{"didResolutionMetadata":{"ContentType":"","Error":null},"didDocument":{"@context":"https://www.w3.org/ns/did/v1","id":"did:key:z6MkvsfnnzUXY57RoocLzaaQ3VYDAD7pdB4kc5jErcNBG1w2","verificationMethod":[{"id":"#z6MkvsfnnzUXY57RoocLzaaQ3VYDAD7pdB4kc5jErcNBG1w2","type":"Ed25519VerificationKey2018","controller":"did:key:z6MkvsfnnzUXY57RoocLzaaQ3VYDAD7pdB4kc5jErcNBG1w2","publicKeyBase58":"HRQkCkE6CXcxhJmeK1cZCPzDLdqyDHpPv4pK2LQALo9e"}],"authentication":[["#z6MkvsfnnzUXY57RoocLzaaQ3VYDAD7pdB4kc5jErcNBG1w2"]],"assertionMethod":[["#z6MkvsfnnzUXY57RoocLzaaQ3VYDAD7pdB4kc5jErcNBG1w2"]],"keyAgreement":[["#z6MkvsfnnzUXY57RoocLzaaQ3VYDAD7pdB4kc5jErcNBG1w2"]],"capabilityDelegation":[["#z6MkvsfnnzUXY57RoocLzaaQ3VYDAD7pdB4kc5jErcNBG1w2"]]},"didDocumentMetadata":{}}%
```

The docs have [additional API's listed](https://ssi.benri.io/docs).

The SSI service is a bridge to learning more about the decentralized web and
basic components in the Web5 Ecosystem. Users can store their credentials on
their devices or in the cloud, ensuring that they have complete control over
their data. Additionally, the platform uses cutting-edge encryption and
authentication technologies to protect user data and prevent unauthorized
access.

Access the easy-to-use playground for TBD's SSI-Service at [Benri](https://ssi.benri.io), and explore the power of self-sovereign identity.

If you're interested in learning more about SSI, visit the [SSI-Service](https://ssi.benri.io) and start playing around with the tools!
