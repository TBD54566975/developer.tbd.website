import { test, beforeAll, expect, describe } from 'vitest';
import {
    eventBookingProtocolDefinitionWithRoles,
    assignContextRole,
    assignGlobalRole,   
} from '../../../../code-snippets/web5/build/protocols/create-protocol-roles';

let web5;
let did;
let protocolDefinition;

describe('create-protocol-roles', () => {
    beforeAll(async () => {
        web5 = globalThis.web5;
        did = globalThis.did;
        protocolDefinition = await eventBookingProtocolDefinitionWithRoles(web5);
    });

    test('eventBookingProtocolDefinitionWithRoles can be configured', async () => {
        const response = await web5.dwn.protocols.configure({
            message: {
                definition: protocolDefinition,
            },
        });
        expect(response.status.code).toBe(202);
    });

    test('assignGlobalRole assigns a $globalRole to user in protocol', async () => {
        const guestData = { name: 'Alice' }
        const result = await assignGlobalRole(guestData, did, protocolDefinition);
        
        if(result.status.code == 400){
            //preventing test from failing if the user has already been assigned a global role
            expect(result.status.detail).toContain('ProtocolAuthorizationDuplicateGlobalRoleRecipient');
        }
        else expect(result.status.code).toBe(202);
    });

    test('assignContextRole assigns contextRole in a protocol', async () => {       
        const {record: eventRecord} = await web5.dwn.records.create({
            data: { name: 'an event' },
            message: {
                protocol: protocolDefinition.protocol,
                protocolPath: "event",
                schema: protocolDefinition.types.event.schema
            }
        });
        eventRecord.send(did);
        
        const guestData = { name: 'Alice' }
        const result = await assignContextRole(guestData, eventRecord.id, did, protocolDefinition);
        expect(result.status.code).toBe(202);
    });
});