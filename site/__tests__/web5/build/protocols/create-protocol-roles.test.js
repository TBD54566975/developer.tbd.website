import { test, beforeAll, expect, describe } from 'vitest';
import {
    eventBookingProtocolDefinitionWithRoles,
    assignProtocolRole,
    assignGlobalRole,   
} from '../../../../code-snippets/web5/build/protocols/create-protocol-roles';
import { createLocalRecord } from '../../../../code-snippets/web5/build/decentralized-web-nodes/send';

let web5;
let did;

describe('create-protocol-roles', () => {
    // connect to web5 beforeAll tests and assign it to web5 variable
    beforeAll(async () => {
        web5 = globalThis.web5;
        did = globalThis.did;
    });
    test('eventBookingProtocolDefinitionWithRoles can be configured', async () => {
        const protocolDefinition = await eventBookingProtocolDefinitionWithRoles(web5);
        const response = await web5.dwn.protocols.configure({
            message: {
                definition: protocolDefinition,
            },
        });

        expect(response.status.code).toBe(202);
    });

    test('assignGlobalRole assigns a $globalRole to user in protocol', async () => {
        const guestData = {
            name: 'Alice',
            
        }
        const record = await createLocalRecord(web5);
         await record.send(did)
        const result = await assignGlobalRole(guestData, did);
        console.log(result.status)
        expect(result.status.code).toBe(202);
    });
    test('assignContextRole assigns contextRole in a protocol', async () => {
        const guestData = {
            name: 'Alice',

        }
        const record = await createLocalRecord(web5);
        await record.send(did)
        const result = await assignProtocolRole(guestData, record.id, did);
        console.log(result.status)
        expect(result.status.code).toBe(202);
    });
});