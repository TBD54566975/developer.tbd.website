export async function deleteFromLocalDWN(web5, recordId) {
  //Query records with plain text data format
  const response = await web5.dwn.records.query({
    message: {
      filter: {
        recordId: recordId,
      },
    },
  });

  // Grab the first indexed record
  const record = response.records[0];

  // Delete the record
  const deleteResult = await web5.dwn.records.delete({
    from: web5.did,
    message: { recordId },
  });
  return deleteResult;
}
