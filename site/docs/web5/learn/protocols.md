---
title: Protocols
---

**5 minute read**

Protocols define a data schema and the contract by which two Decentralized Web Nodes (DWNs) agree to communicate and share data. In other words, protocols define both the data schema and the data permissions as it relates to a certain application or use case.

Protocols are written in a JSON format that is flexible enough to detail what objects are stored as part of the application, as well as who has what permissions on those objects. Although schema and permissions are traditionally decoupled in Web2 development, protocol documents serve as a robust and concise way to define how your application handles data.

## Protocol Basics

Every protocol document has a few basic keys:

- `types` - Defines all the data types used in your document
- `structure` - Defines a list of properties
- `$actions` - The key word used to denote the start of a permission definition

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
  "protocol": "https://social-media.xyz",
  "types": {
    "message": {
      "schema": "https://social-media.xyz/schemas/messageSchema",
      "dataFormats": ["text/plain"]
    },
    "reply": {
      "schema": "https://social-media.xyz/schemas/replySchema",
      "dataFormats": ["text/plain"]
    },
    "image": {
      "schema": "https://social-media.xyz/schemas/imageSchema",
      "dataFormats": ["image/jpeg"]
    },
    "caption": {
      "schema": "https://social-media.xyz/schemas/captionSchema",
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
    "schema": "https://social-media.xyz/schemas/messageSchema",
    "dataFormats": ["text/plain"]
  },
  "reply": {
    "schema": "https://social-media.xyz/schemas/replySchema",
    "dataFormats": ["text/plain"]
  },
  "image": {
    "schema": "https://social-media.xyz/schemas/imageSchema",
    "dataFormats": ["image/jpeg"]
  },
  "caption": {
    "schema": "https://social-media.xyz/schemas/captionSchema",
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

Within `message`, you’ll notice we define `actions` permissions to let anyone write a message to anyone.

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

## Installing a Protocol

To use a protocol in your app, you’ll need to install that protocol to your DWN. You can do so using the following snippet where `protocolDefinition` is the messaging protocol object from above:

```js
const { protocol, status } = await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition 
    }
});

//sends protocol to remote DWNs immediately (vs waiting for sync)
await protocol.send(myDid); 
```

Once you’ve installed that protocol to your app, you’re ready to communicate using the schema and permissions it defines.

## Protocols in Practice

Building on our social media example, let’s say that you wanted to post a message to your friend Alice. First, ensure that she has also installed the `https://social-media.xyz` protocol on her DWN. Then, you can write to her DWN via the `https://social-media.xyz` protocol using:

```js
const { record, status: createStatus } =
await web5.dwn.records.create({
  data: 'Hello, world!',
  message: {
    recipient: aliceDid,
    schema: 'https://social-media.xyz/schemas/messageSchema',
    dataFormat: 'text/plain',
    protocol: protocolDefinition.protocol,
    protocolPath: 'message'
  },
});

const { status: sendStatus } = await record.send(aliceDid);

if (sendStatus.code === 202) {
    console.log('send to alice success!!')
}
else {
    console.log('send failed!', sendStatus.code, sendStatus.detail)
}
```

And that’s it! You’ve now written a message to Alice’s DWN, which she’ll be able to respond to, and you can both communicate using the `social-media` protocol.

This protocol enables a basic social network using Web5, which means we’ve created a basic trustless, decentralized social network where your users host all of their own data; images, captions, and messages are all theirs.
