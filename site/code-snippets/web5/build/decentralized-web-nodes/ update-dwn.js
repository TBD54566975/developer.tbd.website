export async function updateDWN
const { record } = await web5.dwn.records.read({
  message: {
    recordId: 'bafyreiaz5oycqbrnmmpvffxqyoqxvx6bcnqueprmt2qnvzcurpc52r5uyy',
  }
});

const status = await record.update({ data: "Hello, I'm updated!" });
```