---
slug: 7-ways-we-use-vcs-today
title: "7 Unexpected Ways Verifiable Credentials Are Used Today"
description: "Verifiable Credentials are more than a buzzword. Discover 7 real-world use cases revealing their hidden impact."
authors:
  name: Rizèl Scarlett
tags: [Verifiable Credentials, Web5]
---

<head>
  <meta property="og:title" content="7 Unexpected Ways Verifiable Credentials Are Used Today" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content='https://developer.tbd.website/blog/7-ways-we-use-vcs-today' />
  <meta name="og:description" content="Verifiable Credentials are more than a buzzword. Discover 7 real-world use cases revealing their hidden impact." />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/7-ways-we-use-vcs-banner-8a8dea8051868deb97d246064cb5aef0.png" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta name="twitter:site" content="@tbdevs" />
  <meta name="twitter:title" content="7 Unexpected Ways Verifiable Credentials Are Used Today" />
  <meta property="twitter:url" content='https://developer.tbd.website/blog/7-ways-we-use-vcs-today' /> 
  <meta name="twitter:description" content="Verifiable Credentials are more than a buzzword. Discover 7 real-world use cases revealing their hidden impact." />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/7-ways-we-use-vcs-banner-8a8dea8051868deb97d246064cb5aef0.png" />

  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
  <link rel="canonical" href="https://dev.to/tbdevs/7-unexpected-ways-verifiable-credentials-are-used-today-438" />
</head>

![7 Unexpected Ways Verifiable Credentials Are Used Today](/img/7-ways-we-use-vcs-banner.png)

"Verifiable Credentials seem niche. Only a small group of technologists would be interested in this," a conference attendee declared after I enthusiastically described my company's work in the Global Payments and Self-Sovereign Identity (SSI) ecosystem.

This comment gave me pause. Less than a year ago, I first encountered [Verifiable Credentials (VCs)](https://developer.tbd.website/docs/web5/learn/verifiable-credentials) - a W3C standard for digital credentials that state specific facts about individuals, organizations, or entities. My initial reaction was similar to the conference attendee’s response. However, after interviewing SSI builders on a weekly livestream, my perspective changed dramatically.

While VCs are relatively new and primarily explored by SSI enthusiasts, their benefits extend far beyond this group. Many of the services and products you use today already rely on them – even if you don't realize it.

From healthcare to content creation, finance to travel, VCs are changing how we share and verify information. Here's a look at seven real-world applications of VCs that may surprise you:

<!--truncate-->

## 1. Mobile Driver’s Licenses

If you often misplace your wallet like me, there's good news — your state may support the use of Mobile Driver's Licenses (mDLs). Louisiana was the [first state to implement mDLs](https://envoc.com/case-study/the-nations-first-digital-drivers-license/#:~:text=July%202018%3A%20LA%20Wallet%20is,as%20fishing%20and%20hunting%20licenses.) in 2018. Since then, mDLs have been [gaining traction](https://www.aamva.org/jurisdiction-data-maps#anchorformdlmap) across the United States.  With mDLs, residents of participating states can store a digital version of their driver's license on their smartphones. This allows users to leave their physical ID at home and use their phones for identification in various situations, including travel, age-restricted services, voting, and law enforcement interactions.

VCs are the technology behind mDLs because they offer features like revocation, authentication, expiration, and tamper evidence. If you use an mDL, you're using VCs!

![Louisiana mDL Wallet](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wpr2jpmtbgg4a8axwtvr.png)

_Source: https://lawallet.com/_


## 2. The Pharmaceutical Supply Chain

[Dr. Carsten Stöcker](https://www.linkedin.com/in/dr-carsten-st%C3%B6cker-1145871/), CEO of [Spherity](https://www.spherity.com/), introduced me to a fascinating application of VCs in the pharmaceutical industry. Pharmacies often trade medicines with each other to maintain their stock, but this exchange requires complex verification processes. They must verify the legitimacy of three key elements: 

* the medicine,
* the organization they're trading with,
* the provider making the trade

[Caro.vc](http://Caro.vc), a Spherity company, employs VCs to simplify this process and reduce errors. Their solution allows pharmacies to quickly and securely verify all these elements, ensuring the integrity of the pharmaceutical supply chain.

**To learn more about this use case, check out this discussion between Dr. Carsten Stocker and the Developer Relations Team at TBD:**

<iframe class="aspect-video" src="https://www.youtube.com/embed/5_2wCT9Tlb0?si=0VRp5EnA0NxfdVss" title="Trust Me I'm a Pharmacist" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 3. Content Creation and Generative AI

Content creation has played a considerable role in our online lives for the past few years. For some, it has become a career, launching individuals into fame. However, whether you're an artist, seamstress, or photographer, people often steal and claim work that you made.

Additionally, a new form of content creation has hit the scene: generative AI. While many use it for productivity, others exploit it to spread misinformation or generate false images and videos in the likeness of others.

Organizations like Adobe, BBC, Microsoft, Sony, and Nikon formed the [Content Authenticity Initiative](https://contentauthenticity.org/) and the [Coalition for Content Provenance and Authenticity](https://c2pa.org/) to address these issues. These groups developed Content Credentials, which use VCs to tackle the challenges of content theft and misuse of AI-generated content, aiming to protect creators’ rights.

![Wrapt image with content credential](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ocxbqej9t5ri349kla0t.png)

_Source: [https://contentauthenticity.org/blog/community-story-wrapt](https://contentauthenticity.org/blog/community-story-wrapt)_

Click this [link](https://contentauthenticity.org/blog/community-story-wrapt) to read the case study, view the above image, view the above image, and view the image's content credentials.

## 4. Music Copyright

Musical artists typically don't own their masters, meaning they lack full control over their recordings when signing a record deal. Today, more musical artists are opting to own their masters to regain control over the distribution of their work. [Cole Davis](https://www.linkedin.com/in/colesdavis/) describes the publishing and distribution of music as a "music supply chain" and observed a disjointed process involving agreements through text messages, scattered emails between lawyers, and inconsistent procedures.

To address these issues, Davis built [Switchcord](https://www.switchchord.com/), using VCs to provide cryptographic proof of who was involved in creating a song, when it happened, and what contracts were signed. This ensures all participants receive proper credit and compensation, preventing false claims.

**To learn more about this use case, check out this discussion between Cole Davis and the Developer Relations Team at TBD:**

<iframe class="aspect-video" src="https://www.youtube.com/embed/NBvryBhD9YY?si=Mk_IV3XLqPtqBswiY" title="The Sound of Ownership" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 5. Loan Applications

The U.S. credit system requires residents to accumulate debt as a prerequisite for obtaining loans, leading to more debt. Recent[ data from the Federal Reserve Bank of New York](https://www.newyorkfed.org/microeconomics/sce/credit-access#/experiences-credit-demand1) underscores this systemic issue, revealing that 1 in 5 applicants for mortgages, car loans, or other loans were rejected — the highest rate in five years.

[FormFree](https://formfree.com/) is addressing this problem using the [Web5 SDK](https://developer.tbd.website/docs/web5/) to provide VCs for loan borrowers through their [Passport](https://www.formfree.com/passport/) product. Their approach involves creating an anonymized, tamper-proof credit profile as a VCs for lenders to review and make offers, aiming to put power back in the hands of the borrower.

**To learn more about this use case, check out this discussion between the FormFree team and the Developer Relations Team at TBD:**

<iframe class="aspect-video" src="https://www.youtube.com/embed/vXYyT8rLaR4?si=ioQbSkiDEJ3t5XQb" title="Democratizing Loans" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 6. Online Marketplaces and Catfishing

Unfortunately, online marketplace scams are common. From purchasing a car to renting a home or adopting a pet, you can buy and sell almost anything online. However, there's no foolproof mechanism to ensure the seller is trustworthy.

With the rise of social media, catfishing — where a person pretends to be someone they're not while online dating — has also increased dramatically. While many believe they're not susceptible, [23%](https://wifitalents.com/statistic/social-media-catfish/) of online dating participants reported being catfished, and [41%](https://wifitalents.com/statistic/social-media-catfish/) of catfish victims are between the ages of 18 and 34. 

[Jeffrey Schwartz](https://www.linkedin.com/in/jeffrey-alan-schwartz) created [Dentity](https://www.dentity.com/) to reduce the frequency of scams and catfishing incidents. Dentity uses VCs to verify individuals on any platform, from dating apps to online marketplaces. 

**To learn more about this use case, check out this discussion between Jeffrey and the Developer Relations Team at TBD:**

<iframe class="aspect-video" src="https://www.youtube.com/embed/hnNZcqfbBFE?si=4sG6LGexwVOobDNi" title="Swipe Right Safely" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 7. Native Tribes

Special Economic Zones (SEZs) are designated areas within a country that operate under different business and trade laws than the rest of the nation. These zones typically offer incentives like tax breaks and simplified regulations. [The Catawba Indian Nation](https://www.catawba.com/) established their own SEZ called the [Catawba Digital Economic Zone](https://catawbadigital.zone/), with the goal of driving economic development, attracting businesses, and creating opportunities for tribal members.

The Catawba Digital Economic Zone is using the [Web5 SDK](https://developer.tbd.website/docs/web5/) to grant VCs to members. These VCs allow users to prove their identity and achieve regulatory compliance within the zone.

**To learn more about this use case, check out this discussion between the Catawba Digital Economic Zone Team and the Developer Relations Team at TBD:**

<iframe class="aspect-video" src="https://www.youtube.com/embed/hshymp4NfYY?si=nv1vHS7sUGl79BHx" title="Catawba Indian Nation Adopts Web5" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Learn More 

Verifiable Credentials are making a tangible difference by solving real problems for real people - simplifying loan applications, protecting artists' rights, ensuring pharmaceutical safety, and supporting tribal sovereignty.

If you have ideas for building apps with VCs, check out these resources:

* [Build your own Verifiable Credentials with the Web5 SDK](https://developer.tbd.website/docs/web5/build/verifiable-credentials/vc-issuance)
* [How TBD is using VCs in the tbDEX SDK](https://developer.tbd.website/docs/tbdex/)
* [TBD’s YouTube Channel](https://www.youtube.com/@tbd.videos/?sub_confirmation=1)