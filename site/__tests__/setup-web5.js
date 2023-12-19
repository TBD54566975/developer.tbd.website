import { beforeAll } from 'vitest';
import { Web5 } from '@web5/api';

// node.js 18 and earlier,  needs globalThis.crypto polyfill
import { webcrypto } from 'node:crypto';
// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;

const testDwnUrl = import.meta.env.VITE_APP_TEST_DWN_URL;

beforeAll(async () => {
  if (globalThis.web5 || globalThis.did) {
    return;
  }

  const dwnOptions = testDwnUrl
    ? {
        techPreview: {
          dwnEndpoints: ['http://localhost:3000'],
        },
      }
    : undefined;

  console.info('Setting up Web5 >>>', { dwnOptions });

  const { web5, did } = await Web5.connect(dwnOptions);

  console.info('Web5 setup complete!');

  globalThis.web5 = web5;
  globalThis.did = did;
});
