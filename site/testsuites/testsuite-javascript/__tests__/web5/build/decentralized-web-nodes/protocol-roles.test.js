import { test, beforeAll, expect, describe } from 'vitest';
import { DidDht } from '@web5/dids'
import { setUpWeb5 } from '../../../setup-web5';

let web5;
let did;
let aliceDid;

// :snippet-start: curatorPlaylistProtocolDefinitionJs
const curatorPlaylistProtocolDefinition = {
    protocol: 'https://example.com/playlist-protocol',
    published: true,
    types: {
        playlist: {
            schema: "https://example.com/playlist-protocol/schema/playlist",
            dataFormats: ['application/json']
        },
        // highlight-start
        curator: {
            schema: "https://example.com/playlist-protocol/schema/curator",
            dataFormats: ['text/plain']
        },
        // highlight-end
        admin: {
            schema: "https://example.com/playlist-protocol/schema/admin",
            dataFormats: ['text/plain']
        }
    },
    structure: {
        curator: {
            // highlight-next-line
            $role: true,
        },
        admin: {
            $role: true,
        },
        playlist: {
            $actions: [ 
                {
                    who: 'anyone',
                    can: ['read']
                },
                // highlight-start
                {
                    role: 'curator', 
                    can: ['create', 'update']
                },
                // highlight-end
                {
                    role: 'admin', 
                    can: ['create', 'update', 'delete']
                },
            ],
        }
    }
};
// :snippet-end:

// :snippet-start: chatProtocolDefinitionJs
const chatProtocolDefinition = {
    protocol: "https://example.com/chat-protocol",
    published: true,
    types: {
      chat: {
        schema: "https://example.com/chat-protocol/schema/chat",
        dataFormats: ["application/json"],
      },
    },
    structure: {
      chat: {
        $actions: [
          { who: "anyone", can: ["create"] },
          { who: "author", of: "chat", can: ["read"] },
          { who: "recipient", of: "chat", can: ["read"] },
        ],
      },
    },
  };
  // :snippet-end:

describe('Playlist protocol roles', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;
    aliceDid = await DidDht.create();
  });

  test('install chat protocol', async () => {
    // just to make sure chat protocol is working as expected
    const { protocol, status } = await web5.dwn.protocols.configure({
        message: {
            definition: chatProtocolDefinition,
        },
    });

    // send protocol to remote DWNs immediately
    const { status: sendStatus } = await protocol.send(did);
    expect(protocol).toBeDefined();
    expect(status.code).to.equal(202);
    expect(sendStatus.code).to.equal(202);
    });


  test('install playlist protocol', async () => {
    // :snippet-start: installPlaylistProtocolJs
    const { protocol, status } = await web5.dwn.protocols.configure({
        message: {
            definition: curatorPlaylistProtocolDefinition,
        },
    });

    // send protocol to remote DWNs immediately
    const { status: sendStatus } = await protocol.send(did);
    // :snippet-end:
    expect(protocol).toBeDefined();
    expect(status.code).to.equal(202);
    expect(sendStatus.code).to.equal(202);
  });

    test('assign protocol protocol role', async () => {
        const aliceDidUri = aliceDid.uri;
        // :snippet-start: assignPlaylistRoleJs
        const { record, status } = await web5.dwn.records.create({
            message: {
                dataFormat: 'text/plain',
                protocol: curatorPlaylistProtocolDefinition.protocol,
                protocolPath: 'curator',
                schema: curatorPlaylistProtocolDefinition.types.curator.schema,
                recipient: aliceDidUri,
            },
        });
        
        const { status: recordSendStatus } = await record.send(did);
        // :snippet-end:
    
        expect(record).toBeDefined();
        expect(status.code).to.equal(202);
        expect(recordSendStatus.code).to.equal(202);
    });

    test('Create a record within a role', async () => {
        const bobDidUri = did; 
        // :snippet-start: createRecordInRoleJs
        const { record, status } = await web5.dwn.records.create({
            data: JSON.stringify({
            name: "My Favorite Songs",
            description: "A collection of my all-time favorites",
            songs: [],
         }),
            message: {
                dataFormat: 'application/json',
                protocol: curatorPlaylistProtocolDefinition.protocol,
                protocolPath: 'playlist',
                protocolRole: 'curator',
                schema: curatorPlaylistProtocolDefinition.types.playlist.schema,
                recipient: bobDidUri,
            },
        });
        // :snippet-end:
        const expectedPlaylistData = {"name":"My Favorite Songs","description":"A collection of my all-time favorites","songs":[]}
        expect(await record.data.text()).to.equal(JSON.stringify(expectedPlaylistData));
        expect(record).toBeDefined();
        expect(status.code).to.equal(202);
    });
});