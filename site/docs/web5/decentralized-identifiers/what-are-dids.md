---
title: What are DIDs
hide_title: true
sidebar_position: 1
---

# Decentralized Identifiers

Alice and Bob want to participate in the decentralized web. We're going to learn about how Alice and Bob do that using Web5 and the concepts that make up the Web5 ecosystem.

## What are DIDs?

### TL;DR

Alice and Bob decide to get Decentralized Identifiers (DIDs) so that others can easily find them on the decentralized web. This is just like how someone would find a website by typing a URL into a web browser, or a person by searching for their handle on a social media platform. Once they find Alice or Bob through their DIDs, they can do things like save them to their contact list, or message them through decentralized channels.

### Let's learn more

A [DID](https://www.w3.org/TR/did-core/) is an address representing who you are on the decentralized web. It can point to a person, organization, thing, data model, or abstract entity. It's through your DID that others can send messages and data, and be granted access to information you wish to share.

A DID is a "type of identifier that enables verifiable, decentralized digital identity" ([DID Core Spec](https://www.w3.org/TR/did-core/)). It is [created](/docs/web5/decentralized-identifiers/how-to-create-did/) and managed independently of any centralized authority or organization. The basic idea behind a DID is to give individuals and organizations control over their own identity information and to allow them to share that information selectively and securely with others as needed. This means that they can choose when and how to share their identity information, and with whom.

DIDs are typically represented as a unique resource identifier (URI) and are designed to be used for identity verification, authentication, and authorization.

<div role="figure" aria-labelledby="caption-1" class="figure-container">

![](/img/did-example.png)

<span id="caption-1">

Example of a Decentralized Identifier

</span>

</div>

The key difference between a traditional centralized identifier, such as a username or email address, and a decentralized identifier is that the latter is not tied to a specific service provider or organization. An example of a centralized identifier you might have would be your Twitter handle or Google email address, where Twitter or Google are the centralized authority.

## Why we need it?

We need an identifier that isn't tied to a centralized authority, that we can take anywhere with us, and that can be used to identify us across any platform.

### Methods

Now that Alice and Bob know that they need a DID let's take a look at the different kinds of DIDs they can have.

There are lots of different implementations of DIDs (called [DID methods](https://www.w3.org/TR/did-core/#methods)) with different use cases. Web5 currently supports a few methods.

#### ```did:dht```

The [did:dht](https://did-dht.com/) method, based on the Pkarr project, utilizes BitTorrent's Mainline Distributed Hash Table (DHT) to anchor DIDs and store [DID Documents](#did-documents). This approach ensures that the identity information is maintained in a decentralized manner. 

The did:dht method allows operations like creating, reading, updating, and deactivating DIDs, and includes optional features like type indexing and gateway APIs for extended functionalities.


#### ```did:jwk```

A [did:jwk](https://github.com/quartzjer/did-jwk/blob/main/spec.md) DID is designed for simplicity and self-containment when creating a DID. It involves encoding a JSON Web Key (JWK) using base64url. This method appeals to those seeking a straightforward approach.


### DID Documents

Now that Alice and Bob have gone through one of the methods and they have their DIDs, they now need a DID document to store those DIDs. Let's learn about DID documents, what they are and what fields we might see in them.

#### What is it?

A DID Document is a small `json` object that has a field for your DID, called `id`.

```javascript
{
  "@context": [
    "https://www.w3.org/ns/did/v1"
  ],
  "id": "did:example:123456789abcdefghi"
}
```

Every DID can be _resolved_ to a corresponding DID document. A DID resolver is a mechanism that allows you to look up and retrieve the DID document associated with a particular DID.

If you type a URL into your browser, it resolves to a web page. Similarly, you can use a service to resolve a DID to a DID document. The document includes fields that help authenticate interactions with the DID.

#### What should be in it?

The only required field is the `id` field. This value is your DID. You might find many other fields in a DID Document, such as authentication material, encryption key material, and pointers to your DWN. Read more about the fields [here](https://www.w3.org/TR/did-core/#core-properties).

#### Controller - Subject relationship

<div role="figure" aria-labelledby="caption-2" class="figure-container">

![](/img/did-controller-trust.png)

<span id="caption-2">

Example of a Controller Subject relationship diagram, from [W3C DID Core Spec](https://www.w3.org/TR/did-core/)

</span>

</div>

One of the fields you might find in a DID Document is the `verificationMethod`, which is an array of objects each representing a controlling entity of the DID. The `controller` field contains controlling entity's DID.

```javascript
{
  "@context": [
    "https://www.w3.org/ns/did/v1"
  ],
  "id": "did:example:123456789abcdefghi",
  "verificationMethod": [{
    "id": "did:example:123456789abcdefghi#keys-1",
    "type": "Ed25519VerificationKey2020",
    "controller": "did:example:pqrstuvwxyz0987654321",
    "publicKeyMultibase": "zH3C2AVvLMv6gmMNam3uVAjZpfkcJCwDwnZn6z3wXmqPV"
  }]
}
```

The easiest way to describe the controller-subject relationship is by coming back to Alice and Bob for an analogy.

Alice and Bob (controller group) have a baby. They decide to get their baby a DID. The baby is the _subject_ of the DID, but may not be ready for the responsibility of managing the DID yet. Alice and Bob can use their own DID's verification methods to control their baby's DID on behalf of their baby.

### DID Key Management

Your DIDs are secured with public-private key pairs. You should not let anyone have your private key, because the key material used to secure your DID is how you prove ownership of your DID. You should find a secure way to store your private key, such as through a [Key Management Service](/docs/web5/decentralized-identifiers/key-management).

Alice and Bob have successfully created their DIDs, while learning all about the different methods. They each have their DID documents and are ready to join in on the decentralized fun. Take a look at the [Create a DID](/docs/web5/decentralized-identifiers/how-to-create-did) guide to create your very own.