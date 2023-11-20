export async function configureProtocolWithDefinition(web5, myDid) {
  const { protocol, status } = await web5.dwn.protocols.configure({
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
          comment: {
            schema: 'https://photos.org/protocols/comment',
            dataFormats: ['application/json'],
          },
        },
        structure: {
          album: {
            $actions: [
              {
                //author of album can write
                who: 'author',
                of: 'album',
                can: 'write',
              },
            ],
          },
          photo: {
            $actions: [
              {
                //recipeint of photo can read
                who: 'recipient',
                of: 'photo',
                can: 'read',
              },
            ],
            binaryImage: {
              $actions: [
                {
                  //author of photo can write
                  who: 'author',
                  of: 'photo',
                  can: 'write',
                },
              ],
            },
            comment: {
              $actions: [
                {
                  //anyone can write a comment
                  who: 'anyone',
                  can: 'write',
                },
                {
                  //anyone can read a comment
                  who: 'anyone',
                  can: 'read',
                },
              ],
            },
          },
        },
      },
    },
  });

  return { protocol, status };
}

export async function queryMusicProtocol(web5) {
  const { protocols, status } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: 'https://music.org/protocol',
      },
    },
  });

  // logs an array of protocol configurations installed on the user's DWN
  console.log(protocols);

  return { protocols, status };
}

export async function queryProtocolDescending(web5) {
  // Sorting protocols by dateCreated in descending order

  const { protocols, status } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: 'http://social-media.xyz',
      },
      //highlight-start
      dateSort: 'createdDescending',
      //highlight-end
    },
  });

  return { protocols, status };
}

export async function queryProtocolsFromDid(web5, bobDid) {
  //Query protocol on someone else's DWN
  
  const { protocols } = await web5.dwn.protocols.query({
    //highlight-start
    from: bobDid,
    //highlight-end
    message: {
      filter: {
        protocol: 'https://music.org/protocol',
      },
    },
  });

  // logs an array of protocol configurations installed on Bob's DWN
  console.log(protocols);

  return { protocols };
}
