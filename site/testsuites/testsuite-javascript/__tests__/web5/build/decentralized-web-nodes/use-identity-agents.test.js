import { test, expect, describe } from 'vitest';
import {
  getDwnEndpoints,
  createIdentityAgent,
} from '../../../../../../code-snippets/web5/build/decentralized-web-nodes/use-identity-agents';
import { afterEach, beforeEach } from 'vitest';
import { IdentityAgent } from '@web5/identity-agent';
import { setUpIdentityManager } from '../../../setup-web5';

let agent;

describe('create identity agent', () => {
  test('createIdentityAgent', async () => {
    agent = await setUpIdentityManager();
  });
  test('createDidOptions returns an object with service endpoints', async () => {
    const didOptions = await getDwnEndpoints();

    expect(didOptions).toHaveProperty('services');
    expect(Array.isArray(didOptions.services)).toBe(true);
    didOptions.services.forEach((service) => {
      expect(service).toHaveProperty('id');
      expect(service).toHaveProperty('serviceEndpoint');
      expect(service).toHaveProperty('type');
      expect(service.type).toBe('DecentralizedWebNode');
    });
  });
});
