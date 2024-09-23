import { beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { Web5 } from '@web5/api';

// node.js 18 and earlier,  needs globalThis.crypto polyfill
import { webcrypto } from 'node:crypto';
// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;

const testDwnUrl = import.meta.env.VITE_APP_TEST_DWN_URL;

import { Web5IdentityAgent } from '@web5/identity-agent';

export const setUpWeb5 = async () => {
  const password = 'super-secret-test-password'; 

  const dwnOptions = testDwnUrl
    ? {
      techPreview: {
        dwnEndpoints: ['http://localhost:3000'],
      },
    }
    : undefined;

  let options = { password: password };

  if (dwnOptions) {
    options.techPreview = dwnOptions.techPreview;
  }

  const { web5, did } = await Web5.connect(options);

  globalThis.web5 = web5;
  globalThis.did = did;

  return { web5, did };
};

export const setUpIdentityManager = async () => {
  const identityAgent = await Web5IdentityAgent.create();

  globalThis.identityAgent = identityAgent;

  return identityAgent;
};

afterAll(async () => {
  const agent = globalThis.identityAgent || globalThis.web5?.agent;

  if (agent) {
    
    await agent.sync.stopSync();
    
    const dbs = [
      agent.vault._store,
      agent.did.cache.cache,
      agent.sync._syncEngine._db,
      agent.dwn._dwn.messageStore.blockstore.db,
      agent.dwn._dwn.messageStore.index.db,
      agent.dwn._dwn.dataStore.blockstore.db,
      agent.dwn._dwn.eventLog.index.db,
      agent.dwn._dwn.resumableTaskStore.db
    ];

    for (const db of dbs) {
      await db.clear();
      await db.close();
    }
    delete globalThis.identityAgent;
    delete globalThis.web5;
    delete globalThis.did;
  }
});
