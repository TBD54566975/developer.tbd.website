---
slug: practicality-of-decentralized-identifiers
title: The Practicality of Decentralized Identifiers
description: What are the practical applications of DIDs?
authors:
  name: Chris Giglio
tags: [Web5, Decentralized Identity]
---

<head>
  <title>The Practicality of Decentralized Identifiers</title>
  <meta property="og:description" content="What are the practical applications of DIDs?" />
  <meta property="og:title" content="The Practicality of Decentralized Identifiers" />
  <meta property="og:url" content='https://developer.tbd.website/blog/practicality-of-decentralized-identifiers' />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/practicality-did-blog-banner-2e81ddb567c7950d67869b9b3b05da62.png" />
  
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/practicality-did-blog-banner-2e81ddb567c7950d67869b9b3b05da62.png" />
  <meta name="twitter:site" content="@tbddev" />
  <meta name="twitter:title" content="The Practicality of Decentralized Identifiers" />
  <meta name="twitter:description" content="What are the practical applications of DIDs?" />
  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>

## 

![The Practicality of Decentralized Identifiers](/img/practicality-did-blog-banner.png)

You may know what a [decentralized identifier (DID)](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers) is or even how to generate one, but you may be wondering: what’s the point of yet ANOTHER way to identify myself? To get a better sense of the why behind decentralized identifiers, we’ll discuss the real problems society faces today when it comes to identity, and why DIDs are an enormous practical solution to a pervasive set of problems.

<!--truncate-->

## Identity
Whether or not you consider yourself an “online” person, there are a million ways we currently identify ourselves. Do you have an email address? That’s an identity. A driver’s license? Another one there. A Twitter handle? An Instagram account? A phone number? Check, check, check. There are a seemingly incalculable number of ways we can be identified and reached in today’s day and age.

Today, however, our identities are deeply entangled with services and the companies that own them. Your Twitter handle, for example, is exclusive to Twitter - good luck trying to get the same username on Instagram. Want to view your text messages alongside your Facebook messages with a person? Not happening. Lastly, good luck trying to recover your data if your service of choice suddenly were to shut down. To put it even more simply, Bob may be able to say “hi my name is Bob” on one social network A, but the name “Bob” may be reserved on social network B, preventing him from claiming the same name or handle over there. Moreover, if Bob has been a long time user of music app A and decides one day to migrate to music app B, he’ll need to go through the painful process of migrating all his playlists and songs over to the new service.

## The Data Problem and Solution
![](/img/evolving-the-web.png)
So what’s the fundamental issue DIDs are trying to solve? Simply put, users don’t own their data - services do - and their identity is fragmented across a host of handles, cards, and more. Ideally, we’d have a single form of identification with strong authentication and deep ties to data ownership, rather than scattered identities, lost passwords, and data owned by someone else. All of these concerns are valid and, it’s important to note, not simply hype around a shiny new toy.

DIDs solve these problems by coming alongside something called a [Decentralized Web Node (DWN)](https://developer.tbd.website/docs/web5/learn/decentralized-web-nodes). Think of DIDs as the identifiers that will allow you to have a truly universal single sign-on experience, while DWNs are a form of data storage that will permit you to own your data while simultaneously being able to use and enjoy all the same kinds of services you currently do.

DIDs are, as the name suggests, decentralized - so they’re inherently not controlled, operated, or regulated by a centralized authority like our current identifiers are. You can have as many DIDs as you’d like, but you can also have a main DID act as a controller for your other DIDs to help consolidate or partition data when needed, as well as enforce limitations when appropriate. The implications of both decentralization and a controller paradigm are enormous for a vast number of use cases.

## Life, Decentralized
Consider this: Bob has a single DID that acts as his main identifier, but he wants to detangle his work and personal identities to avoid having everything come into the same inbox on weekends. He creates two new DIDs that are controlled by his main identity, and labels them as “personal” and “work.” All of his work emails, calls, texts, and notifications are connected to his work DID, and he can easily silence that noise come Friday night. He can still authenticate to all of those services and own all of that data through his primary DID since it’s the controller, but can also easily filter through his data since he’s filed his work things under a separate DID. On the personal side of things, Bob can sign up for new services every day without worrying about migration because he owns all of his data: the second he signs up for a new service, like a social network, he can grant that app access to the media stored on his DWN and that service can act as a presentation layer for his data. Even better, his employer can also act as a controller on his work DID, allowing them to enforce enterprise requirements while keeping completely siloed from his personal data.

In this paradigm, Bob doesn’t worry about remembering a million passwords or losing his data to a service. The new “password” for Bob’s life is access to his main DID, which is protected by his private keys that can be stored in a number of secure ways, including on a physical drive or in a secure digital wallet. Just as significantly, Bob can keep his personal and work lives separate while allowing there to be appropriate separations of authority over his different data silos.

## Identity Reinvented
So why do you want a DID? Really, the question is, why do you want to shift to a Web5 paradigm? Because identity portability and data ownership are massive yet silent problems we deal with every day. And how will this shift happen? Through the proliferation and adoption of DIDs, the popularization of DID controller paradigms and DWNs, and the availability of mass-appeal wallets to enable secure usage of DIDs. The general public wouldn’t ever be expected to have a technical understanding of these concepts, but their proliferation will depend on new and existing apps integrating this tech and presenting it to consumers in an easily-digestable way. We don’t just have to limit ourselves to imagining using this design to separate personal and work life - we can use it to allow for advanced parental controls, role access, and more.

If a Web5 future that returns ownership to users and decouples platforms from data sounds appealing to you, be sure to check out our ongoing projects on [GitHub](https://github.com/TBD54566975) or join us on [Discord](https://discord.gg/tbd).

