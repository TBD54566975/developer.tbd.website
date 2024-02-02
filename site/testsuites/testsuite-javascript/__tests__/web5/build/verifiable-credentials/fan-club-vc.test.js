import { test, expect, vi, describe, beforeAll } from 'vitest';
import { DidKeyMethod } from '@web5/dids';
import { setUpWeb5 } from '../../../setup-web5';

let web5;

describe('fan-club-vc', () => {
    beforeAll(async () => {
        await setUpWeb5();
        web5 = globalThis.web5;
        did = globalThis.did;

        vi.mock('@web5/api', () => {
            return {
                Web5: {
                    connect: vi.fn(() => {
                        return {
                            web5,
                            did,
                        };
                    }),
                },
            };
        });
    });

    test('createDidKeys creates an issuer DID and alice DID with did:key method', async () => {
        // :snippet-start: createDidKeys
        const fanClubIssuerDid = await DidKeyMethod.create();
        const aliceDid = await DidKeyMethod.create();
        // :snippet-end:

        expect(aliceDid.did).toMatch(/^did:key:/);
        expect(fanClubIssuerDid.did).toMatch(/^did:key:/);
    });
});
