---
slug: things-you-didnt-know-about-dids
title: "9 Things You Didn't Know About Decentralized Identifiers"
description: "From nostalgic usernames to the next era of digital identity: gain deeper insights into how decentralized identifiers really work."
authors:
  name: Rizèl Scarlett
tags: [Decentralized Identity, Decentralized Identifiers, Web5, DHT]
---

<head>
  <meta property="og:title" content="9 Things You Didn't Know About Decentralized Identifiers" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content='https://developer.tbd.website/blog/things-you-didnt-know-about-dids' />
  <meta name="og:description" content="From nostalgic usernames to the next era of digital identity: gain deeper insights into how decentralized identifiers really work." />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/things-you-didnt-know-dids-23a6d9c83bf1a1e91b44f9b8bca8ec51.png" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta name="twitter:site" content="@tbdevs" />
  <meta name="twitter:title" content="9 Things You Didn't Know About Decentralized Identifiers" />
  <meta property="twitter:url" content='https://developer.tbd.website/blog/things-you-didnt-know-about-dids' /> 
  <meta name="twitter:description" content="From nostalgic usernames to the next era of digital identity: gain deeper insights into how decentralized identifiers really work." />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/things-you-didnt-know-dids-23a6d9c83bf1a1e91b44f9b8bca8ec51.png" />

  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
  <link rel="canonical" href="https://dev.to/tbdevs/9-things-you-didnt-know-about-decentralized-identifiers-2eh9" />
</head>

![9 Things You Didn't Know About Decentralized Identifiers](/img/things-you-didnt-know-dids.png)

Remember your first username? If you were anything like me in the early 2000s—too young to surf the web but excited about the possibilities of connecting with the rest of the world—your username probably makes you cringe today.


<!--truncate-->
Self-expression is the main driver for my internet usage. Over the years, I've created various usernames representing different parts of me at distinct periods of my life. From [Millsberry](https://tvtropes.org/pmwiki/pmwiki.php/Website/Millsberry) to [Myspace](https://myspace.com/), each new website meant a new profile, leading to a fragmented experience. The most annoying part is that there's no connection between my profiles or "identities", so I have to remember all my passwords or rely on a password manager. Unfortunately, password managers are susceptible to [security breaches](https://www.darkreading.com/vulnerabilities-threats/how-password-managers-can-get-hacked).

This fragmentation of identity on the web poses a significant challenge: **_How do we manage these scattered identities efficiently and securely?_**

Many organizations are working hard to answer this question. Some are going passwordless via passkeys. Others, like the [Open Researcher and Contributor ID](https://orcid.org/) (ORCID), implemented digital identifiers to associate publications, research, and open source contributions with a particular researcher.

Companies focused on advancing identity tech and self-sovereign identity are embracing [Decentralized Identifiers (DIDs)](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers) as a solution. DIDs are globally unique, alphanumeric, immutable strings representing who you are across the decentralized web. 

Speaking of DIDs -- **_did_** you know that Decentralized Identifiers are one of the pillars of Web5? 

![badumtss](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qoglht3482ia3bdijg8b.jpeg)

In this post, we'll explore nine more things you may not have known about Decentralized Identifiers.

## 1. DIDs are a W3C Standard 

In 1994, Tim Berners Lee, the creator of the World Wide Web, founded the World Wide Web Consortium (W3C). The W3C is made up of groups of people focused on setting the best practices and standards for building the web. For example, the W3C develops and maintains standards for HTML, CSS, Web Accessibility, and Web Security. In July 2022, The W3C officially [published standards for Decentralized Identifiers](https://www.w3.org/TR/did-core/). This way, technologists would have blueprint for building and managing digital identities as we make the shift towards controlling your own identity on the internet.	


## 2. DIDs can represent more than just humans

While DIDs represent people across the web, they can also represent organizations such as manufacturers, businesses, or government agencies. Technologists are exploring using [DIDs to represent IoT devices](https://www.arcadian-iot.eu/iot-decentralized-identity-arcadian/) like smart hubs, smart thermostats, or autonomous cars, allowing you to maintain control over your data usage! Here's a taboo but realistic use case that might make you blush— DIDs can even represent sex tech devices! 😳


## 3. It's nearly impossible for someone to steal your DID

A common question people often ask me is, "Can someone steal my DID?" DIDs are alphanumeric strings, so they may give people the impression that DIDs are top-secret passwords or API keys. But that's not the case; you can share your DID with anyone without compromising your safety. It's nearly impossible for someone to steal your DID and pretend to be you because DIDs are all cryptographically signed. 

**What does 'cryptographically signed' mean?**

Cryptographically signed means that each DID has a unique digital fingerprint generated by a fancy, complicated algorithm. Two keys—a public key and a private key—make up the digital fingerprint. Your public key shows other people that the DID legitimately belongs to you, but the private key **_needs_** to remain private. The private key is like your master key. Someone can only steal your DID, tamper with your DID, or impersonate you if they have access to your private key. Fortunately, it's not easy to access your private key because it is protected by encryption and multiple layers of security. Some [DID methods](#5-every-did-has-a-did-method) even support key rotation meaning you can update your cryptographic keys to reduce the risk of compromise.

**Store your DID in an authenticated digital wallet**

In addition to all these security algorithms that protect your DID from being stolen, users typically store their DIDs in an authenticated digital wallet (similar to how your Apple Wallet or Google Wallet stores your debit card information). Storing your DID in a digital wallet provides an additional layer of security because you often have to use a form of authentication like Face ID or a passcode to access items stored in the wallet. 

![digital wallet with did](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/noh03yerdgasf4yhcmpm.png)

## 4. Your DID is more than a string

While your DID _is_ a string, it's part of a larger JSON object called a DID document. In addition to the DID string, the DID document includes metadata like:

* Cryptographic keys to prove ownership 
* Rules about how your DID can be used, managed, or modified 

Below is an example of a DID document:
```json
{

  "@context": [

    "https://www.w3.org/ns/did/v1",

    "https://w3id.org/security/suites/ed25519-2020/v1"

  ]

  "id": "did:example:123456789abcdefghi",

  "verificationMethod": [{

    "id": "did:example:123456789abcdefghi#key-1",

    "type": "Ed25519VerificationKey2020", 

    "controller": "did:example:123456789abcdefghi",

    "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"

  }, ...],

  "authentication": [

    "#key-1"

  ]

}
```

*Source: https://www.w3.org/TR/did-core/#example-an-example-of-a-relative-did-url*

Learn more about DID documents [here](https://developer.tbd.website/docs/web5/learn/did_document).


## 5. Every DID has a DID method

Let's examine the anatomy of a DID method. 
![anatomy of a did](/img/did-example.png)

Every DID:
- Starts with the schema `did:`
- Followed by a word or acronym representing the did method 
- Then, ends with a did method-specific identifier in the form of an alphanumeric string

A schema and a DID method together may look like `did:web` or `did:jwk`. 

**What are DID methods?**

DID methods define the rules for creating, managing, and deactivating DIDs. 


## 6. There are over 100 DID methods

**Anyone** can create a DID method. Companies, individuals, or communities may create a custom DID method to fit a specific use case or live on a specific type of ledger. However, to ensure the DID method is recognized, interoperable, and meets the correct standards, it's strongly recommended to include the DID method on the [W3C DID Spec Registry](https://github.com/w3c/did-spec-registries).

## 7. TBD created its own DID method

We (TBD) created our own DID method called DID:DHT. DHT stands for **Distributed Hash Table** indicating the use of Mainline DHT. You can learn more about DID:DHT via the [spec](https://did-dht.com/) and this [blog post](https://developer.tbd.website/blog/did-dht) written by TBD’s Director of Open Standards, [Gabe Cohen](https://www.linkedin.com/in/cohengabe).

At TBD, we colloquially call DID:DHT, DID THAT.

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTc0dWhhdTE5ZHNiZGRkeWZjcmE3MzFieHgzYzNrcnN5cmwyYWV5ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oD3YF49jXQaqcpsGI/giphy.gif"  width="900" height="1000" alt="tamar braxton saying she did that"/>

## 8. You don't have to use blockchain; we use BitTorrent

When I hear the words, "decentralized" or "immutable", I immediately think of blockchain and cryptocurrency. I don't think that train of thought is in the minority.

For instance, to ensure DIDs have no central authority and that individual users can own them, folks typically anchor DIDs on an immutable ledger.

**What does anchoring a DID mean?** 

Anchoring a DID means recording DID transactions on a distributed ledger. 

**DID:DHT uses BitTorrent; not blockchain** 

At TBD, we _**actually**_ took a blockchain-less approach. We anchored DID:DHT to BitTorrent. As mentioned above, DID:DHT uses a Mainline DHT, which is a distributed hash table used by the [BitTorrent protocol](https://github.com/bittorrent/bittorrent.org).

## 9. You can create a DID with the Web5 SDK 

You can use the Web5 SDK to [create a DID](https://developer.tbd.website/docs/web5/build/decentralized-identifiers/how-to-create-did)!

### **`Web5.connect()`**

You can generate a DID using the Web5.connect() method with the following steps:

**Install the web5/api package**

* `npm install @web5/api` 

**Import the package**

* `import { Web5 } from '@web5/api';`

**Call Web5.connect()**

* `const { web5, did: myDid } = await Web5.connect();`
* `console.log(myDid)`


### **More ways to create a DID**

Check out the [documentation](https://developer.tbd.website/docs/web5/build/decentralized-identifiers/how-to-create-did) to learn more ways to create a DID in various languages including JavaScript, Kotlin, and Swift.


## Learn more about Decentralized Identifiers

* Have a question? Ask it in our [Discord](https://dischord.com/invite/tbd); we're happy to help!
* Eager to start building? Follow the guides in our [documentation](https://developer.tbd.website/docs/).
* Curious about the entire ecosystem? Watch our [YouTube videos](https://www.youtube.com/@TBD54566975).