import { IdentityAgent } from '@web5/identity-agent';


export async function createIdentityAgent() {
    const agent = await IdentityAgent.create();
    return agent;
}

export async function authenticateIdentityAgent(agent) {
    await agent.start({ passphrase: 'default-passphrase' });
    return agent.agentDid;
}

export async function getDwnEndpoints() {
// selects DWN endpoints that are provided by default during the Web5 tech preview period
const serviceEndpointNodes = 'https://dwn.tbddev.org/beta'

// generates key pairs used for authorization and encryption when interfacing with DWNs
const didOptions = {
    services: [{
        id              : '#dwn',
        type            : 'DecentralizedWebNode',
        serviceEndpoint : serviceEndpointNodes,
    }]
}
return didOptions;
}

export async function createSocialMediaAndCareerIdentity() {
    const socialMediaIdentity = await agent.identityManager.create({
        name: 'SocialMedia',
        didMethod: 'ion',
        didOptions,
        kms: 'local'
    });

    const careerIdentity = await agent.identityManager.create({
        name: 'Career',
        didMethod: 'ion',
        didOptions,
        kms: 'local'
    });

    return { socialMediaIdentity, careerIdentity };
}

export async function connectIdentityToWeb5() {
    const { web5 } = await Web5.connect({
        connectedDid: socialMediaIdentity.did,
        agent,
    });
    return web5;
}