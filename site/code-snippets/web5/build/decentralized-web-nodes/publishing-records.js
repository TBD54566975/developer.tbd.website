export async function createPublishedRecord(web5) {
  const {record} = await web5.dwn.records.create({
    data: "a published record",
    message: {
      dataFormat: "text/plain",
      //highlight-start
      published: true
      //highlight-end
    }
  });
  return record;
}

export async function createRecordWithDatePublished(web5) {
// Create a new Date instance for tomorrow
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

// Format the date and time in YYYY-MM-DDThh:mm:ss.ssssssZ format
const formattedDate = tomorrow.toISOString().replace(/\.\d{3}Z$/, '.000000Z');

// Create a record today to be published tomorrow
const { record } = await web5.dwn.records.create({
  data: "This record will be created now and published tomorrow",
  message: {
    dataFormat: "text/plain",
    //highlight-start
    published: true,
    datePublished: formattedDate
    //highlight-end
  },
});

return record.datePublished == formattedDate; 
}