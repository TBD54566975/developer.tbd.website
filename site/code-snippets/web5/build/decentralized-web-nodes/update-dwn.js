export async function updateDwnRecord(web5, createdRecord) {
const { record } = await web5.dwn.records.read({
  message: {
    recordId: createdRecord.id,
  }
});

const {status} = await record.update({ data: "Hello, I'm updated!" });
return status;
}
