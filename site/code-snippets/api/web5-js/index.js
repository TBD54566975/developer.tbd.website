import { Web5 } from '@web5/api';

let identityAgent = null;

export async function connectWithDWNEndpoint() {
const { web5, did } = await Web5.connect({
  techPreview: {
    dwnEndpoints: ["https://dwn.your-domain.org/"]
  },
});
return did;
}

export async function connectWithAgentAndConnectedDid(existingDid) {
const {web5, did} = await Web5.connect({
  agent: identityAgent,
  connectedDid: existingDid
});
return did;
}

export async function connectWithSyncConfig() {
const {web5, did} = await Web5.connect({
  sync: '5s'
});
return did;
}
