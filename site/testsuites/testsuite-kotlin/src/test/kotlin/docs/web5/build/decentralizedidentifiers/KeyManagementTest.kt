package website.tbd.developer.site.docs.web5.build.decentralizedidentifiers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*
// :snippet-start: importKeyManagementKt
import web5.sdk.crypto.AwsKeyManager
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.crypto.KeyManager
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.methods.dht.DidDhtApi
// :snippet-end:

internal class KeyManagementTest {
    @Test
    fun `initialize key management`() {
        // :snippet-start: initializeKeyManagementKt
        fun initKeyManagement(env: String?, didUri: String?, didDhtApi: DidDhtApi?): DidDht {
        // Determine which key manager to use based on the environment
        val keyManager: KeyManager = when(env) {
            "production" -> AwsKeyManager()
            else -> InMemoryKeyManager()
        }

        // Initialize or load a DID
        val did: DidDht = if (didUri == null) {
            // Create a new DID
            DidDht.create(keyManager)
        } else {
            // Load existing DID
            DidDht(uri = didUri, keyManager = keyManager, didDhtApi = didDhtApi)
        }
        return did
    }
        // :snippet-end:

        val testKeyManagement = initKeyManagement("production", "did:dht:abc123", null)
        assertNotNull(testKeyManagement, "Key manager should not be null")
    }
}