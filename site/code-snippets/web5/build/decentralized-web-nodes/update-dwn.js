export async function updateDwnRecord(web5, createdRecord) {
  // Get the record
const { record } = await web5.dwn.records.read({
  message: {
    filter: {
      recordId: createdRecord.id
    }
  }
});

// Update the record
// highlight-next-line
const {status} = await record.update({ data: "Hello, I'm updated!" });
return status;
}
