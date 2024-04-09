package website.tbd.developer.site.docs.web5.build.decentralizedidentifiers;

import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
// :snippet-start: importKeyManagementKt
import web5.sdk.dids.didcore.DidDocument
import web5.sdk.crypto.AwsKeyManager
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.did.BearerDid
import web5.sdk.dids.did.PortableDid
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.dids.methods.dht.DidDhtApi
// :snippet-end:

class KeyManagementTest {

    @Test
    fun `initialize key management`() {
        // :snippet-start: initializeKeyManagementKt
        fun initKeyManagement(
            env: String,
            portableDid: PortableDid? = null
        ): BearerDid {
            val keyManager = when (env) {
                "production" -> AwsKeyManager()
                else -> InMemoryKeyManager()
            }

          // Load existing DID
          portableDid?.let {
            return DidDht.import(
              portableDid = it,
              keyManager = keyManager
            )
          }

          // Otherwise create new Did
          return DidDht.create(keyManager)
        }
        // :snippet-end:
        val returnedDid = initKeyManagement("dev")
        assertTrue(returnedDid.keyManager is InMemoryKeyManager,
            "DID should have been created with InMemoryKeyManager")
    }
}
