---
slug: dwas-vs-pwas
title: Hello DWAs - Building the decentralized future of PWAs
description: How DWAs are the decentralized future of PWAs
authors:
  name: Chris Giglio
tags: [Decentralized Identity, PWA, DWA]
---

<head>
  <meta property="og:title" content="Hello DWAs: Building the decentralized future of PWAs" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content='https://developer.tbd.website/blog/2023-05-23-dwas-vs-pwas' />
  <meta name="og:description" content="How DWAs are the decentralized future of PWAs" />
  <meta property="og:image" content="https://developer.tbd.website/assets/images/dwas-vs-pwas.png" /> 

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="developer.tbd.website" />
  <meta name="twitter:site" content="@tbddev" />
  <meta name="twitter:title" content="Hello DWAs: Building the decentralized future of PWAs" />
  <meta property="twitter:url" content='https://developer.tbd.website/blog/2023-05-23-dwas-vs-pwas' /> 
  <meta name="twitter:description" content="How DWAs are the decentralized future of PWAs" />
  <meta name="twitter:image" content="https://developer.tbd.website/assets/images/dwas-vs-pwas.png" />

  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>

![Hello DWAs: Building the decentralized future of PWAs](/img/dwas-vs-pwas.png)

Whether or not you know the term, you know the experience of using a Progressive Web App (PWA): it’s the slick experience that enables you to install a web experience to your native device and enjoy the speed of use of a website with the tight system integration of a native app. They allow for experiences like recreating [Starbucks’ native app in web](https://www.google.com/url?q=http://app.starbucks.com&sa=D&source=docs&ust=1684856854165941&usg=AOvVaw0I1rf0lo56OgparzhHJ81P), or for creating a [highly 2G-optmized experience](https://www.google.com/url?q=https://www.tigren.com/blog/uber-pwa/&sa=D&source=docs&ust=1684856854166056&usg=AOvVaw23Pjs0N6T_k3SXw3E2bQ8p) like what Uber created for some of their customers. PWAs take advantage of native features such as on-device storage, push notifications, and even windowing without requiring the overhead of a native app and the ability to install them without going through an app store. 

In the same way that HTML5 and PWAs changed the way users expected to consume their apps through the minor addition of manifest, an even larger shift has arrived in the form of Decentralized Web Apps (DWAs), which combine PWAs with Web5. While PWAs redefined the relationship between the client and server by enabling richer on-device experiences through native integrations, DWAs are going to completely redefine data storage for apps resulting in a seismic shift in user privacy, ease-of-use, and data portability.

<!--truncate-->


# What changes in a DWA?

The basic client-server model that PWAs use is and has been the presumed standard for decades now. Users expect to open up their PWA, a client, that routinely makes API calls to a 3rd party service, the server, where all their data is stored and the business logic of the app lives. For example, a basic ToDo app PDA would provide you a UI to interface with all your action items by calling the API service that accesses those items; fundamentally the data and API layers live outside of the user’s control and ownership.

In DWAs, users own their own data and, as a result, their apps no longer need an API service because apps connect directly to the data source. This shift leads to virtually no UI/UX change, but triggers a radical change in app architecture because developers are now directly interfacing with a user’s data store instead of with app-owned server storage via API. 

In DWAs, app data is stored in [Decentralized Web Nodes (DWNs)](https://developer.tbd.website/docs/web5/learn/decentralized-web-nodes), which are user-owned and redundant data stores capable of transmitting data that provide strong promises of privacy and guaranteed ownership. DWNs can be permissioned publicly or privately related to the querying decentralized identifier (DID) using [permissions](https://developer.tbd.website/docs/web5/learn/decentralized-web-nodes) and[ protocols](https://developer.tbd.website/docs/web5/learn/protocols) to allow select access to all the data stored in them. 

Going back to our ToDo app example, a user would be able to store all of their todo items and app data on their own DWN rather than on a specific 3rd party’s servers, and all the app would do is focus on creating a presentation layer and additional features around the app’s concept. 


# Upgrading to DWAs


If you want to migrate a PWA to a DWA, the only thing you’ll need to do is make sure that whatever data you were originally storing remotely and transmitting via API calls is now stored on the user’s DWN and is accessed [using CRUD operations](https://developer.tbd.website/docs/web5/build/decentralized-web-nodes/write-to-dwn) on the user’s DWN. For example, your ToDo app may have previously made an API call to write a new item to your list, but now you’d replace that API call with:


```js
// Write a plain text record to the in-memory DWN

const myRecord = await web5.dwn.records.create(myDid.id, {
 author: myDid.id,
 data: todoItem,
 message: {
     dataFormat: 'text/plain',
 },
});
```

You might expect this section on how to migrate your PWA to a DWA to drag on, but that’s really it! Regardless of your front-end frameworks, you can easily turn your app into a DWA using our [web5.js library ](https://developer.tbd.website/docs/web5/)with minimal code changes. So long as your application treats the user’s DWN as its data storage and allows the user to own their own data, your PWA is now a DWA.


# Benefits of a DWA

Even though replacing all your API calls with DWA calls may be relatively easy work, convincing your users to get on board with Web5 and DWNs may be a challenge. So what’s in it for you and them when you build a DWA?

* User ownership of data - users don’t have to worry about a server outage or be fearful of a company shutting down and losing all their data.
* Data portability - because users are storing their own data in PWAs, they no longer need to be tied to a single service. Imagine, for example, a world with a decentralized Spotify and Tidal. If a Spotify user were to decide to leave the platform and migrate to Tidal, they’d own all their own playlist data and could therefore then give playlist access to Tidal so that all their data migrates seamlessly. 
* Reduced operational overhead - you no longer need to maintain a massive array of databases, clusters, and other infrastructure to host your simple PWA. Instead, a user can visit your DWA, plug in their DWN, and get to work.


# What’s Next?

If you’d like to try upgrading your PWA to a DWA or building your own from the ground-up, you can use our [web5.js library](https://developer.tbd.website/docs/web5/) to interface with DWNs and DIDs. Additionally, you can find support on your developer journey by [joining our Discord](https://discord.gg/tbd) channel or by [engaging in our GitHub page](https://github.com/TBD54566975/web5-js).
