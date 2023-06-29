---
title: Agents
---

**2 minute read**

## What is an agent?

When you [connect to Web5](/api/web5-js#connectoptions), you're connecting to an _agent_. An agent is software that acts on behalf of a user to manage identity, public or private data, and interactions with other apps in a decentralized network. 

You can think of an agent as a box that contains a user's [DIDs](/docs/web5/learn/decentralized-identifiers/), private keys, and a [DWN](/docs/web5/learn/decentralized-web-nodes/) (which can also hold [VCs](/blog/what-is-web5#verifiable-credentials)). Agents are capable of managing multiple DIDs and are permissioned to use the private keys of DIDs to act on a user's behalf. 

## Why is it called an agent?

We considered calling it a wallet, but that term is really overloaded. The idea of storing your personal data in a wallet didn't feel right. It would be a really thicc wallet. The kind of wallet that causes back problems.

_Agent_ is a term that describes something that can act on your behalf, which is one of the goals for our agents. 


## Where does an agent live?

A user's agent can live anywhere. It could be a headless process that runs on their computer; it could be their phone; it could be running on a machine at home. 

Agents don’t necessarily have root access over the user's device or even their data, but they do have all the authority necessary to provide agency.

Web5 doesn't have remote agents today, so it simply creates an embedded agent if one doesn't already exist. When connecting to a Web5 app, if the user doesn't have an agent at all, the library will:

* create a fallback embedded agent directly in the browser

* bootstrap that agent with a DID and a set of necessary keys needed to sign and encrypt things



## Why can't I connect directly to the DWN without an agent?

Interacting with a DWN is complex and when combined with DIDs, VCs, signing, encryption, and sync, there is a LOT to do.

A good analogy is that of a web browser as a "user agent" that's acting on behalf of a user when it interacts with web servers. Web browsers perform several key functions when interacting with web servers such as:

- requesting resources (dereferencing, redirects, caching, etc.)
- identifying itself with a user agent string to the web server to help the server deliver content that's optimized for the user's specific setup for
rendering web pages
- managing cookies, session data, and other local storage
- handling user interactions
- providing a user interface that's suitable for human / computer interaction 

If people had to do all of this manually, almost no one would use the web.

Similarly, Web5 agents do a lot of things on behalf of the user when interacting with decentralized web apps and other people/entities on a decentralized network:

- secure storage of data
- secure messaging and communication
- interoperability with other agents and networks
- user-controlled sharing of data
- identity verification and authentication
- identity revocation and recovery
- privacy and anonymity

Agents exist to handle these complexities on the user's behalf because it is too much for a human to do manually.

## What are future plans for agents?

In the near future, connecting to a Web5 app will invoke a UI that prompts a user to authenticate and grant an application access to said agent. Apps  can then request permissions to interface with a user's agent to store things in their DWNs.