---
slug: chatgpt-writingcode
title: Web Assembly with ChatGPT
description: Using ChatGPT to help add WASM support to the self-sovereign identity SDK
authors:
  name: Mic Neale
tags: [Self Sovereign Identity, SSI, AI, ChatGPT]
---

<head>
  <meta property="og:title" content="Web Assembly with ChatGPT" />
  <meta property="og:url" content='https://developer.tbd.website/blog/chatgpt-writingcode' />
  <meta property="og:image" content="/img/wasm-chatgpt-ssi.png" />
  <meta property="og:description" content="Using ChatGPT to help add WASM support to the self-sovereign identity SDK" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:image" content="/img/wasm-chatgpt-ssi.png" />
  <meta name="twitter:site" content="@tbddev" />
  <meta name="twitter:title" content="Web Assembly with ChatGPT" />
  <meta name="twitter:description" content="Using ChatGPT to help add WASM support to the self-sovereign identity SDK" />
  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>


## Web Assembly

[Web Assembly](https://webassembly.org/) is a popular format for running binary applications in web browsers (with wide support).

This can have a few advantages but the interesting thing for us is that this can allow sharing of implementations of functionality: credential issuance, DID resolving, cryptographic functions, etc which you may not want to necessarily re-implement in JavaScript or TypeScript.

The [SSI-SDK](https://github.com/TBD54566975/ssi-sdk) is an implementation of a lot of standards for self sovereign identity, so it is a great candidate to expose via WASM to web apps. 

<!--truncate-->

Now there is a whole lot of (let's face it: tedious) machinery to get WASM to be compiled from Go (ok if you are really curious you can [read the code](https://github.com/TBD54566975/ssi-sdk/pull/265/)), but the upshot of it is that there is a .wasm file produced which when consumed in just the right way in a web page, allows you to call functions from JavaScript, that look and feel like JavaScript, but are actually running in the web-assembly machiner (and compiled down from Golang).

Say you had a function in Golang land which looked like this: 

```go
// Resolve attempts to resolve a DID for a given method
func (dr Resolver) Resolve(did string, opts ...ResolutionOptions) (*DIDResolutionResult, error) {
  ...
```

You could call it from the web via:
```javascript
console.log(resolveDid("did:peer:0z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH"));
```

and it would Just Work thanks to WASM! 
Well, thanks to WASM and a lot of boring glue. 


## ChatGPT

But the boring glue is what I am here to talk about it, as it turns out ChatGPT can be quite helpful for the boring (but important) glue. 

So firstly, there is some work to be done to build a shim between the JavaScript type world and the Golang type world: 

```go
// 1. Simplest function - note we wrap things with js.ValueOf (if a primitive you don't technically need to)
func sayHello(_ js.Value, args []js.Value) interface{} {
	return js.ValueOf("Hello from golang via wasm!")
}
```

This gets more complicated when you have more complicated types, but essentially this is the pattern you follow to expose functionality. Now I am a pretty ordinary Golang developer, so being lazy I thought I would see if I could teach ChatGPT about WASM and if it could write this glue code for me. 

Helpfully the SSI-SDK has a good amount of test coverage, so to teach ChatCPT about the API I was trying to expose, I pasted in a test case which exercised the API. The functionality was the "Resolve" function above, and the test code showed how to use it. 

I then asked ChatGPT to provide a WASM friendly wrapper for that functionality:


![chatgpt generated resolver](/img/chatgpt_resolver.png)

To do this, I gave it an example of some previously written code that uses some (unrelated) functionality and also exposes it to WASM. As you can see it was happy to provide an implementation which whilst close, with some minor tweaking. 

I was able to tidy it up and include it in the [pull request](https://github.com/TBD54566975/ssi-sdk/pull/265). Handy - thanks ChatGPT!
Moreover, as I am an ordinary Golang developer I was able to ask it to put in a retry on error (also some important glue) when using WASM from a web app (this staved a minor amount of googling): 


![chatgpt generated error handler](/img/chatgpt_error.png)


## Parting thoughts

WASM seems surpremely useful, and ChatGPT, while terrifying on one level, looks like it can really take away some of the grind work from developers, allowing us to move much faster into more platforms. And no, this post was NOT written by ChatGPT, but by a human.
