import { test, expect, describe } from 'vitest';
import {
  createDidAutomatically,
  createDidDht,
  createDidIon,
  createDidKey
} from '../../../../code-snippets/web5/build/decentralized-identifiers/how-to-create-did';

describe('create-dids', () => {

  //timing out
  test.skip('createDidAutomatically returns a DID', async () => {
    const did = await createDidAutomatically();
    expect(did).toBeDefined();
    expect(did).toMatch(/^did:/);
  });

  test('createDidDht creates a DID with did:dht method', async () => {
    const createdDid = await createDidDht();
    expect(createdDid).toMatch(/^did:dht:/);
  });

  test('createDidKey creates a DID with did:key method', async () => {
    const createdDid = await createDidKey();
    expect(createdDid).toMatch(/^did:key:/);
  });

  test('createDidIon creates a DID with did:ion method', async () => {
    const createdDid = await createDidIon();
    expect(createdDid).toMatch(/^did:ion:/);
  });

});