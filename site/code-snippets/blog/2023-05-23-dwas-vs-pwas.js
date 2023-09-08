export async function createRecordWithTodoItem(
  web5,
  myDid,
  todoItem = 'Some todo item',
) {
  const myRecord = await web5.dwn.records.create(myDid.id, {
    data: 'todoItem',
    message: {
      dataFormat: 'text/plain',
    },
  });

  return myRecord;
}
