---
sidebar_position: 7
title: Revoke Credentials
hide_title: true
---

# Revoke a Credential

When forming a request to [create a credential](/docs/apis/ssi-service#tag/Credentials/paths/~1v1~1credentials/put), there are a number of possible request values, two of which are `revocable` and `suspendable`. These options are exposed to give issuers the ability to specify [status for credentials](credential-status) they create in the service.

In this guide we'll go over how to revoke a credential.

:::info
### Prerequsite

Create a [Credential with Status](/docs/ssi/credential-status#create-a-credential-with-status)
:::

As the creator of a credential, you're able to change the status of that credential.

To do so, make a `PUT` request to `/v1/credentials/{id}/status` and specify a boolean value for the status you'd like to change.

Given a credential was created with `revocable` as true, you can revoke that credential by setting `revoked` to true:

```bash
curl -X PUT localhost:8080/v1/credentials/8f9d58b2-c978-4317-96bd-35949ce76121/status -d '{ "revoked": true }'
```

Upon success, you'll see the following response:

```json
{ 
  //highlight-next-line
  "revoked": true,
  "suspended": false
}
```

:::note
It is possible to reverse the status of a credential. To do so, make a PUT request to /v1/credentials/{id}/status, and set the value of revoked to false.
:::