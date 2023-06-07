---
slug: did-parental-controls
title: Practical Applications of Decentralized Identifiers - Parental Controls
description: How Web5 is going to transform parental controls
authors:
  name: Chris Giglio
tags: [Decentralized Identity, Parental Controls, DID]
---

<head>
  <meta property="og:title" content="Practical Applications of Decentralized Identifiers: Parental Controls" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content='https://developer.tbd.website/blog/2023-05-23-dwas-vs-pwas' />
  <meta name="og:description" content="How Web5 is going to transform parental controls" />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/dwas-vs-pwas-478cc48cbfc1dd8176dc0c98cafcf16f.png" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta name="twitter:site" content="@tbddev" />
  <meta name="twitter:title" content="Practical Applications of Decentralized Identifiers: Parental Controls" />
  <meta property="twitter:url" content='https://developer.tbd.website/blog/2023-05-23-dwas-vs-pwas' /> 
  <meta name="twitter:description" content="How Web5 is going to transform parental controls" />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/dwas-vs-pwas-478cc48cbfc1dd8176dc0c98cafcf16f.png" />

  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>

![Practical Applications of Decentralized Identifiers: Parental Controls](/img/did-parental-controls.png)

Recently on the blog we talked about why[ decentralized identifiers ](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers)(DIDs) are a practical solution to real problems. [In that post](https://developer.tbd.website/blog/practicality-of-decentralized-identifiers) we discussed some high-level concepts behind how and why DIDs could solve many of the identity and data problems we face today, but today let’s dive deep on a specific problem set DIDs could solve: parental controls and minors’ digital security.

It’s an inescapable reality for parents today that their kids will be online. There’s no avoiding the reality that minors are going to consume a diverse array of content and interact with others on the internet, but parents do want to have a say in what’s put in front of their children. Digital safety is already incorporated by some services - such as Netflix - and platforms - like iOS - but universal parental controls and safety monitoring don’t presently exist. That could change, however, via DIDs and a concept known as DID controllers.

<!--truncate-->

Before we dive into how DIDs can facilitate universal parental controls, it’s fair to acknowledge that giving adults the ability to have such control over minors may represent a potential risk to those minors’ freedoms. While that is absolutely a valid concern, it’s also true that regardless of DIDs or Web5, as a society we are pushing forward towards a future with more sophisticated parental controls. Federal lawmakers recently [introduced](https://sg.robinhood.com/ls/click?upn=6fntGirSE5selsQKrSSUHhYEbJQr-2FOms0-2Budh-2FjizGqQjBZ-2F-2Fr1OqtAW5Vk-2Fh5nDTBbGXewV1rTmTAQ8J-2FnHutGze-2FZdRujL0z-2BT7TPQq2rMPP57Ry7H581UcM0jJNpbmEdo_JY5fc7bPIFJAvDYWnO7d4p-2FX8FAV-2BsZ9F4kAeTjyMnD-2BG0K2bZ0-2FUf-2BuopiaAntAAkVBHDuQJAFvEBGYqFHT51-2FSOTDJz-2B8jhQIBwTwwfjU6PpsWQkmsRZ-2FHGMwJynKK9gXf8AtDP1YE6sEYYtMtmmDlG6CvQMea0rUNVpY-2FTuOKnGNSHlL9NK2Jk0q4-2FRpQ-2BbFtdlnhiQK67JNVXPiMBWqgHoT-2FNCfxxr-2F4bbdre3UHJXnBVp4xhgpxhidBEbUjonDeOsX9WuX1m9sAXLuuDylpr6dFaUbCX7V9cjRoJcnvuSBxBCwsyz0eXjWABCQjrAy9oqfdT13fwQv3bIrZGwi4hMa7GsMULwMU-2BKacfPI2kJLSHpJVUvTj0CZluT9SEPpZc9wYkLrSqv2BgqnbOZJ7IEA2ZR7oNF91e94HvIaC4j-2BaatuJDdofN1Qyqph57vfWyKDAUWfEKruDuKv7ecdo-2BsRt4-2B7nt9ljpyuTRmSS458UlBFpp4g2s9qHyc0FXVVo4C3KZLpSWPmsT58L-2BObuk46zQ4wSPr-2B7SqxnCCx-2BoK4Ttt0AhCjjxnitNriSjzZgupScdseXH00RSO3rOmi1G295urhUXfGvnevAqZh2CKf-2F3fPEn5uA9-2BNDOSVhZB-2BUEqZmRd8ND43TkEmHRQ-3D-3D) a bipartisan bill that seeks to establish a national minimum age for posting on social media, signaling this direction in public policy. The “Protecting Kids on Social Media Act'' would ban platforms like TikTok, Snap, and Instagram from letting kids younger than 13 create accounts — and require platforms to get parental consent to open accounts for users under 18. 

With things like government-run age verification and limitations on tracking minors, it’s very clear that minors will experience restrictions and the infrastructure to enforce those restrictions is coming. In this post, we’ll cover how Web5 could provide the implementation of that system.


## DID Controllers and the Controller Paradigm

Every DID is a string representation of an entity - the _subject_ - that is described by a DID _document_ enumerating things like cryptographic public keys and delegate/controller patterns. Those patterns allow for another DID, the _controller_, to make changes to the DID document. So what does this all mean for parents?

Minors are constantly interacting with new digital and physical services that carry age restrictions or limitations. For example, it’s generally viewed as a good thing when platforms censor certain content from being viewable to those under 18. While these types of constraints are generally tied to age and state-issued licenses, those forms of identification can be forged and circumvented and offer no entry point for parents to intervene. A DID controller model, however, allows for parents to intervene at an identity level to place appropriate restrictions on their children.


## Parents of a DID Child: A Case Study

Imagine Alice and Bob welcome their new daughter Carol into the world, and at birth she’s assigned a DID over which Alice and Bob are made controllers. Immediately, whenever anyone tries to resolve Carol’s DID and obtain her DID document, they’ll see that Alice and Bob’s DIDs are controllers over her DID. As Alice and Bob check their daughter out of the hospital, there’ll be a million pieces of paperwork to fill, but proving their identity will be easy so long as they provide proof that they own the DIDs that are controllers over Carol’s DID.

As Carol starts to take her first steps, Alice and Bob enroll her in daycare. Wanting to be certain only Alice, Bob, and their parents can pick up Carol from daycare, Alice and Bob edit Carol’s DID document to ensure that the “daycare” or “supervision” [protocol](https://developer.tbd.website/docs/web5/learn/protocols) only allows for Carol to be picked up by the specified DID-holders.

With Carol growing older, she may begin to want to explore more shows and media than the educational programs her parents put on for her. Alice and Bob may want to allow Carol to explore the internet on her own a bit, so they give her access while restricting her usage. For now, she’s only allowed to visit YouTube with some strict parental filters they’ve set at her DID-level, so that even when they graduate her to more websites she does not accidentally stumble onto content they don’t want her seeing. Additionally, because they’re controlling her DID and not just her account on a single service, any service that accepts that DID and communicates over the protocols that they’ve specified will honor the restrictions they’ve placed on their daughter. For example, let’s say Alice and Bob want to always restrict videos that contain violence from being viewable by Carol, and do so by specifying that videos with violence should be blocked according to a universal video content moderation protocol. Then, all content platforms that respect the universal video content moderation protocol should automatically block that content!

With her teenage years coming on, Carol may be tempted to stay up late and message her friends, but mom and dad know that Carol needs her sleep. Bob and Alice could, as controllers, restrict her access to her texts after 10pm with the exception of a few critical family members.

Finally, when Carol does age out of her parents’ home, they can relinquish their controllership or even set it to expire at a given date. This parental use case is perfect for Web5 as it showcases how open, universal protocols, a decentralized web, and DID controllership enable improved and seamless experiences over our currently fractured, standardless web.

If all of this sounds interesting to you, join us in building Web5 by checking out our [GitHub](https://github.com/TBD54566975), including our growing [web5.js SDK](https://developer.tbd.website/docs/), where you can find and collaborate on the tools we’re creating to build the next web.
