# Glossary

## Agent

An agent is software that acts on behalf of a user to manage identity, public or private data, and interactions with other apps in a decentralized network. Agents hold a user's [DIDs](#decentralized-identifier-did), private keys, and a [DWN](#decentralized-web-node-dwn), and are permissioned to use the private keys of DIDs to act on a user's behalf to sign and store messages within a DWN.

[\<\< More on Agents \>\>](/docs/web5/decentralized-web-nodes/agents)

## Bearer DID

A Bearer DID is a composite type that combines a [DID](#decentralized-identifier-did), its associated [DID Document](#did-document), and a [Key Manager](/docs/web5/decentralized-identifiers/key-management) containing the DID's cryptographic keys. It provides methods for signing data, verifying signatures, and managing the DID's associated keys.

## Centralized Authority

A single entity or organization that has control over the network and its operations, potentially posing a risk to the principles of decentralization and autonomy.

## Decentralized Identifier (DID)

A Decentralized Identifier (DID) is a globally unique identifier that enables verifiable, decentralized digital identity, without the need for centralized intermediaries. DIDs are typically implemented using decentralized and distributed ledger technologies, such as blockchain, and provide a way to verify and authenticate digital identities, while ensuring privacy and control over personal data.

[\<\< More on DIDs \>\>](/docs/web5/decentralized-identifiers/what-are-dids/)

## Decentralized Web Node (DWN)

A Decentralized Web Node is a personal data store in a decentralized network that stores and shares information, serves as a communication channel, and executes transactions in a distributed manner, without relying on a centralized server, thereby enhancing security, privacy, and resilience of the network.

[\<\< More on DWNs \>\>](/docs/web5/decentralized-web-nodes/what-are-dwns)

## DID Document

A JSON document containing details about a DID, including the DID itself, represented by an `id` field, as well as other data related to the verification and authentication methods of the DID.

[\<\< More on DID Documents \>\>](/docs/web5/decentralized-identifiers/did_documents)

## DID Method

A specific scheme for creating, resolving, updating, and deactivating DIDs and their associated documents, as outlined in a DID method specification which provides detailed instructions on these operations.

### DID Method - DHT

The `did:dht` method is based on the Pkarr project and utilizes BitTorrent's Mainline Distributed Hash Table (DHT) to anchor DIDs and store DID Documents. This approach ensures that the identity information is maintained in a decentralized manner. This method  allows operations like creating, reading, updating, and deactivating DIDs, and includes optional features like type indexing and gateway APIs for extended functionalities.

### DID Method - Jwk
The `did:jwk` method, similar to the `did:key` method, is designed for simplicity and self-containment in creating a DID. It involves encoding a JSON Web Key (JWK) using base64url. This method appeals to those seeking a straightforward approach.

### DID Method - Web

The `did:web` method is a type of Decentralized Identifier (DID) method that enables the creation of DIDs using a web domain name as the unique identifier, allowing for DIDs to be created and managed using existing web infrastructure and technologies, without requiring a specific blockchain or distributed ledger. The method utilizes HTTP(S) URLs to resolve DIDs and provides a flexible and decentralized way to manage digital identities on the web. However, the security and privacy of the `did:web:` method may depend on the web domain provider and the associated security measures in place.

## Key Store

A digital storage system that securely stores and manages a DID's cryptographic keys and key material, which is used for security protocols such as digital signing and verification.

## Portable DID

A Portable DID is a JSON-serialized representation of a [DID](#decentralized-identifier-did), including its URI, [DID Document](#did-document), and metadata. It's designed for easy storage, transfer, and reconstruction of a full DID across different systems or applications.

[\<\< More on Portable DIDs \>\>](/docs/web5/decentralized-identifiers/how-to-create-did#portable-did)

## Signature Algorithm

A mathematical algorithm used to generate digital signatures. These are used to verify the authenticity, integrity, and non-repudiation of electronic documents, messages, or transactions by creating a unique digital signature that can be cryptographically validated.


## Self-Sovereign Identity (SSI)

SSI refers to a concept where individuals have full control and ownership over their digital identities. It empowers individuals to manage and control their personal information without relying on centralized authorities or intermediaries. SSI enables individuals to store their personal data and identity in a secure and private manner. With self-sovereign identity, individuals can selectively share their personal information with others, granting access on a need-to-know basis all while maintaining privacy and control over their data.

## Verifiable Presentation

A Verifiable Presentation is a standard data container that serves as an authenticated wrapper around a set of credentials to be verified. They impose no constraints on who can construct them or what may be presented, allowing you to present multiple VCs issued to different DIDs.

[\<\< More on Verifiable Presentation \>\>](/docs/web5/verifiable-credentials/presentation-exchange#verifiable-presentation)
