export async function getProtocolDefinition(web5, protocolDefinition) {
  const { status, protocol } = await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition,
    },
  });

  const returnedDefinition = protocol.definition;

  return returnedDefinition;
}

export async function sendDefinition(web5, protocolDefinition, myDid) {
  const { protocol } = await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition,
    },
  });

  await protocol.send(myDid);

  return protocol;
}
