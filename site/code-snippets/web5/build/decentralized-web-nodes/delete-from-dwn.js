export async function deleteFromLocalDWN(web5, recordId) {
  const deleteResult = await web5.dwn.records.delete({
    message: {
      recordId: recordId
    },
  });

  return deleteResult;
}
