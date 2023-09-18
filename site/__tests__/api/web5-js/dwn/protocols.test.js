import { test, beforeAll, expect, describe } from 'vitest';
import { Web5 } from '@web5/api/browser';
import {
  queryMusicProtocol,
  configureProtocolWithDefinition,
  queryProtocolDescending,
} from '../../../../code-snippets/api/web5-js/dwn/protocols';

let web5;
let myDid;

beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
  myDid = result.did;
});

describe('tests for /api/web5-js/dwn/protocols.js', () => {
  test('queryMusicProtocol', async () => {
    const result = await queryMusicProtocol(web5);
    expect(result).toBeDefined();
  });

  test('configureProtocolWithDefinition', async () => {
    const result = await configureProtocolWithDefinition(web5, myDid);
    expect(result).toBeDefined();
  });

  test('queryProtocolDescending', async () => {
    const result = await queryProtocolDescending(web5);
    expect(result).toBeDefined();
  });
});
