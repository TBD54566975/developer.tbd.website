export async function eventBookingProtocolDefinitionWithRoles() {
const eventBookingProtocolDefinition = {
    protocol: "https://example.com/protocols/event",
    published: true,
    types: {
        event: {
            schema: "https://example.com/schema/event",
            dataFormats: ["application/json"]
        },
        rsvp: {
            schema: "https://example.com/schema/rsvp",
            dataFormats: ["application/json"]
        },
        guest: {
            schema: "https://example.com/schema/guest",
            dataFormats: ["application/json"]
        },
        admin: {
            schema: "https://example.com/schema/admin",
            dataFormats: ["application/json"]
        }
    },
    structure: {
        admin: { $globalRole: true },
        event: {
            $actions: [
                { who: "anyone", can: "write" },
                { who: "anyone", can: "read" }
            ],
            guest: {
                $contextRole: true,
                $actions: [
                    { who: "author", of: "event", can: "write" },
                    { who: "anyone", can: "read"},
                    { role: "admin", can: "delete" }
                ]
            },
            rsvp: {
                $actions: [
                    { role: "event/guest", can: "write" },
                    { role: "event/guest", can: "query" },
                    { role: "event/guest", can: "read" },
                    { role: "admin", can: "query" }
                ]
            }
        }
    }
};
return eventBookingProtocolDefinition;
};

export async function assignContextRole(guestData, eventRecordId, guestDid, protocolDefinition) {
const response = await web5.dwn.records.create({
    data: guestData,
    message: {
        contextId: eventRecordId,
        parentId: eventRecordId,
        protocol: protocolDefinition.protocol,
        //highlight-next-line
        protocolPath: "event/guest",
        schema: protocolDefinition.types.guest.schema,
        recipient: guestDid
    }
});

if(response.status.code == 202){
    await response.record.send(guestDid);
}
return response;
}

export async function assignGlobalRole(adminData, adminDid, protocolDefinition){
const response = await web5.dwn.records.create({
    data: adminData,
    message: {
        protocol: protocolDefinition.protocol,
        //highlight-next-line
        protocolPath: "admin",
        schema: protocolDefinition.types.admin.schema,
        recipient: adminDid
    }
});

if(response.status.code == 202){
    await response.record.send(adminDid);
}
return response;
}
