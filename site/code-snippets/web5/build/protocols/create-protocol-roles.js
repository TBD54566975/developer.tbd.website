export const eventBookingProtocolDefinitionWithRoles = (web5) => {
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
            admin: {
                $globalRole: true
            },
            event: {
                $actions: [
                    {
                        who: "anyone",
                        can: "write"
                    },
                    {
                        who: "anyone",
                        can: "read"
                    }
                ],
                guest: {
                    $contextRole: true,
                    $actions: [
                        {
                            who: "author",
                            of: "event",
                            can: "write"
                        },
                        {
                            who: "anyone",
                            can: "read"
                        },
                        {
                            role: "admin",
                            can: "delete"
                        }
                    ]
                },
                rsvp: {
                    $actions: [
                        {
                            role: "event/guest",
                            can: "write"
                        },
                        {
                            role: "event/guest",
                            can: "query"
                        },
                        {
                            role: "event/guest",
                            can: "read"
                        },
                        {
                            role: "admin",
                            can: "query"
                        }
                    ]
                }
            }
        }
    };
    return eventBookingProtocolDefinition;
};

export const assignProtocolRole = async ( guestData, eventId, guestDid) => {
    const protocolDefinition = await eventBookingProtocolDefinitionWithRoles(web5);
    try {
        const response = await web5.dwn.records.create({
            data: guestData,
            message: {
                contextId: eventId,
                parentId: eventId,
                protocol: protocolDefinition.protocol,
                protocolPath: "event/guest",
                schema: protocolDefinition.types.guest.schema,
                recipient: guestDid,
            },
        });
        return response

    } catch (error) {
        console.error("Error creating and sending participant:", error);
        return { record: null, status: null };
    }
}

export const assignGlobalRole = async (guestData, guestDid) => {
    const protocolDefinition = await eventBookingProtocolDefinitionWithRoles(web5);
    try {
        const response = await web5.dwn.records.create({
            data: guestData,
            message: {
                protocol: protocolDefinition.protocol,
                protocolPath: "admin",
                schema: protocolDefinition.types.admin.schema,
                recipient: guestDid,
            },
        });
        return response

    } catch (error) {
        console.error("Error creating and sending participant:", error);
        return { record: null, status: null };
    }
}


