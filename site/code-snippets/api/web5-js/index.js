import { Web5 } from '@web5/api';

let identityAgent = null;

export async function connectWithDWNEndpoint() {
  const { web5, did } = await Web5.connect({
    techPreview: {
      dwnEndpoints: ['https://dwn.your-domain.org/'],
    },
  });
  return did;
}

export async function connectToCommunityNode(){
  const {web5, did} = await Web5.connect({
    didCreateOptions: {
      dwnEndpoints: ['https://dwn.gcda.xyz'], // User provides google's community DWN instance
    },
    registration: {
      onSuccess: () => {
        // Registration succeeded, set a local storage value to indicate the user is registered and registration does not need to occur again.
      },
      onFailure: (error) => {
        // Registration failed, display an error message to the user, and pass in the registration object again to retry next time the user connects.
      },
    },
  })
  return did
}

export async function connectWithAgentAndConnectedDid(existingDid) {
  const { web5, did } = await Web5.connect({
    agent: identityAgent,
    connectedDid: existingDid,
  });
  return did;
}

export async function connectWithSyncConfig() {
  const { web5, did } = await Web5.connect({
    sync: '5s',
  });
  return did;
}
