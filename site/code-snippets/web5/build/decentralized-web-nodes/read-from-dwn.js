export async function readFromDwn(web5) {
  const response = await web5.dwn.records.query({
    message: {
      filter: {
        dataFormat: 'text/plain',
      },
    },
  });

  return response;
}
