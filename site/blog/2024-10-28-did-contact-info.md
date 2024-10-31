---
slug: did-contact-info
title: "Why Broken Links Are Costing You Brand Deals (And How to Fix It)"
description: "Decentralized Identifiers (DIDs) and service endpoints can keep your links accessible even during third-party outages. Ensuring you're in full control of your online presence."
authors:
  name: Ebony Louis
tags: [Decentralized Web Nodes, Decentralized Identity, Web5]
---

<head>
  <meta property="og:title" content="Why Broken Links Are Costing You Brand Deals (And How to Fix It)" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content='https://developer.tbd.website/blog/did-contact-info' />
  <meta name="og:description" content="Decentralized Identifiers (DIDs) and service endpoints can keep your links accessible even during third-party outages. Ensuring you're in full control of your online presence." />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/did-contact-info-ecb7a2e8fc024bcbb4422cc0361c5fac.png" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta name="twitter:site" content="@tbdevs" />
  <meta name="twitter:title" content="Why Broken Links Are Costing You Brand Deals (And How to Fix It)"/>
  <meta property="twitter:url" content='https://developer.tbd.website/blog/did-contact-info' /> 
  <meta name="twitter:description" content="Decentralized Identifiers (DIDs) and service endpoints can keep your links accessible even during third-party outages. Ensuring you're in full control of your online presence." />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/did-contact-info-ecb7a2e8fc024bcbb4422cc0361c5fac.png" />

  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>

![DID contact info](/img/did-contact-info.png)

# Why Broken Links Are Costing You Brand Deals (And How to Fix It)


Have you ever watched a creator’s video and thought, "Where did she get that top?" or "I need that protein powder"? You scroll through the comments, only to see the infamous "link in my bio" comment. You rush to click the link, and you're hit with-page not found 😒. I remember once being so desperate that I took a screenshot of the item and reverse-searched it on Google Images. I found something similar but not what I wanted. SO frustrating. Eventually, I gave up and kept on scrolling.

<!--truncate-->

Now, imagine how many potential sales that creator lost because a third-party platform’s server was down. Their metrics won't even reflect those missed opportunities, making it harder to secure brand deals. Who actually has time for that? That’s when I realized I could use [Decentralized Identifiers (DIDs)](https://developer.tbd.website/docs/web5/decentralized-identifiers/what-are-dids) to create my own decentralized link hub utilizing service endpoints. With this setup, all my links and contact info are stored in one place—owned and controlled by me. Even if a service that houses all my links goes down, my links will always be accessible because they’re not reliant on any external platforms to display them. I’m sharing this in hopes that fellow creators won’t miss out on potential brand deals, and I won't have to cry over a top I never got to buy.

Before I show you exactly how you can create your own decentralized link hub, lets answer some of the questions you're probably asking yourself. 

## What are Decentralized Identifiers (DIDs)?

So, what exactly is a Decentralized Identifier, or DID? Think of it as your username—the one source of truth for everything you do online—except this one is owned and controlled entirely by you. It’s a unique "address", thats verifiable and doesn’t rely on any central authority like Facebook, Google, or any other service. Instead, DIDs give you the freedom to manage your own identity online, without needing to trust a single platform to store or validate your information.

In the context of a decentralized link hub, your DID becomes the hub for all your important links. It’s not tied to any third-party service, which means you never have to worry about followers scrolling simply because your link page isn't working. When you update your links, you only need to do it once, as they're tied to your DID—so they stay consistent across all your social platforms, giving you full control. When you update your links, they stay up-to-date across the web because again they’re tied to your DID—giving you full control.

## How are Service Endpoints going to help me? 

Now, let’s cover what service endpoints are. These might sound technical, but they’re actually pretty simple—think of them like your digital address/phone book. Remember those huge yellow books you used to sit on at the hair salon? They were filled with phone numbers and addresses, making it easy to find and contact people. Well, service endpoints are kind of like that, except they’re the digital "addresses" for different parts of your online identity. These could be links to your Instagram profile, website, direct messages, or even your affiliate links.

These endpoints live in your [DID document](https://developer.tbd.website/docs/web5/decentralized-identifiers/did_documents#what-is-a-did-document). So instead of relying on centralized services like Linktree, your DID acts as the home for all your important links. So when someone [resolves your DID](https://developer.tbd.website/docs/web5/decentralized-identifiers/how-to-resolve-a-did), they can access the service endpoints that you’ve decided to share.

You can also easily update and delete these links anytime you need to again without relying on any third-party platform to keep those connections working.

## The fix: let's create a decentralized Link Hub

If you’re more of a visual learner, check out my [YouTube short](https://youtube.com/shorts/knYteCFYuno) where I show you exactly how. For this example we're going to create a DID with two service endpoints. One pointing to my LinkedIn and the other pointing to my X profile. 

Step 1: Import `web5/dids` package 

```
import {DidDht} from '@web5/dids'
```

Step 2: Create DID with service endpoints

```javascript
const myBearerDid = await DidDht.create({
    options:{
        publish: true,
        services: [
            {
                id: 'LinkedIn',
                type: 'professional',
                serviceEndpoint: 'https://www.linkedin.com/in/ebonylouis'
            },
            {
                id: 'X',
                type: 'personal',
                serviceEndpoint: 'https://x.com/EbonyJLouis'
            }
        ]
    }
});
```

Now that we've created your DID with service endpoints leading to your LinkedIn and X profiles.

Step 3: Lets print our entire DID also know as a [BearerDid](https://developer.tbd.website/docs/glossary/#bearer-did) to see our DID document where these service endpoints can be found: 

```javascript 
console.log(myBearerDid)
```
:::warning
It is important to never share your full BearerDID, it contains private keys that only you should have access to. The holder of these keys can perform private key operations, like signing data. Check out this [Key Management Guide](https://developer.tbd.website/docs/web5/decentralized-identifiers/key-management) to learn how to properly manage your DID keys. 
:::

Output: 

```jsonld
my bearerDid BearerDid {
  uri: 'did:dht:auontpd44i6rrzrmwry7hsbq8p5seqo7xyz8tnr7fdygsmhykoey',
  document: {
    id: 'did:dht:auontpd44i6rrzrmwry7hsbq8p5seqo7xyz8tnr7fdygsmhykoey',
    verificationMethod: [ [Object] ],
    authentication: [
      'did:dht:auontpd44i6rrzrmwry7hsbq8p5seqo7xyz8tnr7fdygsmhykoey#0'
    ],
    assertionMethod: [
      'did:dht:auontpd44i6rrzrmwry7hsbq8p5seqo7xyz8tnr7fdygsmhykoey#0'
    ],
    capabilityDelegation: [
      'did:dht:auontpd44i6rrzrmwry7hsbq8p5seqo7xyz8tnr7fdygsmhykoey#0'
    ],
    capabilityInvocation: [
      'did:dht:auontpd44i6rrzrmwry7hsbq8p5seqo7xyz8tnr7fdygsmhykoey#0'
    ],
    service: [ [Object], [Object] ]
  },
  metadata: { published: true, versionId: '1729705713' },
  keyManager: LocalKeyManager {
    _algorithmInstances: Map(1) {
      [class EdDsaAlgorithm extends CryptoAlgorithm] => EdDsaAlgorithm {}
    },
    _keyStore: MemoryStore { store: [Map] }
  }
}
```
This output contains your DID string(uri) thats your "username" along with the services array and some authentication and verification methods. To learn more refer to this [DID Document](https://developer.tbd.website/docs/web5/decentralized-identifiers/did_documents) Guide. 

Step 4: Now lets look closely at just our `serviceEndpoint` array: 

```javascript 
console.log("personal link hub", myBearerDid.document.service || "No Services Found");
```

Output:

```jsonld
decentralized link hub [
  {
    id: 'did:dht:xihb478dd7w9cyj33b6g5cjriuw6drwaxrx9ppf3bwn839pmhi6y#LinkedIn',
    type: 'professional',
    serviceEndpoint: 'https://www.linkedin.com/in/ebonylouis'
  },
  {
    id: 'did:dht:xihb478dd7w9cyj33b6g5cjriuw6drwaxrx9ppf3bwn839pmhi6y#X',
    type: 'personal',
    serviceEndpoint: 'https://x.com/EbonyJLouis'
  }
]
```

## How do I share these links? 
Now that your DID is in your bio, how do your followers access your links? It's simple- they just need to [resolve your DID](https://developer.tbd.website/docs/web5/decentralized-identifiers/how-to-resolve-a-did) to see a full list of your shared links: 

:::info
The resolving of your DID will differ depending on the [DID method](https://developer.tbd.website/docs/glossary#did-method) used to create the DID. In this example we are using the `DHT` DID method:
:::

```javascript
// DID in your bio
const didDhtUri = 'did:dht:xihb478dd7w9cyj33b6g5cjriuw6drwaxrx9ppf3bwn839pmhi6y'

// resolve the DID
const resolvedDhtDid = await DidDht.resolve(didDhtUri);

// access the DID Document's service links
const dhtDidDocument = resolvedDhtDid.didDocument.service;

console.log(dhtDidDocument)
```
Output:

```jsonld 
[
  {
    id: 'did:dht:xihb478dd7w9cyj33b6g5cjriuw6drwaxrx9ppf3bwn839pmhi6y#LinkedIn#LinkedIn',
    type: 'professional',
    serviceEndpoint: [ 'https://www.linkedin.com/in/ebonylouis' ]
  },
  {
    id: 'did:dht:xihb478dd7w9cyj33b6g5cjriuw6drwaxrx9ppf3bwn839pmhi6y#LinkedIn#X',
    type: 'personal',
    serviceEndpoint: [ 'https://x.com/EbonyJLouis' ]
  }
]
```

As you can see, we’ve succesfully set up our service endpoints to point to both my LinkedIn and X accounts. Now it’s your turn to secure the bag, create your own decentralized Link hub! And if you tweet about it, don’t forget to tag me.

To learn more about Decentralized Identity check out TBDs [Docs](https://developer.tbd.website/docs/). 
