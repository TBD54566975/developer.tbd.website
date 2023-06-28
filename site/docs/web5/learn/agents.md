---
title: Agents
---

**2 minute read**

## What is an agent?

When you [connect to Web5](/api/web5-js#connectoptions), you're connecting to an _agent_. You can think of an agent as a box that contains a user's [DIDs](/docs/web5/learn/decentralized-identifiers/), private keys, and a [DWN](/docs/web5/learn/decentralized-web-nodes/) (which can also hold [VCs](/blog/what-is-web5#verifiable-credentials)).

## Why is it called an agent?

We considered calling it a wallet, but that term is really overloaded. The idea of storing your personal data in a wallet didn't feel right. It would be a really thicc wallet. The kind of wallet that causes back problems.

_Agent_ is a term that describes something that can act on your behalf, which is one of the goals for our agents. 


## Where does an agent live?

A user's agent can live anywhere. It could be a headless process that runs on their computer; it could be their phone; it could be running on a machine at home. 

Web5 doesn't have remote agents today, so it simply creates an embedded agent if one doesn't already exist. When connecting to a Web5 app, if the user doesn't have an agent at all, the library will:

* create a fallback embedded agent directly in the browser

* bootstrap that agent with a DID and a set of necessary keys needed to sign and encrypt things

## Why can't I connect directly to the DWN without an agent?

Simply put, DWNs are designed to be dumb. 

A DWN's purpose is to process messages. All messages must be signed and associated to an author and tenant. Authors and tenants are represented as DIDs. 

Messages are signed by a key associated to that DID. So an agent includes all of the things necessary to sign and store messages in a DWN.

## What are future plans for agents?

In the near future, connecting to a Web5 app will invoke a UI that prompts a user to authenticate and grant an application access to said agent. Apps  can then request permissions to interface with a user's agent to store things in their DWNs.