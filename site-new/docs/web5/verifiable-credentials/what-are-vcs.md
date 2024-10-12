---
sidebar_position: 1
title: What are VCs
hide_title: true
---

# Verifiable Credentials

<iframe class="aspect-video" src="https://www.youtube.com/embed/k9CL1ETxCkU" title="Verifiable Credentials" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Alice and Bob have obtained [Decentralized Identifiers (DIDs)](https://developer.tbd.website/docs/web5/decentralized-identifiers/what-are-dids) and are now exploring Verifiable Credentials (VCs).

## TL;DR

VCs are digital credentials stating specific facts. They're similar to online badges. For example, the claims that "Alice has a degree from Decentralized University" or "Bob is an employee of Acme, Inc" can be represented via VCs. These credentials allow you to provide specific attributes of your identity or qualifications without relying on centralized authorities or revealing your entire identity.

## What are Verifiable Credentials?

![VC's three party model](/img/vc-three-party-model.png)

> _Three party model diagram, from [Affinidi Pte. Ltd](https://affinidi.medium.com/what-are-verifiable-credentials-79f1846a7b9)_

A Verifiable Credential (VC) is a cryptographically-signed statement made by an issuer about a holder (or subject). VCs operate within a three-party model: the **Issuer**, the **Holder** **(or Subject)**, and the **Verifier**.

An **issuer** is the party who is making the claim; while the **holder(subject)** is the party who the claim is made about. In the example VC where the claim is "Alice has a degree from Decentralized University", Decentralized University would be a credible issuer and Alice would be the subject.

The beauty of VCs are that the claims made within them can be verified without needing a middleman. Since VCs are signed by the issuer with some fancy cryptography magic (we'll uncover this magic in a minute), anyone can become a **verifier** to confirm that the claims are indeed the real-deal. It’s all about being sure that a claim (like Alice's degree or Bob’s employment status) isn't just a made-up story.

## Examples of Verifiable Credentials

After four years of long nights and early mornings, Alice graduates from Decentralized University and is instantly issued a VC from the university proving that she has earned her degree.

When Alice begins her job search, she realizes the power of her VC. It acts as a digital diploma. Traditionally, potential employers would hire background check agencies to validate that she graduated—a process that could drag on for days if not weeks. But with her VC, they can now directly verify her diploma, bypassing traditional drawn-out methods.

On a different note, Bob obtains a VC proving that he is an employee of Acme, Inc. When Bob wants to buy a house, he can provide the lender with his employment VC and they can rest assured that he is indeed employed and not a credit risk. Thus, speeding up the approval of his loan.

## Why are VCs useful?

Online transactions have become a part of our daily lives and with this comes the need to prove things like qualification and authorization. VCs provide a fast, secure approach to this while preserving your privacy.

**Privacy**

VCs are your personal pocket-sized portfolio, where you can share specific details when required. For example, Alice sharing her degree credential, gives potential employers the information she needs, without oversharing Alice's entire academic history (e.g. transcript of every course taken and every grade received) with them. So in this regard, VCs are privacy preserving.

**Security**

VCs are cryptographically signed by the issuer. This means that these credentials aren't easy to forge. Think of it as a tamper-proof seal on a medicine bottle, but for your digital identity.

**Speed**

Unlike traditional methods that might involve queues or waiting rooms, VCs allow for quick and instant validation. You don't have to wait for someone on the other end to give you the green light; it's immediate.

## What makes up a VC?

A VC typically contains the following components:

- **Issuer:** The entity that creates and signs the VC. This could be a university, government agency, or any other trusted person/organization. In Alice's example, "Decentralized University" serves as the issuer.

- **Subject:** The person or entity the VC is about. For instance, in Bob's employment VC, he is the subject. His unique DID ensures that the credential is tied specifically to him.

- **Claim:** The specific assertion(s) the issuer is making about the subject. In Alice's degree VC, there could be a claim that states Alice has a Bachelor’s Degree in Decentralized Systems.

A VC is represented as JSON objects so that they're easy to work with programmatically across various systems. Here's an example VC:

```json
{
  "@context": "https://www.w3.org/2018/credentials/v1",
  "type": "VerifiableCredential",
  "issuer": "did:example:decuniversity",
  "credentialSubject": {
    "id": "did:example:alice123",
    "name": "Alice",
    "degree": "Bachelor’s in Decentralized Systems",
    "completionDate": "2023-08-01"
  }
}
```

In this VC, Decentralized University issued a credential verifying that Alice completed a Bachelor's degree in Decentralized Systems on August 1, 2023.

## How do VCs actually work?

Remember the cryptographic brilliance we encountered with DIDs and the pairing of [private & public keys](/docs/web5/decentralized-identifiers/what-are-dids#did-key-management)? It’s a critical part of VCs as well.

There are different ways to secure VCs, let's look into securing them with JWT. JWT stands for [JSON Web Token](https://jwt.io/), a lightweight, URL-safe format that has three distinct components: a **header**, **payload**, and **signature**.

1. **Header**: Tells you how the JWT was made.
1. **Payload**: This is the heart of the JWT. It holds all the important details like the issuer, subject, and claim.
1. **Signature**: This is like the seal on a medicine bottle, ensuring the information in the payload hasn't been touched.

![Encoded JWT string](/img/jwt-encoded.png)

> _Example of an encoded JWT string from [Ram Potabatti](https://medium.com/@rampotabatti)_

In our example, for Alice's potential employer to verify that she did indeed graduate from Decentralized University, Alice would need to give them a [Verifiable Presentation](/docs/glossary#verifiable-presentation) that contains her VC's JWT string.

The employer (verifier) would then get the university's public key through the [Verifiable Data Registry](https://www.w3.org/TR/vc-data-model-2.0/#ecosystem-overview). In order for the university to create that JWT string, they need their public-private key pair. The employer would then verify the JWT using the university's public key and the JWT's encoded signature (the characters after the last period in the above string #3).

A successful verification tells the employer that the VC is authentic. If this step fails, it's a sign that Alice's VC was forged. After verification, the employer can decode the JWT, as shown on [JWT.io](https://jwt.io/) to obtain it's payload. The payload contains all the information that is written inside of the VC that Alice has presented to them. The employer can trust that the information contained in the now-verified payload was indeed issued by the university.

:::note
Trust is still critical. A VC from “Bob’s Bogus Academy” might not carry the same credibility as one from a renowned institution. However, since public keys are public, the discovery of them presents a slight risk. How do you know that the public key you were given actually belongs to the issuer, such as Decentralized University? Although the Verifiable Data Registry gives you a way to search for public keys, it still requires a great amount of trust. Always consider the issuer's reputation.
:::

## Storing and Sharing VCs

VCs can be securely stored and managed via identity wallets. When the need arises to share them, it's simply a matter of presenting directly from the wallet, ensuring personal data remains private.

Now, with their newfound knowledge of VCs, Alice and Bob are ready to further explore the decentralized web, presenting their credentials with confidence. Looking to play around with Verifiable Credentials yourself? Start by following our [Issue a VC](/docs/web5/verifiable-credentials/vc-issuance) guide. For additional resources, check out our [Web5/credentials](https://www.npmjs.com/package/@web5/credentials) npm package.
