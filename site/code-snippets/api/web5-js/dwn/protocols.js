export async function configureProtocolWithDefinition(web5, myDid) {
  const { protocol } = await web5.dwn.protocols.configure({
    message: {
      definition: {
        protocol: 'https://photos.org/protocol',
        published: false,
        types: {
          album: {
            schema: 'https://photos.org/protocol/album',
            dataFormats: ['application/json'],
          },
          photo: {
            schema: 'https://photos.org/protocols/photo',
            dataFormats: ['application/json'],
          },
          binaryImage: {
            dataFormats: ['image/png', 'jpeg', 'gif'],
          },
        },
        structure: {
          album: {
            $actions: [
              {
                who: 'recipient',
                can: 'read',
                of: 'album',
              },
            ],
          },
          photo: {
            $actions: [
              {
                who: 'recipient',
                can: 'read',
                of: 'photo',
              },
            ],
            binaryImage: {
              $actions: [
                {
                  who: 'author',
                  of: 'photo',
                  can: 'write',
                },
              ],
            },
          },
        },
      },
    },
  });

  /*
Sends the protocol configuration to the user's remote DWNs. This function only needs 
to be called if you'd like to send instantly and cannot wait for sync to occur.
*/
  protocol.send(myDid);

  return protocol;
}

export async function queryMusicProtocol(web5) {
  const { protocols } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: 'https://music.org/protocol',
      },
    },
  });

  // logs an array of protocol configurations installed on the user's DWN
  console.log(protocols);

  return protocols;
}

export async function queryProtocolDescending(web5) {
  // Sorting protocols by dateCreated in descending order

  const { protocols } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: 'http://social-media.xyz',
      },
      //highlight-start
      dateSort: 'createdDescending',
      //highlight-end
    },
  });

  return protocols;
}
