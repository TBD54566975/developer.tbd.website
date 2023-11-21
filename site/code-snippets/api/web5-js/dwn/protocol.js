export async function getProtocolDefinition(web5, protocolDefinition) {
  const { protocol } = await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition
    }
  });

  //highlight-start
  const definition = protocol.definition;
  //highlight-end

  return definition;
}

export async function configureProtocolAndSend(
  web5,
  myDid,
  protocolDefinition,
) {
  const { protocol } = await web5.dwn.protocols.configure({
    message: {
      definition: protocolDefinition
    }
  });

 
  //highlight-start
  const {status} = await protocol.send(myDid);
  //highlight-end

  return status;
}

export async function queryProtocol(web5) {
  const { protocols } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: 'http://social-media.xyz'
      }
    }
  });

  //highlight-start
  const protocolConfig = protocols[0].toJSON();
  //highlight-end

  return protocolConfig;
}
