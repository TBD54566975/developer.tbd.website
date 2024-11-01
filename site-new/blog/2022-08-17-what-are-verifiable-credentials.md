---
slug: what-are-verifiable-credentials
title: What are Verifiable Credentials?
description: What are Verifiable Credentials, who issues them, and how do they get verified
authors:
  name: Saeed Jabbar (Community Contributor)
tags: [Verifiable Credentials,Decentralized Identity]
---

<head>
  <title>What are Verifiable Credentials?</title>
  <meta name="description" content="What are verifiable credentials, who issues them, and how do they get verified" />
  
  <meta property="og:url" content="https://developer.tbd.website/blog/what-are-verifiable-credentials" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="What are Verifiable Credentials?" />
  <meta property="og:description" content="What are verifiable credentials, who issues them, and how do they get verified" />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/what_are_vcs_banner-1ec4bea6c245b62b76685a338d5f8d63.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta property="twitter:url" content="https://developer.tbd.website/blog/what-are-verifiable-credentials" />
  <meta name="twitter:title" content="What are Verifiable Credentials?" />
  <meta name="twitter:description" content="What are Verifiable Credentials, who issues them, and how do they get verified" />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/what_are_vcs_banner-1ec4bea6c245b62b76685a338d5f8d63.png" />
  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>

## 

![What Are Verifiable Credentials](/img/what_are_vcs_banner.png)

When you hear the term 'credential', what comes to mind? Is it a driver's license, passport,  birth certificate, college degree, state ID? The common thread of these forms of credentials is that they are physical items, verified by recognized centralized bodies like a government agency or accredited university.  

So how do credentials translate into the digital world where within a few clicks someone can make a fictitious identity? Introducing... **verifiable credentials** (VCs), a digitally signed electronic credential that follows an [open standard](https://www.w3.org/TR/vc-data-model/) that lets you create, own, and manage your credentials across a variety of platforms.

<!--truncate-->

## Why Do We Need Verifiable Credentials?

Over the course of your digital history, you've likely signed up for hundreds of apps and services with elements of your personal data fragmented, such as your name, email address, or more sensitive information like your date of birth and government ID number. These services then share your data with other third parties that you may not even be aware of - with or without your consent. It's difficult to go back and deactivate your profiles, delete your accounts, or reclaim additional data these services have collected on you. Worse is if there is a data breach in one of these services and now your data is out in the public.

Verifiable Credentials aim to solve these problems by putting the power to manage your data back into your hands. Imagine being able to own and control your personal data by only allowing access to services that require it and having the authority to disable services that no longer need it. You can even manage your data on your own self-hosted decentralized web node via an identity hub without relying on any centralized third party. 

Additionally, you can own multiple Verifiable Credentials for various use cases such as a student ID, a driver's license, a passport, or a certificate you earned. You can also have one specific Verifiable Credential with multiple [presentation layers](https://www.w3.org/TR/vc-data-model/#presentations) such as a passport where certain metadata is presented when used in a given context.

## How Do Verifiable Credentials Work?

You may be wondering who actually issues a Verifiable Credential, how does it get verified and who verifies the verifier? 

Let's look at the following example of the manual way credentials are issued. You've been accepted to your top university of choice and now need a student ID to access both the campus and online resources. Specifically, you want to apply for a campus parking permit as well. 

Typically this process would involve you taking physical copies of multiple forms of ID verification such as a passport, birth certificate, and driver's license to a physical office. Then after a few days of various checks, you're finally issued a physical student ID card from that university. The university trusts the entity that issued your birth certificate, passport, and driver's license to create a student ID for you. They can even look you up by the identification numbers on these documents. 

But what if someone in the admissions office looked up your driver's license and noticed those parking tickets you have? Were they even allowed to do so and could this bias their decision to give you a parking permit?

The current process looks something like this:

![Issuing a Student ID manually](/img/issue_student_id_manually.png)


Now let’s look at how verifiable credentials could help in this scenario. The university would run verification checks for each document provided (passport, driver’s license, birth certificate, etc) and the credential would be limited to just basic bio data that is required such as a legal name, date of birth, etc. So no one from the student department will be able to see your ticketing history associated with your driver’s license.

![Issuing a Student ID as a Verifiable Credential](/img/issue_vc_for_student_id.png)


## Using Verified Credentials 

Decentralized identifiers (DIDs) work alongside Verifiable Credentials. DIDs are unique identifiers that let us reference various VCs and the entities that also issue those credentials. For example a government or company can have their own unique DID. 

**DIDs use the following schema:**

![did:example:12345abcde](/img/did-format.png) 
*photo credit: W3C*

DIDs can then be used to create a Verified Credential by digitally signing it and assigning it to a holder, similar to how transactions are cryptographically signed in a blockchain. Depending on the signature format of the credential, the holder (also known as a DID subject) can then choose how much of that credential they want to present to an entity requesting the credential, which is referred to as selective disclosure. 

An example is an employer, Company X, who looks up the DID of your college diploma from University Y. 

Company X queries the issuer of your Diploma Verifiable Credential, in this case University Y, and also looks up the DID of that university in a verifiable data registry (VDR). Think of VDRs as just lists that can be managed and maintained by various parties such as wallets, financial institutions, DAOs, non-profits, etc. If your credentials have valid digital signatures but somehow University Y is on a list of non-accredited institutions in the USA but accredited institutions in Europe, it would be up to the Company X to decide if they want to accept it.

The diagram below outlines the flow of this process.

![issuer issues a verifiable credential to a holder who can send a presentation of their VC to a verifier](/img/vc_ecosystem.svg)
*photo credit: W3C*


## Use Cases for Verifiable Credentials

There are several use cases that can be realized with the use of Verifiable Credentials, such as

- Employment checks without being invasive 
- Managing of health records, land titles, etc
- Managing of various forms of personal identification such as passports, driver’s licenses, etc 
- KYC (Know Your Customer) checks for financial institutions and businesses
- Managing your gamer profile across different metaverses
- Managing Memberships

DIDs and VCs allow us to create identities and credentials in an interoperable ecosystem that allow developers and businesses to build a new wave of products, applications, and services that put users in control.

