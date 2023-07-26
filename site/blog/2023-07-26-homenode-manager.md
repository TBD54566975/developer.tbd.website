---
slug: homenode-manager
title: Protocol-Based Messaging with HomeNode Manager
description: Homenode Manager is a project created by community member, longform, which enables you to send and receive DWN messages using a protocol
authors:
  name: nearlyjuly
tags: [Decentralized Web Nodes, Decentralized Identity, Protocol, Community]
---

<head>
  <meta property="og:title" content="Protocol-Based Messaging with HomeNode Manager" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content='https://developer.tbd.website/blog/homenode-manager' />
  <meta name="og:description" content="Homenode Manager is a project created by community member, longform, which enables you to send and receive DWN messages using a protocol" />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/homenode-porotcol-messaging.jpg" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta name="twitter:site" content="@tbdevs" />
  <meta name="twitter:title" content="Protocol-Based Messaging with HomeNode Manager" />
  <meta property="twitter:url" content='https://developer.tbd.website/blog/homenode-manager' /> 
  <meta name="twitter:description" content="Homenode Manager is a project created by community member, longform, which enables you to send and receive DWN messages using a protocol" />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/homenode-porotcol-messaging.jpg" />

  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>

![Protocol-Based Messaging with HomeNode Manager](/img/homenode-porotcol-messaging.jpg)

I wanted to learn more about how Web5 (and SSI in general) works and the benefits it could offer. To do this I created a simple project to create and store DIDs, and use them to read and write to a DWN using a protocol.

<!--truncate-->

I used the [DWN SDK](https://github.com/TBD54566975/dwn-sdk-js) to create a standalone DWN, which I called a HomeNode. To create DIDs I looked at the different methods available and chose ION as I could use the [ION Tools](https://github.com/decentralized-identity/ion-tools) repo to do all the hard work. With ION Tools and the DWN SDK I then made a separate repo for interacting with the DWN, which I called a HomeNode Manager.

To test things out I created two ION-anchored DIDs (anchoring takes some time to complete) and set one of them as the tenant of the DWN. This meant only messages created by and sent to the tenant DID would be accepted by the DWN, even if the other DID was also a tenant. 

To grant the second DID permission to send a message to the tenant DID, I installed a straightforward protocol to allow this. The protocol allowed a plain text message to be sent to the tenant DID by stipulating the protocol path and schema needed. If the protocol was deleted or reconfigured to stop further messages being written then the existing messages could still be accessed by the tenant. Note, there are other ways to achieve this result such as granting permission directly or perhaps using another DWN to receive messages and syncing them to other personal DWNs. 

My reflections are that Web5 isn't at all how I thought it would be. It does not involve having to learn a whole new framework and you have an awful lot of freedom to build exactly what you need with your preferred tools. You could even create your own DWN SDK if you really wanted to as it's based on a DIF specification. For me, the main concern is storage and usage of keys for signing and encrypting messages. There are so many aspects to consider and seemingly lots of ways to really mess it up. 

The people in the [TBD Discord](https://discord.gg/tbd) patiently put up with a lot of questions I had making this project, they really know their stuff. There is a channel called [share-what-you-do-✨](https://discord.com/channels/937858703112155166/1098207585661878402) where you can post your own projects. I definitely recommend having a go as it really helps pin down exactly what this technology can do for you.

My project is available on [GitHub](https://github.com/nearlyjuly/HomeNode-Manager) if you would like to try it out for yourself (and no doubt code a much better version). 
