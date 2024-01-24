import { beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { Web5 } from '@web5/api';

// node.js 18 and earlier,  needs globalThis.crypto polyfill
import { webcrypto } from 'node:crypto';
// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;

const testDwnUrl = import.meta.env.VITE_APP_TEST_DWN_URL;

import { IdentityAgent } from '@web5/identity-agent';

export const setUpWeb5 = async () => {
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

  return { web5, did };
};

export const setUpIdentityManager = async () => {
  const identityAgent = await IdentityAgent.create();

  globalThis.identityAgent = identityAgent;

  return identityAgent;
};

afterAll(async () => {
  const agent = globalThis.identityAgent || globalThis.web5?.agent;

  if (agent) {
    const dbs = [
      agent.appData._store,
      agent.didResolver.cache,
      agent.syncManager._db,
      agent.dwnManager._dwn.messageStore.blockstore.db,
      agent.dwnManager._dwn.messageStore.index.db,
      agent.dwnManager._dwn.dataStore.blockstore.db,
      agent.dwnManager._dwn.eventLog.db,
    ];

    for (const db of dbs) {
      console.log('clearing db');
      await db.clear();
      console.log('closing db');
      await db.close();
      console.log('closed');
    }
    delete globalThis.identityAgent;
    delete globalThis.web5?.agent;
  }
});
