import { IdentityAgent } from '@web5/identity-agent';
import { getTechPreviewDwnEndpoints } from '@web5/api';
import { DidIonMethod } from '@web5/dids';


export async function createIdentityAgent() {
    const agent = await IdentityAgent.create();
    return agent;
}

export async function authenticateIdentityAgent(agent) {
    const auth = await agent.start({ passphrase: 'default-passphrase' });
    return auth;
}

export async function getDwnEndpoints() {
// selects DWN endpoints that are provided by default during the Web5 tech preview period
const endpoints = await getTechPreviewDwnEndpoints();
return endpoints;
}

export async function createDidOptions({ serviceEndpointNodes }) {
// generates key pairs used for authorization and encryption when interfacing with DWNs
const didOptions = await DidIonMethod.generateDwnOptions({ serviceEndpointNodes });
return didOptions;
}

export async function createSocialMediaIdentity() {
    const socialMediaIdentity = await agent.identityManager.create({
        name: 'SocialMedia',
        didMethod: 'ion',
        didOptions,
        kms: 'local'
    });
    return socialMediaIdentity;
}

export async function createCareerIdentity() {
    const careerIdentity = await agent.identityManager.create({
        name: 'Career',
        didMethod: 'ion',
        didOptions,
        kms: 'local'
    });
    return careerIdentity;
}

export async function connectIdentityToWeb5() {
    const { web5 } = await Web5.connect({
        connectedDid: socialMediaIdentity.did,
        agent,
    });
    return web5;
}