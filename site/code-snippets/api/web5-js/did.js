export async function createMyDid(web5) {
  const myDid = await web5.did.create('ion');

  return myDid;
}
