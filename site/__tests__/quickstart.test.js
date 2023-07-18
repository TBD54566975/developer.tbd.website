import { didCreate } from '../src/util/web5';

test('didCreate returns a decentralized ID', async () => {
  const { aliceDid } = await didCreate();
  expect(typeof aliceDid).toBe('string');
});

test('adds 1 + 1 to equal 2', () => {
  expect(1 + 1).toBe(2);
});
