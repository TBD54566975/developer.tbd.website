---
title: Protocols
---

_5 minute read_

In this document, you’ll:

- Learn what a protocol is
- See what a protocol looks like
- Work through defining a protocol
- Use a protocol in your app

Protocols are a document that define a data scheme and the contract by which two Decentralized Web Nodes (DWNs) agree to communicate and share data as it pertains to the scope defined by the protocol. In other words, protocols define both the data schema and the data permissions as it relates to a certain application or use case.

Protocols are written in a `json` format that is flexible enough to detail what objects are stored as part of the application, as well as who has what permissions on those objects. Although schema and permissions are traditionally decoupled in Web2 development, protocol documents serve as a robust and concise way to define how your application handles data.

If you’re interested in reading the source code for protocol definitions, you can check out the following core files in the `[dwn-sdk-js](https://github.com/TBD54566975/dwn-sdk-js)` library:

- [type.ts](https://github.com/TBD54566975/dwn-sdk-js/blob/main/src/interfaces/protocols/types.ts) - The file responsible for serializing your protocol document
- [protocol-rule-set.json](https://github.com/TBD54566975/dwn-sdk-js/blob/main/json-schemas/protocol-rule-set.json) - A schema defining how protocols should be formatted

## Protocol Basics

Can you add an image here? To show what a protocol looks like and where it would live in an app?

Every protocol document has a few basic keys to make note of:

- `labels` - Defines all the data types used in your document
- `records` - Used as a catch-all to define a list of properties
- `allow` - The key word used to denote the start of a permission definition

These terms are combined in a human-readable way to define both the data schema and permissions of your app.

To apply these concepts, lets consider if we wanted to build a basic social networking application. In our social network, we want users to be able to post images with captions that can be replied to, as well as messages with replies. This application has a data design of two key objects: images and messages. Images have caption and reply properties, while messages just have a replies property.

Now let’s imagine how we’d construct the permissions for such an app. We want all users to be able to post images and messages, but we have a few constraints on the other properties:

- Only the author should be able to post an image caption
- Only the recipient(s) of a message should be able to reply to it
- Only the recipient(s) of an image should be able to reply to it

## Defining a Protocol

We know the key words for defining protocols - `labels`, `records`, and `allow` - as well as our data and permissions schemas. So with that, let’s see what our protocol would look like!

```jsx
{
  "labels": {
    "message": { "schema": "messageSchema" },
    "reply": { "schema": "replySchema" },
    "image": { "schema": "imageSchema" },
    "caption": { "schema": "captionSchema" }
  },
  "records": {
    "message": {
      "allow": {
        "anyone": { "to": ["write"] }
      },
      "records": {
        "reply": {
          "allow": {
            "recipient": {
              "of": "message",
              "to": ["write"]
            }
          }
        }
      }
    },
    "image": {
      "allow": {
        "anyone": {
          "to": ["write"]
        }
      },
      "records": {
        "caption": {
          "allow": {
            "author": {
                "of": "image",
                "to": ["write"]
            }
          }
        },
        "reply": {
          "allow": {
            "recipient": {
              "of": "image",
              "to": ["write"]
            }
          }
        }
      }
    }
  }
}
```

In the `labels` section, we can see how the data schema of each data type is defined. While you’d ideally use a resolvable schema in this property, that is not a requirement. You’ll then notice how each of those `labels` is used in the large `records` object, which at a top level houses the `message` and `image` data types that we agreed were critical to our social network.

Within `message`, you’ll notice we define `allow` permissions to let anyone write a message to anyone, but nest another `records` object to hold the child property of `reply` and define permissions on `reply`. Additionally, you’ll notice the `image` object below it also defines `allow` permissions, along with more child properties and their permissions.

## Protocols in Practice

To use a protocol in your app, you’ll need to install that protocol to your app. You can do so using the following snippet that leverages our `web5` JS library, where `myDid` is your `did` object and `protocolObject` is the protocol json defined in the previous section:

```jsx
const response = await web5.dwn.protocols.configure(myDid.id, protocolObject);
```

Once you’ve installed that protocol to your app, you’re ready to communicate using the schema and permissions it defines. Building on our social media example, let’s say that you wanted to post a message to your friend Alice. First, you can check if she also has the protocol installed - which we’ll call `social-media` - by running:

```jsx
const response = await web5.dwn.protocols.query('did:example:alice', {
  author: 'did:example:alice',
  message: {
    filter: {
      protocol: 'social-media',
    },
  },
});
```

Once you’ve used this call to confirm that she does have the protocol installed, you can write to her DWN via the `social-media` protocol using:

```jsx
const response = await web5.dwn.records.write('did:example:alice', {
  author: myDid.id,
  data: 'Hello, world!',
  message: {
    schema: 'message',
    dataFormat: 'text/plain',
    protocol: 'social-media',
  },
});
```

And that’s it! You’ve now written a message to Alice’s DWN, which she’ll be able to respond to, and you can both communicate using the `social-media` protocol. This protocols enables a basic social network using `web5`, which means we’ve created a basic trustless, decentralized social network. This means that you own all your own data on the basic social network - images, captions, and messages are all yours!
