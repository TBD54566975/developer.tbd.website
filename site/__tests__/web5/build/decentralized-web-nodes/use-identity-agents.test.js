import { test, expect, describe } from 'vitest';
import {
    getDwnEndpoints,
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/use-identity-agents';

let agent;

describe('create identity agent', () => {
    // TO DO: add more tests for each code snippets after the team determines how to conditionally run tests for Web5.connect() vs. the Identity Agent
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
