export async function queryRecordsWithFilter(web5) {
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
