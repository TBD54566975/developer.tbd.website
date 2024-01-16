import { test, expect, describe, beforeAll } from 'vitest';
import {
    createIdentityAgent,
    getDwnEndpoints,
    createDidOptions,
    createSocialMediaIdentity
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/use-identity-agents';
import { IdentityAgent } from '@web5/identity-agent';

let agent;

describe('create identity agent', () => {
    beforeAll(async () => {
       // by time IdentityAgent.create() is executed, Web5.connect() has already run(in setup - web5.js)
        if (!globalThis.web5 || !globalThis.did) {
            throw new Error('Web5 setup is required for these tests.');
        }
       // agent = await createIdentityAgent();
    });
    test('createDidOptions returns an object with cryptographic keys and service endpoints', async () => {
        const didOptions = await getDwnEndpoints();

        expect(didOptions).toHaveProperty('keySet.verificationMethodKeys');
        expect(Array.isArray(didOptions.keySet.verificationMethodKeys)).toBe(true);
        expect(didOptions).toHaveProperty('services');
        expect(Array.isArray(didOptions.services)).toBe(true);
        didOptions.services.forEach(service => {
            expect(service).toHaveProperty('id');
            expect(service).toHaveProperty('serviceEndpoint');
            expect(service).toHaveProperty('type');
            expect(service.type).toBe('DecentralizedWebNode');
        });
    });
});
