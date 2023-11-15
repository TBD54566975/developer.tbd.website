---
slug: web5-meets-generative-ai
title: "Web5 Meets Generative AI"
description: How Netonomy is reimagining the future of digital identity with Web5 and AI
authors:
  name: Rizèl Scarlett
tags: [Decentralized Identity, Decentralized Web Nodes, Artificial Intelligence, Community]
---

<head>
  <meta property="og:title" content="Web5 Meets Generative AI" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content='https://developer.tbd.website/blog/2023-11-14-web5-meets-generative-ai' />
  <meta name="og:description" content="How Netonomy is reimagining the future of digital identity with Web5 and AI" />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/web5-meets-generative-ai.png" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta name="twitter:site" content="@tbdevs" />
  <meta name="twitter:title" content="Web5 Meets Generative AI" />
  <meta property="twitter:url" content='https://developer.tbd.website/blog/2023-11-14-web5-meets-generative-ai' /> 
  <meta name="twitter:description" content="How Netonomy is reimagining the future of digital identity with Web5 and AI" />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/web5-meets-generative-ai.png" />

  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>

![Web5 Meets Generative AI](/img/web5-meets-generative-ai.png)

"What can you actually build with Web5?" This is one of the most common questions I've heard as I enter my two-month mark at TBD. It's one thing to discuss the theoretical aspects of Web5, with its focus on decentralization and user empowerment, but it's another to see tangible, innovative applications come to life. This is why builders, visionaries, and project maintainers at TBD are excited to showcase [Netonomy](https://www.netonomy.io/), a [Web5](https://developer.tbd.website/docs/web5/) project built by [Anthony Dimatteo](https://github.com/demattosanthony).

<!--truncate-->

## What is Netonomy?

Anthony describes Netonomy as "an application that allows users and organizations to own their digital identities, data, and finances." The goal is to give users a digital home for their identity, data, and assistants - all under their control and not dependent on centralized platforms. Netonomy leverages Web5 concepts for data management and storage, but it also incorporates artificial intelligence through vector databases. 

Here's how it works from a user perspective: a user can upload any document, from developer documentation to rental insurance information. Then, the user asks an AI-powered chat assistant questions about details within the document, such as "When does my rental insurance expire?" Subsequently, the chat assistant would quickly search the document and respond to the user.

## Which Web5 technologies does Netonomy use?

Anthony used the following Web5 technologies to build Netonomy:

* **[Decentralized Identifiers (DID)](https://developer.tbd.website/docs/web5/learn/decentralized-identifiers)** - The app generates a DID to identify you when you first launch it. This is stored in the browser and acts as your identity.
* **[Decentralized Web Nodes (DWN)](https://developer.tbd.website/docs/web5/learn/decentralized-web-nodes)** - A DWN is created in the browser to store your data encrypted securely. Anthony uses it to store uploaded files.

## Future plans

There are many cool features Anthony wants to explore next, including:

* **Decentralized vector databases** - When you upload files like PDFs, the content is extracted and indexed in a vector database. Vectors allow data developers to embed data for meaning and quickly queried. The vector database is centralized, for now, hosted by Anthony. But he wants to eventually decentralize it by storing vectors directly in the DWN 
* **Data sharing** - Via protocols to share files with other DID owners
* **Payments** - Integrate Bitcoin and blockchain payments
* **Contacts directory** - Manage contacts via DIDs
* **Messages** - Decentralized messaging between DWNs
* **Mobile app** - Bundle DWN in a mobile app for access across devices

## Check it out!

To accelerate development, Anthony plans to open-source the project and invite community contributions. You can check out [Netonomy on GitHub](https://github.com/Netonomy/netonomy). 

## Rewatch the full episode
Learn more about what he's building and watch the full live stream [here](https://www.youtube.com/watch?v=oQ9Vq_Moa8I).

<div className="flex justify-center">
  <div className="w-full sm:w-auto sm:max-w-[560px]">
    <div className="overflow-hidden relative" style={{ paddingTop: "56.25%" }}>
      <iframe 
      width="560" 
      height="315" 
      src="https://www.youtube.com/embed/oQ9Vq_Moa8I" 
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
      className="absolute top-0 left-0 w-full h-full">
      </iframe>
    </div>
  </div>
</div>