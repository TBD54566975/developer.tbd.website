import { test, expect, describe, beforeAll, vi , beforeEach} from 'vitest';
import {
    createIdentityAgent,
    getDwnEndpoints,
    createDidOptions,
    createSocialMediaIdentity
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/use-identity-agents';

let agent
describe('create identity agent', () => {
    test('createDidOptions returns the correct structure', async () => {
        const serviceEndpointNodes = await getDwnEndpoints();
        const didOptions = await createDidOptions({ serviceEndpointNodes });

        expect(didOptions).toHaveProperty('keySet.verificationMethodKeys');
        expect(didOptions).toHaveProperty('services');
        expect(Array.isArray(didOptions.services)).toBe(true);
        didOptions.services.forEach(service => {
            expect(service).toHaveProperty('id');
            expect(service).toHaveProperty('serviceEndpoint');
            expect(service).toHaveProperty('type');
        });
    });

    test('getDwnEndpoints returns an array with at least one element starting with https://dwn.tbddev.org/', async () => {
        const endpoints = await getDwnEndpoints();

        expect(Array.isArray(endpoints)).toBe(true);
        expect(endpoints.length).toBeGreaterThan(0);
        const hasCorrectPrefix = endpoints.some(endpoint => endpoint.startsWith('https://dwn.tbddev.org/'));
        expect(hasCorrectPrefix).toBe(true);
    });

    // test('createSocialMediaIdentity returns the correct structure', async () => {
    //     const socialMediaIdentity = await createSocialMediaIdentity(agent); 

    //     expect(socialMediaIdentity).toHaveProperty('did');
    //     expect(socialMediaIdentity).toHaveProperty('name');
    //     expect(socialMediaIdentity.did.startsWith('did')).toBe(true);
    // });
});
