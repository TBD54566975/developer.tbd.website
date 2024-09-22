---
title: Send DWN Records
sidebar_position: 12
---

import CodeSnippet from '@site/src/components/CodeSnippet';

With Web5, records can be:
* [written to a user's local DWN](#write-to-local-dwn)
* [sent to a user's remote DWNs](#send-to-users-remote-dwns)
* [sent to another user's DWNs](#send-to-recipients-dwns)
<!--//blocked by https://github.com/TBD54566975/dwn-sdk-js/issues/550 -->
<!--* [written to a recipient's local DWN](#write-to-recipients-local-dwn)-->

This guide shows how to use Web5 to handle each scenario.

## Write to Local DWN

The [records.create()](https://tbd54566975.github.io/web5-js/classes/_web5_api.DwnApi.html#records) function creates a record and also writes it to the user's local DWN. You do _not_ need to call the `send()` function to write a record to a local DWN.

<CodeSnippet snippetName="createLocalRecord" />

The same is true for the [protocols.configure()](https://tbd54566975.github.io/web5-js/classes/_web5_api.DwnApi.html#protocols) function. It creates the protocol object and installs it on the user's local DWN. You do _not_ need to call the `send()` method to install a protocol on a local DWN.

<CodeSnippet snippetName="createLocalProtocol" />


<!--//blocked by https://github.com/TBD54566975/dwn-sdk-js/issues/550-->
<!--## Write to Recipient's Local DWN-->

<!--Assuming permission has been established, one party can send records to another. The records are sent to the recipient's local DWN if the `target` property is specified when creating the record. Calling `records.create()` accomplishes this, and you do _not_ need to call `send()`.-->

<!--<CodeSnippet snippetName="sendLocalRecordToTarget" /> -->


## Send to User's Remote DWNs

By default, Web5 will automatically [sync](/docs/web5/decentralized-web-nodes/sync) records and protocols between a user's local and remote DWNs. There is no special action required to accomplish this.

However, sync happens on a predefined [interval](/docs/web5/decentralized-web-nodes/sync#sync-intervals). If you want a record or protocol immediately sent to the user's remote DWNs, then you can call `send()`. This will only send that particular record or protocol to the remote DWNs and is not a full sync of the DWNs.

<CodeSnippet snippetName="sendRecordToRemoteDWNs" />

<CodeSnippet snippetName="sendProtocolToRemoteDWNs" />


## Send to Recipient's DWNs

Assuming permission has been established, one party can send records to another. To do so, the user can create the record and then call `send()` to send it to another party.


<CodeSnippet snippetName="sendRecordToDWNOfRecipient" />