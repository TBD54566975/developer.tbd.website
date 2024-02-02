import { test, expect, describe, beforeAll, vi } from 'vitest';
import {
  connectWithDWNEndpoint,
  connectWithAgentAndConnectedDid,
  connectWithSyncConfig,
} from '../../../../../code-snippets/api/web5-js';
import { setUpWeb5 } from '../../setup-web5';

// Mock needed to not conflict with globalThis.web5
vi.mock('@web5/api', () => {
  return {
    Web5: {
      connect: vi.fn(({ connectedDid }) => {
        return {
          web5: {},
          did: connectedDid || 'did:ion:EiBq1ELpOTStuDt...',
        };
      }),
    },
  };
});

describe('web5-js-api-index', () => {
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
  });

  test('connect with DWN endpoint', async () => {
    const did = await connectWithDWNEndpoint();
    expect(did).toBeTypeOf('string');
  });

  test('connect with agent and connectedDid', async () => {
    const existingDid =
      'did:ion:EiBq1ELpOTStuDtHW1C66IXbcQhBN-mABVzfj5UhchWG_w:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiSmI5VTZyVlNXeUJ5UGpVaWU5YWJCWDMwbTM0VUlHcUppc25INmpCYzdNcyJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ0cl9QQUktaWdxNFc1N04xNFpmemthaUtCaHdrSjBGQ2s5ckw4NTU2OHJFIiwieSI6Ik9FZWkwUDAtcl95R0NzZE45aGN3MUdtdllmWnBLSElBOG9zNHBoSlJYUTQifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNiIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMyJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlEQUFsemJCYXhDR2JjYVJva3NHR3lyMjUtbWVjVUZGa2NfTl93VFRWcEJyUSJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRFhuak12bGpWUjNvSzF0WE1hQ2N2Ukc5TkQ2Zlk3b2JzaFJtdkU4Uzh3RVEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUJWZjFoOHV5Ulh4QS1fUl9xRlBkRHZVVWhWQzZ2OU5SV1BKSmwzVkZjMndRIn19';
    const returnedDid = await connectWithAgentAndConnectedDid(existingDid);
    expect(returnedDid).toBe(existingDid);
  });

  test('connect with sync configuration', async () => {
    const did = await connectWithSyncConfig();
    expect(did).toBeTypeOf('string');
  });
});
