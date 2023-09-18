export async function configureProtocol(web5, protocolDefinition) {
  const { status, protocol } = await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition,
    },
  });

  //highlight-start
  const definitionResult = protocol.definition;
  //highlight-end

  console.log('resultStatus', definitionResult.protocol);

  return definitionResult;
}

export async function configureProtocolAndSend(
  web5,
  protocolDefinition,
  myDid,
) {
  const { status, protocol } = await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition,
    },
  });

  //highlight-start
  await protocol.send(myDid);
  //highlight-end
}

export async function queryProtocol(web5) {
  const { protocols, status } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: 'http://social-media.xyz',
      },
    },
  });

  //highlight-start
  const protocolConfig = protocols[0].toJSON();
  //highlight-end

  return { status };
}
