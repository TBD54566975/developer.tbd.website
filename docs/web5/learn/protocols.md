---
title: Protocols
---

**5 minute read**

In this document, you’ll:

- Learn what a protocol is
- See what a protocol looks like
- Work through defining a protocol
- Use a protocol in your app

Protocols are a document that define a data scheme and the contract by which two Decentralized Web Nodes (DWNs) agree to communicate and share data as it pertains to the scope defined by the protocol. In other words, protocols define both the data schema and the data permissions as it relates to a certain application or use case.

Protocols are written in a json format that is flexible enough to detail what objects are stored as part of the application, as well as who has what permissions on those objects. Although schema and permissions are traditionally decoupled in Web2 development, protocol documents serve as a robust and concise way to define how your application handles data.

:::note
If you’re interested in reading the source code for protocol definitions, you can check out the following core files in the [dwn-sdk-js](https://github.com/TBD54566975/dwn-sdk-js) library:

- [type.ts](https://github.com/TBD54566975/dwn-sdk-js/blob/main/src/interfaces/protocols/types.ts) - The file responsible for serializing your protocol document
- [protocol-rule-set.json](https://github.com/TBD54566975/dwn-sdk-js/blob/main/json-schemas/protocol-rule-set.json) - A schema defining how protocols should be formatted
:::

## Protocol Basics

Every protocol document has a few basic keys:

- `types` - Defines all the data types used in your document
- `structure` - Used as a catch-all to define a list of properties
- `actions` - The key word used to denote the start of a permission definition

These terms are combined in a human-readable way to define both the data schema and permissions of your app.

To apply these concepts, let's consider if we wanted to build a basic social networking application. In our social network, we want users to be able to post images with captions that can be replied to, as well as messages with replies. This application has a data design of two key objects: images and messages. Images have caption and reply properties, while messages just have a replies property.

Now let’s imagine how we’d construct the permissions for such an app. We want all users to be able to post images and messages, but we have a few constraints on the other properties:

- Only the author should be able to post an image caption
- Only the recipient(s) of a message should be able to reply to it
- Only the recipient(s) of an image should be able to reply to it

## Defining a Protocol

We know the key words for defining protocols - `types`, `structure`, and `actions` - as well as our data and permissions schemas. So our protocol would look this:

```json
{
  "protocol": "http://social-media.xyz",
  "types": {
    "message": {
      "schema": "messageSchema",
      "dataFormats": ["text/plain"]
    },
    "reply": {
      "schema": "replySchema",
      "dataFormats": ["text/plain"]
    },
    "image": {
      "schema": "imageSchema",
      "dataFormats": ["image/jpeg"]
    },
    "caption": {
      "schema": "captionSchema",
      "dataFormats": ["text/plain"]
    }
  },
  "structure": {
    "message": {
      "$actions": [
        {
          "who": "anyone",
          "can": "write"
        }
      ],
      "reply": {
        "$actions": [
          {
            "who": "recipient",
            "of": "message",
            "can": "write"
          }
        ]
      }
    },
    "image": {
      "$actions": [
        {
          "who": "anyone",
          "can": "read"
        },
        {
          "who": "anyone",
          "can": "write"
        }
      ],
      "caption": {
        "$actions": [
          {
            "who": "anyone",
            "can": "read"
          },
          {
            "who": "author",
            "of": "image",
            "can": "write"
          }
        ]
      },
      "reply": {
        "$actions": [
          {
            "who": "author",
            "of": "image",
            "can": "read"
          },
          {
            "who": "recipient",
            "of": "image",
            "can": "write"
          }
        ]
      }
    }
  }
}
```

In the `types` section, we can see how the data schema of each data type is defined. While you’d ideally use a resolvable schema in this property, that is not a requirement.

```json
"types": {
  "message": {
    "schema": "messageSchema",
    "dataFormats": ["text/plain"]
  },
  "reply": {
    "schema": "replySchema",
    "dataFormats": ["text/plain"]
  },
  "image": {
    "schema": "imageSchema",
    "dataFormats": ["image/jpeg"]
  },
  "caption": {
    "schema": "captionSchema",
    "dataFormats": ["text/plain"]
  }
}
```

You’ll then notice how each of those `types` is used in the large `structure` object, which at a top level houses the `message` and `image` data types which are critical to our social network.

```json
"structure": {
  "message": {
    "$actions": [
      {
        "who": "anyone",
        "can": "write"
      }
    ],
    "reply": {
      "$actions": [
        {
          "who": "recipient",
          "of": "message",
          "can": "write"
        }
      ]
    }
  },
  "image": {
    "$actions": [
      {
        "who": "anyone",
        "can": "read"
      },
      {
        "who": "anyone",
        "can": "write"
      }
    ],
    "caption": {
      "$actions": [
        {
          "who": "anyone",
          "can": "read"
        },
        {
          "who": "author",
          "of": "image",
          "can": "write"
        }
      ]
    },
    "reply": {
      "$actions": [
        {
          "who": "author",
          "of": "image",
          "can": "read"
        },
        {
          "who": "recipient",
          "of": "image",
          "can": "write"
        }
      ]
    }
  }
}
```

Within `message`, you’ll notice we define `actions` permissions to let anyone write a message to anyone...

```json
"message": {
    "$actions": [
      {
        "who": "anyone",
        "can": "write"
      }
    ],
  ...
},
```

But then we nest another `structure` object to hold the child property of `reply` and define permissions on `reply`.

```json
"message": {
    "$actions": [
      {
        "who": "anyone",
        "can": "write"
      }
    ],
    "reply": {
      "$actions": [
        {
          "who": "recipient",
          "of": "message",
          "can": "write"
        }
      ]
    }
  },
```

Additionally, you’ll notice the `image` object below it also defines `actions` permissions, along with more child properties and their permissions.

```json
"image": {
  "$actions": [
    {
      "who": "anyone",
      "can": "read"
    },
    {
      "who": "anyone",
      "can": "write"
    }
  ],
  "caption": {
    "$actions": [
      {
        "who": "anyone",
        "can": "read"
      },
      {
        "who": "author",
        "of": "image",
        "can": "write"
      }
    ]
  },
  "reply": {
    "$actions": [
      {
        "who": "author",
        "of": "image",
        "can": "read"
      },
      {
        "who": "recipient",
        "of": "image",
        "can": "write"
      }
    ]
  }
}
```

## Protocols in Practice

To use a protocol in your app, you’ll need to install that protocol to your app. You can do so using the following snippet that leverages our [web5.js](https://github.com/TBD54566975/web5-js) library, where `myDid` is your DID object and `protocolObject` is the protocol json defined in the previous section:

```js
const response = await web5.dwn.protocols.configure(myDid.id, protocolObject);
```

Once you’ve installed that protocol to your app, you’re ready to communicate using the schema and permissions it defines.

Building on our social media example, let’s say that you wanted to post a message to your friend Alice. First, you can check if she also has the `social-media` protocol installed by running:

```js
const { record } = await web5.dwn.protocols.query({
  from: 'did:example:alice',
  message: {
    filter: {
      protocol: 'social-media',
    },
  },
});
```

Once you’ve used this call to confirm that she does have the protocol installed, you can write to her DWN via the `social-media` protocol using:

```js
const { record } = await web5.dwn.records.create({
  data: 'Hello, world!',
  message: {
    recipient: 'did:example:alice'
    schema: 'message',
    dataFormat: 'text/plain',
    protocol: 'social-media',
  },
});

await record.send('did:example:alice')
```

And that’s it! You’ve now written a message to Alice’s DWN, which she’ll be able to respond to, and you can both communicate using the `social-media` protocol.

This protocol enables a basic social network using Web5, which means we’ve created a basic trustless, decentralized social network where your users host all of their own data; images, captions, and messages are all theirs.
