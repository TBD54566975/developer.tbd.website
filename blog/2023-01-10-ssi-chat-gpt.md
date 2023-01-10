---
slug: chatgpt-writingcode
title: Extending ssi-sdk with ChatGPT into the web world
description: Using ChatGPT to help add WASM support to the self-soverign identity SDK
authors:
  name: Mic Neale
tags: [Self Sovereign Identity, AI, GPT-3]
---

## WASM

[Web Assembly](https://webassembly.org/) is a popular format for running binary applications in web browsers (with wide support).

This can have a few advantages but the interesting thing for us is that this can allow sharing of implementations of functionality: eg credential issuance, DID resolving, cryptographic funcitons etc which you may not want to necessarily re-implement in javascript or typescript.

The [SSI-SDK](https://github.com/TBD54566975/ssi-sdk) is an imeplemtation of a lot of standards for self soverign identity, so it is a great candidate to expose via WASM to web apps. 

Now there is a whole lot of (lets face it: tedioius) machinery to get wasm to be compiled from go (ok if you are really curious you can [read the code](https://github.com/TBD54566975/ssi-sdk/pull/265/)), but the upshot of it is that there is a .wasm file produced which when consumed in just the right way in a web page, allows you to call functions from javascript, that look and feel like javascript, but are actually running in the web-assembly machiner (and compiled down from golang).

Say you had a function in golang land which looked like this: 

```golang 
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

But the boring glue is what I am hear to talk about it, as it turns out ChatGPT can be quite helpful for the boring (but important) glue. 

(If you have been under a rock and haven't heard of ChatGPT - google it now and then come back)

So firstly, there is some work to be done to build a shim between the JS type world and the Golang type world: 

```golang
// 1. Simplest function - note we wrap things with js.ValueOf (if a primitive you don't technically need to)
func sayHello(_ js.Value, args []js.Value) interface{} {
	return js.ValueOf("Hello from golang via wasm!")
}
```

This gets more complicated when you have more complicated types, but essentially this is the pattern you follow to expose functionality. 
Now I am a pretty ordinary golang developer, so being lazy I thought I would see if I could teach ChatGPT about WASM and if it could write this glue code for me. 

Helpfully the ssi-sdk has a good amount of test coverage, so to teach ChatCPT about the api I was trying to expose, I pasted in a test case which exercised the api. 
The functionality was the "Resolve" function above, and the test code showed how to use it. 

I then asked ChatGPT to provide a WASM friendly wrapper for that functionality:


![chatgpt generated resolver](/img/chatgpt_resolver.png)

To do this, I gave it an example of some previously written code that uses some (unrelated) functionality and also exposes it to WASM. 
As yoyu can see it was happy to provide an implementation which whilst close, with some minor tweaking. 

I was able to tidy it up and include it in the [pull request](https://github.com/TBD54566975/ssi-sdk/pull/265). Handy - thanks ChatGPT!
Moreover, as I am an ordinary golang developer I was able to ask it to put in a retry on error (also some important glue) when using WASM from a web app (this staved a minor amount of googling): 


![chatgpt generated error handler](/img/chatgpt_error.png)







## Parting Thoughts

You should now have a pretty good sense of how we conceive of SSI software on Web5, and how its journey will unfold. Most importantly the mission is not TBD’s alone, it is that of the community. We build real software for real people and favor pragmatism above all else. What I’ve written here is *current thinking* and is always subject to evolution—with your help. I’m looking forward to you joining us in pushing SSI and Web5 forward, gaining new perspectives, solving new use-cases, and building some cool shit.
