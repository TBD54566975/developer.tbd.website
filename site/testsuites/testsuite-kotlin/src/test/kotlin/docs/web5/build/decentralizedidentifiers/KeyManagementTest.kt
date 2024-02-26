package website.tbd.developer.site.docs.web5.build.decentralizedidentifiers;

import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
// :snippet-start: importKeyManagementKt
import foundation.identity.did.DIDDocument
import web5.sdk.crypto.AwsKeyManager
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.Did
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.methods.dht.DidDhtApi
// :snippet-end:

class KeyManagementTest {
    
    @Test
    fun `initialize key management`() {
        // :snippet-start: initializeKeyManagementKt
        fun initKeyManagement(
            env: String,
            didUri: String? = null,
            didDocument: DIDDocument? = null,
            didDhtApi: DidDhtApi? = null
        ): Did {
            val keyManager = when (env) {
                "production" -> AwsKeyManager()
                else -> InMemoryKeyManager()
            }

            // Create new DID
            if (didUri == null) {
                return DidDht.create(keyManager)
            }

            // For loading an existing DID, didDhtApi must be provided
            if (didDhtApi == null) {
                throw IllegalArgumentException(
                    "didDhtApi must be provided when loading an existing DID.")
            }

            // Load existing DID
            return DidDht(
                uri = didUri,
                keyManager = keyManager,
                didDocument = didDocument,
                didDhtApi = didDhtApi
            )
        }
        // :snippet-end:
        val returnedDid = initKeyManagement("dev")
        assertTrue(returnedDid.keyManager is InMemoryKeyManager,
            "DID should have been created with InMemoryKeyManager")
    }
}