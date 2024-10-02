---
slug: decentralized-apps
title: "Beyond Blockchain: How Web5 Enables Fully Decentralized Apps"
description: "Why Web5 enables the decentralized apps blockchain made you dream - or have nightmares - about"
authors:
  name: Chris Giglio
tags: [Decentralized Web Nodes, Decentralized Identity, Web5]
---

<head>
  <meta property="og:title" content="Beyond Blockchain: How Web5 Enables Fully Decentralized Apps" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content='https://developer.tbd.website/blog/decentralized-apps' />
  <meta name="og:description" content="How Web5 enables the decentralized apps blockchain made you dream - or have nightmares - about" />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/blog-decentralized-apps-64390c260a8ec957e939aa841c5e76bb.png" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta name="twitter:site" content="@tbdevs" />
  <meta name="twitter:title" content="Beyond Blockchain: How Web5 Enables Fully Decentralized Apps" />
  <meta property="twitter:url" content='https://developer.tbd.website/blog/decentralized-apps' /> 
  <meta name="twitter:description" content="How Web5 enables the decentralized apps blockchain made you dream - or have nightmares - about" />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/blog-decentralized-apps-64390c260a8ec957e939aa841c5e76bb.png" />

  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>


![Beyond Blockchain: How Web5 Enables Fully Decentralized Apps](/img/blog-decentralized-apps.png)

When blockchain technology was first introduced a decade and a half ago, it made the possibility of a decentralized web seem viable to a mass audience. Since then, blockchains have proven themselves to be a poor solution to the majority of data storage problems outside of bearer assets - i.e. Bitcoin - because blockchains grow continuously without any ability to delete data, which just doesn’t make sense for things like personal data. But ‘blockchain’ isn’t synonymous with decentralization, and just because a blockchain isn’t the best solution for personal data storage doesn’t mean your app can’t be decentralized.

<!--truncate-->

There are two common problems when trying to port a traditional centralized application over to the blockchain: data efficiency and data custody. In this post we’ll discuss why those two problems are blockers for most applications, and how Web5 components allow developers to build performant decentralized applications in a way that wasn't possible before.


## Where Blockchain Doesn’t Fit


### Data Storage & Efficiency

It’s possible to make the argument that data such as GIS coordinates, historical data, or widely-used and immutable data are good candidates to be stored on the blockchain because there’s no need for deletion and a requirement for complete history. While blockchain isn’t the only storage method that meets the needs of these systems, those systems are the ones best suited to utilize blockchain. Despite that fact that those data are good candidates for blockchain, however, does not mean that blockchain is the best data storage solution for that data.

However, blockchains are continuous ledgers of data that provide the benefit of immutability at the cost of storage inefficiency, which means that they aren’t great for storing large amounts of data or data sets in which there are large subsections of trivial or ignorable data. Firstly, their read times are slower than traditional data storage because the entire blockchain needs to be traversed for a read, and write times require settlement onto the blockchain which is out of an individual’s hands. As a result, the cost per transaction will likely be significantly higher on the blockchain when compared to traditional data storage, and that cost can grow over time.

Imagine an on-chain photo storage app that allows for users to encrypt their data. While this framework would technically allow for the replacement of large-scale cloud-based photo services that are run by centralized corporations, the end user experience would be tarnished by much slower speeds than what users have come to expect. That’s because blockchains are designed to store an immutable ledger of transactions (in this case uploads of photos), and knowing what photos belong to who would involve traversing the entirety of the blockchain. Queries to this kind of data storage are slow and expensive, as would be the proof-of-work or other verification method needed to add new blocks to the chain. As a result, while a photo sharing app, or any app that requires storage of large files, is theoretically possible on-chain, it isn’t very scalable or performant. 


### Data Custody

A key tenet to the decentralized web is the idea of custody, or data ownership. Custody, or the ability to hold an asset in which only you have full access to it, breaks down into a handful of concerns including:



* Physical storage ownership
* Deletion prevention
* Censorship resistance
* Speed of use
* Data interoperability

A truly decentralized web makes it easy for each user to custody their own data, regardless of their reasoning for doing so. No matter a customer’s “why,” however, custody isn’t simply a matter of personal beliefs - it’s a feature that enables better user experience.  

With blockchain technology, wallets don’t actually store your data - instead they address _to_ your data on the blockchain via the public/private keys they hold and represent. This means, for example, that a crypto wallet doesn’t actually “store” your Bitcoins; it’s an address that is used as the identifier on transactions recorded on-chain, which can then be used to determine your wallet’s Bitcoin holdings. 

In order to take custody of your on-chain data then you would need to run your own node on the blockchain network in question, which may not be a good solution for the average consumer. Additionally, in order to host a wallet that is available on all of your devices, that wallet will likely be hosted on a centralized third party’s servers.

It’s important to note that while the issues of wallet storage and running nodes aren’t unsolvable problems, they are inherently outside of the definitions of what a typical blockchain wallet does today.


## Building With Web5

Bearing in mind the limitations of custody and efficiency, it becomes clear that not a lot of data makes sense to be stored on-chain. However, just because you might not want to store important, large data like photos, or small, unimportant data like favicon history on-chain doesn’t mean that it isn’t possible to store that data in a decentralized way that offers custody and efficiency.

Key Web5 technologies like Decentralized Identifiers (DIDs), Decentralized Web Nodes (DWNs), and Verifiable Credentials (VCs) in supplement or in place of blockchain provide a framework for an internet that is both decentralized AND solves the issues we’ve discussed that blockchain alone can’t solve. It’s important to note that while the integration of these technologies with existing blockchain ecosystems isn’t unheard of, they are able to solve the issues with blockchain discussed above. Cumulatively, they offer a way to efficiently address data, store and replicate data in a decentralized manner, and maintain identity.


## Custody

A purely blockchain-focused wallet, as discussed previously, is simply a key pairing with an address that references ownership over transactions on the blockchain but doesn’t actually manage local or cloud storage. This means that any on-chain data, while decentralized, isn’t user-custodied unless they set up a node on the network in which they’re participating, which is something that in a blockchain context should happen in a separate app from the wallet. 

In Web5, however, wallets are addressed via DIDs and are able to store data via DWeb Nodes - which can live on device and replicate storage remotely - rather than relying on storing everything on-chain or on the wallet developer’s cloud storage option. Because Web5 wallets are more robust than simply a wallet that connects to a blockchain, your Web5 wallet could theoretically manage running a blockchain node for you in addition to performing more standard “wallet” tasks like you might expect.

Additionally, because DWNs are able to replicate data across instances on different devices, it makes for self-custodying your data across devices much easier than with a blockchain wallet. While blockchain wallets require re-creating the private key pairings on another device and can pose a security risk, DIDs also offer ways to easily and securely port your DID between devices to replicate data and maintain a consistent user experience. You can imagine how great this is in the case of a photo storage app that is backed by a DWN that replicates data across your devices and makes sign-in on those devices easy!

While blockchain wallets and Web5 wallets aren’t mutually exclusive - Web5 wallets can very well interact with blockchains and blockchain wallets may use concepts like DIDs and VCs -, what matters is that when users take advantage of wallet apps using DIDs, DWNs, and VCs, they can self-custody all their off-chain data and even their on-chain data should they be able to run a node locally.


## File Storage

Ledgers like the blockchain don’t make for performant databases in a lot of use cases, which is why DWNs are a breakthrough in combining decentralized web technologies with centralized web performance. While blockchains require ledger consensus and redundant storage to hold any type of data, DWNs are replicable nodes that can run any of the traditionally performant database technologies you’re used to - think SQL, MongoDB, etc. - without being tied to a centralized server. 

As mentioned in our discussion about custody, you could run a DWN on your laptop, your phone, on your own server, or on rented server space from a cloud provider, and all of them can be synchronized to provide the kind of redundancy that we love about blockchain. As a result, DWNs are able to solve the problems of large file storage and off-chain storage.


## Final Thoughts

A performant decentralized web that offers users custody of their own data has been a tantalizing dream for almost two decades, but in that same timeframe blockchain technology has proven to not be the way to make that vision a reality. If you find yourself or your customers valuing decentralization, privacy, flexibility, and self-custodial apps, then Web5 provides the framework to achieve exactly those goals. Your Web5 app may very well leverage blockchain technology - a participating financial institution on the tbDEX protocol we’re developing is a great example of an app that uses Web5 tech to connect to blockchains, but there are lots of ways to build dApps with Web5.

If you want to try building your own decentralized applications, go ahead and check out our [Web5 SDKs](https://developer.tbd.website/docs/web5/), join our [Discord community,](https://discord.gg/mt6Zbpv7) and connect with us [on GitHub](https://github.com/TBD54566975)!
