import { test, expect, describe } from 'vitest';
// :snippet-start: importKeyManagementJs
import { DidDht } from '@web5/dids';
import { LocalKeyManager } from "@web5/crypto";
import { AwsKeyManager } from "@web5/crypto-aws-kms";
// :snippet-end:

describe('key-management', () => {
    // :snippet-start: initializeKeyManagementJs
    async function initKeyManagement(env, didUri, didDhtApi) {
        // Determine which key manager to use based on the environment
        let keyManager;
        if (env === "production") {
            keyManager = new AwsKeyManager();
        } else {
            keyManager = new LocalKeyManager();
        }

        // Initialize or load a DID
        let did;
        if (didUri == null) {
            // Create a new DID
            did = await DidDht.create(keyManager);
        } else {
            // Load existing DID
            did = await new DidDht(didUri, keyManager, didDhtApi);
        }

        return did;
    }
    // :snippet-end:

    
    test('initialize key management', async () => {
        const returnedDid = await initKeyManagement("dev");
        expect(returnedDid.keyManager).toBeInstanceOf(LocalKeyManager);
    });

});
