---
slug: kcc-hackathon
title: "Known Customer Credential Hackathon"
description: "Participate in this hackathon to issue a Known Customer Credential and streamline KYC across payment apps."
authors:
  name: Angie Jones
tags: [Verifiable Credentials, Decentralized Web Nodes, Decentralized Identity, Web5, tbDEX, Hackathon]
---

<head>
  <meta property="og:title" content="Known Customer Credential Hackathon" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content='https://developer.tbd.website/blog/kcc-hackathon' />
  <meta name="og:description" content="Participate in this hackathon to issue a Known Customer Credential and streamline KYC across payment apps." />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/kcc-hackathon-0286b3344efdf434efe9d09a3c6bbf31.png" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta name="twitter:site" content="@tbdevs" />
  <meta name="twitter:title" content="Known Customer Credential Hackathon" />
  <meta property="twitter:url" content='https://developer.tbd.website/blog/kcc-hackathon' /> 
  <meta name="twitter:description" content="Participate in this hackathon to issue a Known Customer Credential and streamline KYC across payment apps." />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/kcc-hackathon-0286b3344efdf434efe9d09a3c6bbf31.png" />

  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>

<!-- img must be specified here to get the open graph URL -->
<div hidden>
![](/img/kcc-hackathon.png)
</div>

![](/img/kcc-hackathon.gif)

[tbDEX](/docs/tbdex/) is an open messaging protocol that enables liquidity seekers to connect with liquidity providers. This means that as a liquidity provider, your business can be the backend supplier in several payment applications.

Performing KYC on repeat customers every time they attempt to transact with you from a different payment app would be a pain. To avoid this, you will use the [Web5 SDK](/projects/web5) to issue a [Known Customer Credential](https://github.com/TBD54566975/known-customer-credential) (KCC) to a customer, Alice, who you have already completed KYC on. You will store the JWT representing the KCC in Alice’s [Decentralized Web Node](/docs/web5/decentralized-web-nodes/what-are-dwns) so that she can present it to your business from any payment app.

<!--truncate-->

## Challenge

1. Create a Decentralized Identifier (DID) and DWN to use as the Issuer.
   * Bonus: Use the DIF community DWN instance hosted by Google Cloud.
2. Issue Alice a KCC that includes evidence. Note that for this challenge, you do not need to implement an actual identity verification flow.
3. Install the [VC Protocol](https://vc-to-dwn.tbddev.org/vc-protocol) onto your DWN so that you can communicate with Alice’s DWN.
4. Obtain permission to write to Alice’s DWN by sending a GET request to:
  ```
  https://vc-to-dwn.tbddev.org/authorize?issuerDid=${issuerDidUri}
  ```
5. Store the VC JWT of the KCC as a private record in Alice’s DWN.

## Submit

To [enter a submission](https://difhackathon2024.devpost.com/) for this hackathon, provide the DWN Record ID of the KCC.

## Resources
* Alice’s DID: `did:dht:rr1w5z9hdjtt76e6zmqmyyxc5cfnwjype6prz45m6z1qsbm8yjao`
* [web5/credentials SDK](https://www.npmjs.com/package/@web5/credentials)
* [web5/api SDK](https://www.npmjs.com/package/@web5/api)
* [How to create a DID and DWN with Web5.connect()](/docs/web5/decentralized-web-nodes/web5-connect)
* [Obtain Bearer DID - required to sign KCC](/docs/web5/quickstart#2-access-bearer-did)
* [Known Customer Credential Schema](https://vc.schemas.host/kcc.schema.json)
* [How to issue a VC with Web5](/docs/web5/verifiable-credentials/vc-issuance)
* [Example of issuing a KCC with Web5](https://github.com/TBD54566975/tbd-examples/tree/main/javascript/kcc-issuance-snippet#readme)
* [Example of issued KCC](https://github.com/TBD54566975/tbd-examples/tree/main/javascript/kcc-issuance-snippet#output-vc-json)
* [How to install a DWN Protocol](/docs/web5/decentralized-web-nodes/what-are-protocols#installing-a-protocol)
* [How to store a VC in a DWN](/docs/web5/verifiable-credentials/vcs-in-dwn)

## Contact Us

If you have any questions or need any help, please reach out to us in our [#kcc-hackathon](https://discord.com/channels/937858703112155166/1272378659730100245) channel on Discord.