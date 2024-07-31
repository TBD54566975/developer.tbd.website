---
slug: simplifying-cross-platform-payments-daps
title: "Simplifying Cross-Platform Payments with DAPs"
description: "Introducing Decentralized Agnostic Paytags, a universal money address tied to Decentralized Identifiers"
authors:
  name: Rizèl Scarlett
tags: [Decentralized Agnostic Paytags, Decentralized Identifiers]
---

<head>
  <meta property="og:title" content="Simplifying Cross-Platform Payments with DAPs" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content='https://developer.tbd.website/blog/simplifying-cross-platform-payments-daps' />
  <meta name="og:description" content="Introducing Decentralized Agnostic Paytags, a universal money address tied to Decentralized Identifiers" />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/dap-blog-banner-d55bb8a8e9be07140115da693c79fa21.png" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta name="twitter:site" content="@tbdevs" />
  <meta name="twitter:title" content="Simplifying Cross-Platform Payments with DAPs" />
  <meta property="twitter:url" content='https://developer.tbd.website/blog/simplifying-cross-platform-payments-daps' /> 
  <meta name="twitter:description" content="Introducing Decentralized Agnostic Paytags, a universal money address tied to Decentralized Identifiers" />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/dap-blog-banner-d55bb8a8e9be07140115da693c79fa21.png" />

  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>

![Simplifying Cross-Platform Payments with DAPs](/img/dap-blog-banner.png)

"Dap me up!" is a colloquial term followed by a gesture used in Western cultures to greet people or express solidarity. At TBD, we're adding a new meaning to this phrase with Decentralized Agnostic Paytags (DAPs), an open source approach designed to simplify peer-to-peer payments across various applications.

<!--truncate-->

## Solving an Awkward Issue

Peer-to-peer (P2P) payment applications have existed since the late '90s, starting with tools like PayPal. With the rise of smartphones, innovative mobile apps like Venmo, Zelle, and Block's very own Cash App have made it easier to exchange funds directly from our phones. 

However, a persistent issue remains: the sender and recipient must use the same app to complete a transaction. People have personal and valid reasons for choosing their preferred payment apps.

This situation creates an uncomfortable, unspoken battle when you need to pay a friend after dinner or a contractor for a service, only to discover that you use CashApp while they use Venmo. Now, you both face the dilemma of deciding who will download a new app, set up a new account, and link it to their bank account.

With DAPs, it doesn't matter which app you prefer. You can use a DAP to transfer funds and financially "dap each other up."


## Introducting Decentralized Agnostic Paytags (DAPs)

A DAP is a user-friendly handle for payments, structured as `@local-handle/domain`. 

Here's an example: I love the handle blackgirlbytes. If I registered that handle on Cash App's DAP registry, my DAP would be `@blackgirlbytes/cash.app`. Similarly, if I registered that handle on DIDPay's DAP registry, my handle would be `@blackgirlbytes/didpay.me`.

Each DAP links to a [Decentralized Identifier (DID)](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers) to help identify who you are, regardless of the platform. While your DID includes cryptographic keys for identity protection, it also contains your money address—a unique identifier that directs different payment systems where to send your funds.

## Get Started with DAPs

The DAP ecosystem has two key actors: the payment platform that offers DAPs and the users who own the DAPs.

**For Organizations:** Any organization can enable users to create a DAP on their platform by setting up a DAP registry associated with their domain. This registry serves two main functions:
* It allows users to sign up for DAPs.
* It maps users' DAPs with their DID and money address.

**For Users:** Once a DAP registry is available on your preferred platform, you can sign up for a DAP using your chosen handle.

If you're eager to experiment with DAPs but your preferred payment platform hasn't implemented a DAPs registry yet, you can obtain a DAP via our [static DAP registry](https://github.com/TBD54566975/dap-registry-static).

## Keep Up to Date

DAPs debuted during a company-wide Hackathon at Block, where TBD, Cash App, and Square teams collaborated to bring this vision to life. As the DAP implementation continues to evolve, here are ways you can get involved:

* Join the [TBD Discord](http://discord.gg/tbd)
* Read the DAP [specification](https://github.com/TBD54566975/dap)
* Contribute to the open source SDKs:
    * [DAP-JS](https://github.com/tbd54566975/dap-js)
    * [DAP-GO](https://github.com/tbd54566975/dap-go)
    * [DAP-KT](https://github.com/tbd54566975/dap-kt)
    * [DAP-DART](https://github.com/tbd54566975/dap-dart)
* Create a DAP in our [static DAP registry](https://github.com/TBD54566975/dap-registry-static)

**Watch the video below to learn more**

<iframe class="aspect-video" src="https://www.youtube.com/embed/raFmsGNQtb8?si=CF-VqBxDWWyikEk3" title="daps show and tell" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>