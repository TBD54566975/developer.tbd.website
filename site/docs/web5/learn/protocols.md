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
- Only the recipient(s) or the author of a message should be able to reply to it
- Only the recipient(s) of an image should be able to reply to it

## Defining a Protocol

We know the key words for defining protocols - `types`, `structure`, and `actions` - as well as our data and permissions schemas. So our protocol would look this:

```js
const protocolDefinition = {
    "protocol": "https://social-media.xyz",
    "published": true,
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
            },
            {
              "who": "author",
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

The value for `protocol` is a URI that represents the protocol being configured.

The `published` attribute indicates whether the protocol should be public. Published protocols are accessible by anyone who [queries](/api/web5-js/dwn/protocols#queryrequest) for them.

```json
{
  "protocol": "https://social-media.xyz",
  "published": true,
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
    "dataFormats": ["image/jpeg"]
  },
  "caption": {
    "schema": "https://social-media.xyz/schemas/captionSchema",
    "dataFormats": ["text/plain"]
  }
},
```

You’ll then notice how each of those `types` is used in the large `structure` object, which at a top level houses the `message` and `image` data types which are critical to our social network.

```json
"structure": {
  //highlight-next-line
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
        },
        {
            "who": "author",
            "of": "message",
            "can": "write"
          }            
      ]
    }
  },
  //highlight-next-line
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
  //highlight-next-line
  "reply": {
    "$actions": [
      {
        "who": "recipient",
        "of": "message",
        "can": "write"
      },
      {
        "who": "author",
        "of": "message",
        "can": "write"
      }            
    ]
  }
},
```

Additionally, you’ll notice the `image` object below it also defines `actions` permissions, along with more child properties and their permissions.

```json
//highlight-next-line
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
  //highlight-next-line
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
  //highlight-next-line
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

Once you’ve installed that protocol to your DWN, you’re ready to communicate using the schema and permissions it defines.

## Protocols in Practice

Building on our social media example, let’s say that you wanted to post a message to your friend Alice. First, ensure that she has also installed the `https://social-media.xyz` protocol on her DWN. Then, you can write to her DWN via the `https://social-media.xyz` protocol using:

```js
const { record: messageRecord, status: createStatus } = await web5.dwn.records.create({
  data: 'Hey this is my first message!',
  message: {
    schema: 'https://social-media.xyz/schemas/messageSchema',
    dataFormat: 'text/plain',
    protocol: protocolDefinition.protocol,
    protocolPath: 'message'
  }
});

const { status: sendStatus } = await record.send(aliceDid);

if (sendStatus.code === 202) {
    console.log('message was successfully sent to Alice')
}
else {
    console.log('send failed!', sendStatus.code, sendStatus.detail)
}
```

Now, let's say Alice wants to reply to the message. Remember, `reply` is a child of `message`, therefore this record should reference the message record's id as its parent.

```js
const replyResponse = await web5.dwn.records.create({
    data: "replying to message",
    message: {
        protocol: protocolDefinition.protocol,
        protocolPath: 'message/reply',
        //highlight-next-line
        parentId: messageRecord.id,
        contextId: messageRecord.contextId,
        schema: "https://social-media.xyz/schemas/replySchema",
        dataFormat: 'text/plain',
    },
})
```



And that’s it! Via the `social-media` protocol, you’ve now written a message to Alice’s DWN and she has replied.

This protocol enables a basic social network using Web5, which means we’ve created a basic trustless, decentralized social network where your users host all of their own data; images, captions, and messages are all theirs.

## Nested Types

The above example illustrates how to create a basic protocol, but there may be the need to create a protocol that involves nested types.

For example, let's consider the following `User` object:

```js
//highlight-next-line
type User = {
  firstName: string,
  lastName: string,
  //highlight-next-line
  address: Address
}
```

We need to register `Address` as a type nested under our root schema, `User`, and we also need to specify the schema details for `firstName` and `lastName`. We can do so by using multiple schemas that define their respective properties.

```js
{
  protocol: "https://social-media.xyz/schemas/user.schema.json",
  types: {
    //highlight-start
    user: {
      schema: "https://social-media.xyz/schemas/user.schema.json",
      //highlight-end
      dataFormats: ["application/json"],
    },
    //highlight-start
     address: {
      schema: "https://social-media.xyz/schemas/address.schema.json",
      //highlight-end
      dataFormats: ["application/json"],
    },
  },
  structure: {
    user: {
      address: {
        $actions: [
        {
          who: "anyone",
          can: "read",
        },
        ],
      },
      $actions: [
        {
          who: "anyone",
          can: "read",
        },
      ],
    },
  },
  published: true,
};
```

The contents of `user.schema.json` might resemble:

```json
{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    //highlight-start
    "address": {
      "$ref": "https://social-media.xyz/schemas/address.schema.json"
    }
    //highlight-end
  },
  "required": ["firstName", "lastName", "address"]
}
```

And the contents of `address.schema.json` might resemble:

```json
{
  "type": "object",
  "properties": {
    "street": {
      "type": "string"
    },
    "city": {
      "type": "string"
    },
    "state": {
      "type": "string"
    },
    "zipCode": {
      "type": "string"
    }
  },
  "required": ["street", "city", "state", "zipCode"]
}
```


## Example Protocols
Here's a bunch of [example protocols](https://github.com/TBD54566975/dwn-sdk-js/tree/main/tests/vectors/protocol-definitions) for more inspiration!