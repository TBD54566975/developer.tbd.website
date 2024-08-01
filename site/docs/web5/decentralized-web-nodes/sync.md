---
title: Sync
sidebar_position: 9
---


Users are able to possess multiple [Decentralized Web Nodes (DWNs)](/docs/web5/decentralized-web-nodes/what-are-dwns) and have the data across each of them synchronized. This provides end users with the ability to own their data in resilient and convenient ways. 

In this guide, we’ll discuss what sync means in the context of DWNs and Web5, how it works, and what it means for you, your apps, and your end users.


## What is Sync?

In the context of DWNs and Web5, sync is the ability to synchronize all data across a user's multiple DWNs. 

When an application calls [Web5.connect()](https://tbd54566975.github.io/web5-js/classes/_web5_api.Web5.html#connect), by default, a DWN is created that runs in browser memory and is considered a local DWN. 

In addition, during Web5’s tech preview period, the SDK automatically defines two additional DWNs that are hosted by TBD and are remotely accessible (e.g., dwn.tbddev.org/dwn0, dwn.tbddev.org/dwn1).

When an application takes an action on a user’s local DWN (i.e., create, update, delete), with sync enabled, that action is automatically replicated to the other DWNs associated with the user’s DID. 

To understand the magnitude of this, let’s consider how we think of sync in our apps today. Dropbox, for example, allows us to synchronize our files across devices, but is dependent on either a web browser or platform-specific app to make that happen. Additionally, end users take a hard dependency on Dropbox to actually maintain the physical infrastructure for storing the data.

A service like iCloud may allow for users’ app data to sync across devices, but that functionality is locked to Apple’s platforms and requires developer input to enable the feature. 

In Web5.js, the same features that built billion dollar businesses are included, for free, and with even more functionality. Rather than every app being an island that has to figure out how to sync on its own, Web5 abstracts away sync for all of a user’s apps and data.


## Agents and Sync

Sync is orchestrated by an _agent_, which is responsible for acting on a user’s behalf to invoke the sync interface between nodes since the nodes themselves don’t actually implement this interface. In the same way that your browser has a user agent, so does your Web5 environment, which enables its agent to orchestrate privileged activities of user management on your behalf.

So why do we have agents to facilitate sync? The primary reason is because Web5 is built from a number of core components and libraries that all need to be knitted together. Libraries for DWN, DID, VC, networking, and more are all required to perform fundamental operations like sync, which is why we delegate that responsibility to an agent rather than asking app developers to perform these tasks. 

Imagine having to write code to open connections, sign data, and more every time you wanted to send a message to another DWN. Web5 abstracts away this complexity via agents.


## How Do I Use Sync?

The short answer is: you don’t have to explicitly think about this. Sync is automatically baked into DWNs created with Web5.js, and will handle syncing a user's local DWN with their remote DWNs. 

Although support for multiple remote DWNs does work, there are a number of improvements in store for this functionality. For now, you can expect a user who creates multiple DWNs with the same DID to get sync for free between their DWNs. All DWN URIs for a given DID are listed in the associated DID document, so Web5.js knows where to sync a DID subject’s data to, even if they later add more nodes. 

We’ve designed sync to be a seamless experience that developers and users alike shouldn't have to think about. Web5 is built to remove the burden of sync development from developers and make data portability and ownership a front-and-center feature.


## Sync Intervals

Although sync is designed to be automatic, seamless, and work in the background, it does have a 2 minute trigger interval that may prove too slow for some use cases. For example, in an instant messaging app, syncing your users messages across devices needs to be instantaneous. 

![Alice and Bob messaging via DWNs](/img/alice-bob-dwn.png)

There could also be scenarios where waiting for sync could lead to race conditions. You can [configure sync intervals](/docs/web5/decentralized-web-nodes/web5-connect#configure-sync-interval-when-connecting-to-web5), or force a sync between a user’s DWNs by calling [record.send()](https://tbd54566975.github.io/web5-js/classes/_web5_api.DwnApi.html#records).
