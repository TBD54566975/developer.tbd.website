# Glossary


## Centralized Authority
A single entity or organization that has control over the network and its operations, potentially posing a risk to the principles of decentralization and autonomy.

## Decentralized Identifier (DID)
A Decentralized Identifier (DID) is a globally unique identifier that enabled verifiable, decentralized digital identity, without the need for centralized intermediaries. DIDs are typically implemented using decentralized and distributed ledger technologies, such as blockchain, and provide a way to verify and authenticate digital identities, while ensuring privacy and control over personal data.

## Decentralized Web Node (DWN)
A Decentralized Web Node is a personal data store in a decentralized network that stores and shares information, serves as a communication channel, and executes transactions in a distributed manner, without relying on a centralized server, thereby enhancing security, privacy, and resilience of the network.

## DID Document
A JSON document containing details about a DID, including the DID itself, represented by an `id` field, as well as other data related to the verification and authentication methods of the DID.

## DID Method
A specific scheme for creating, resolving, updating, and deactivating DIDs and their associated documents, as outlined in a DID method specification which provides detailed instructions on these operations.

### DID Method - ION
The `did:ion:` method leverages the scalability and security of the Bitcoin blockchain by using off-chain transactions to create and update DIDs, while utilizing on-chain transactions for anchoring and providing proof of the DID's existence and integrity. The `did:ion:` method aims to provide a secure, scalable, and decentralized solution for managing digital identities that is interoperable with other decentralized identity solutions.

### DID Method - Key
The `did:key:` method is a simple, lightweight way to create a DID. It is based on a public key, and it is self-contained, meaning it does not rely on any external blockchain or registry. This makes `did:key` a convenient method for use cases that don't require the complexity and additional features provided by other DID methods.

### DID Method - Web
The `did:web:` method is a type of Decentralized Identifier (DID) method that enables the creation of DIDs using a web domain name as the unique identifier, allowing for DIDs to be created and managed using existing web infrastructure and technologies, without requiring a specific blockchain or distributed ledger. The method utilizes HTTP(S) URLs to resolve DIDs and provides a flexible and decentralized way to manage digital identities on the web. However, the security and privacy of the `did:web:` method may depend on the web domain provider and the associated security measures in place.

## Key Store
A digital storage system that securely stores and manages a DID's cryptographic keys and key material, which is used for security protocols such as digital signing and verification.

## Signature Algorithm
A mathematical algorithm used to generate digital signatures. These are used to verify the authenticity, integrity, and non-repudiation of electronic documents, messages, or transactions by creating a unique digital signature that can be cryptographically validated.

## Sidetree Protocol
The Sidetree protocol is a decentralized and blockchain-agnostic protocol that enables the creation and management of decentralized identifiers (DIDs) and their associated data off-chain, while utilizing the blockchain as a trust anchor for anchoring DID operations, thereby reducing the load on the blockchain and enhancing scalability.

## Self Sovereign Identity (SSI)
SSI refers to a concept where individuals have full control and ownership over their digital identities. It empowers individuals to manage and control their personal information without relying on centralized authorities or intermediaries. SSI enables individuals to store their pesonal data and identity in a secure and private manner. With self-sovereign identity, individuals can selectively share their personal information with others, granting access on a need-to-know basis all while maintaining privacy and control over their data.

