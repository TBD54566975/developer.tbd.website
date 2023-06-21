---
slug: dids-in-the-real-world
title: Decentralized Identity in the Real World
description: An overview of how Decentralized Identity is being used today.
authors:
  name: Bobbilee Hartman
tags: [Decentralized Identity]
---

<head>
  <meta property="og:title" content="Decentralized Identity in the Real World" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content='https://developer.tbd.website/blog/2023-05-15-dids-in-the-real-world' />
  <meta name="og:description" content="An overview of how Decentralized Identity is being used today." />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/dids-in-the-real-world-173665dc272872c5c1dea01ad06dc6df.png" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta name="twitter:site" content="@tbddev" />
  <meta name="twitter:title" content="Decentralized Identity in the Real World" />
  <meta property="twitter:url" content='https://developer.tbd.website/blog/2023-05-15-dids-in-the-real-world' /> 
  <meta name="twitter:description" content="An overview of how Decentralized Identity is being used today." />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/dids-in-the-real-world-173665dc272872c5c1dea01ad06dc6df.png" />

  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>

![Decentralized Identity in the Real World](/img/dids-in-the-real-world.png)

The concept of Decentralized Identifiers (DIDs) was first proposed in 2015 by Drummond Reed and then became an official W3C standard in July of 2022.

Adoption has grown quite a bit in the last few years. Here are a few ways they are being used today.

<!--truncate-->

## Employment Verification 

LinkedIn recently announced a new free [verified badge feature](https://www.theverge.com/2023/4/12/23679998/linkedin-verification-badge-system-clear-microsoft-entra) that will be used to prove the validity of your employment, education, and other achievements. “The system is backed by **decentralized identity and a trust model that involves an issuer, a holder, and a verifier**. Organizations can issue cryptographically signed digital IDs, which employees can then use to prove they work at a company…” 

LinkedIn is  using the Self-Sovereign Identity trust model connecting an employee's DID (subject) with their employer's DID (issuer), and LinkedIn as the verifier of the transaction.

![SSI Trust Model](/img/ssi-trust-model.png)

As for education verification, LinkedIn users can request that their educational institution issue a [Verifiable Credential](https://www.w3.org/TR/vc-data-model/) (VC) for their degree or certification. The user can then choose to share the credential with employers or other third parties via LinkedIn, who then verifies the authenticity of the credential using cryptographic proofs.

:::info
DIDs vs VCs: DIDs provide a way to create and manage decentralized identities, whereas VCs provide a way to prove information about those identities in a secure and portable way.
:::

## Digital Driver's Licenses

The DMV (Department of Motor Vehicles) in the United States and in Queensland Australia are piloting a program that involves issuing [digital driver's licenses](https://www.govtech.com/fs/california-moves-to-test-new-digital-drivers-licenses) and vehicle registration documents that can be accessed and verified using a mobile app. Digital driver's license apps are cryptographically secure and can be used to verify the authenticity of the license without the need for physical documents. These apps are backed with the use of Verifiable Credentials (VCs) and DIDs. This program will lead to faster and more efficient services for customers, as well as improved security and fraud prevention.

## COVID Digital Health Apps

IBM used VCs as a key component in its [Digital Health Pass](https://www.ibm.com/watson/health/resources/digital-health-pass-blockchain-explained/) solution to enable individuals to securely and privately present their COVID vaccination status to third parties - such as concert venues and stadium events.

When an individual needs to prove if they are vaccinated, they can simply present their VC to a verifier (e.g., baseball stadium), who then verifies the authenticity of the credential and the accuracy of the information it contains using cryptographic proofs. 

There are several benefits to DIDs and VCs in this use case including privacy protection, security, and efficiency. This simple interaction now allows individuals to maintain control over their personal health information. For example, all they need to disclose is true/false (vaccinated or not) versus a more detailed health record. 

Overall, the use of VCs and DIDs in the IBM Digital Health Pass provides a secure and privacy-preserving way for individuals to prove their health status, which was essential for enabling safe travel and activities during the COVID-19 pandemic.

## Social Media

Even social media applications are embracing the use of decentralized identifiers. Bluesky is a new social platform that serves as a reference implementation of the [AT Protocol](https://atproto.com/guides/overview), a federated protocol for large-scale social applications. Instead of usernames that are specific to and owned by the application, BlueSky instead uses domain names for identity (e.g. alice.bsky.social). Unbeknownst to most users, these domain names are associated with a DID for the user.

![Bluesky DIDs](/img/bluesky-dids.png)

These persistent DIDs enable users to migrate their account data to any other applications that utilize the AT Protocol - therefore giving users more control and ownership over their content.

## Future of Decentralized Identity

These companies are embracing the use of decentralized technology for identity management and verification at a massive scale. As this technology continues to mature, we can expect to see more widespread adoption of DIDs in various industries.

Want to learn more about DIDs and VCs? Check out our [guide on DIDs](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers), [blog post on VCs](https://developer.tbd.website/blog/what-are-verifiable-credentials), and tutorial to [create your own DID](https://developer.tbd.website/docs/web5/build/decentralized-identifiers/how-to-create-did).
