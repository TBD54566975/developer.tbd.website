
package website.tbd.developer.site.docs.web5.build.verifiablecredentials;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

import web5.sdk.credentials.VerifiableCredential
import web5.sdk.credentials.model.*
import web5.sdk.credentials.VerifiablePresentation
import web5.sdk.credentials.PresentationExchange
import web5.sdk.credentials.StatusListCredential
import web5.sdk.credentials.*
import java.net.URI
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.key.DidKey

/**
 * Tests backing the Revoke VC Guide
 */

data class StreetCredibility(val localRespect: String, val legit: Boolean)

internal class RevokeVcTest {

  @Test
  fun `create empty statusListCredential`() {
    val keyManager = InMemoryKeyManager()
    val issuerDid = DidKey.create(keyManager)
    
    // :snippet-start: createStatusListCredentialKt
    val statusListCredential = StatusListCredential.create(
      "revocation-id",
      issuerDid.uri,
      StatusPurpose.REVOCATION,
      listOf()
    )
    // :snippet-end:

    assertNotNull(statusListCredential)
    assertTrue(
      statusListCredential.vcDataModel.types.containsAll(
        listOf(
          "VerifiableCredential",
          "StatusList2021Credential"
        )
      )
    )
  }

  @Test
  fun `create and revoke credential with credentialStatus`() {
    val keyManager = InMemoryKeyManager()
    val issuerDid = DidKey.create(keyManager)
    val holderDid = DidKey.create(keyManager)

    // :snippet-start: createRevocableVerifiableCredentialKt

    val credentialStatus = StatusList2021Entry.builder()
      .id(URI.create("cred-with-status-id"))
      .statusPurpose("revocation")
      .statusListIndex("123")
      .statusListCredential(URI.create("https://example.com/credentials/status/3"))
      .build()

    val credWithCredStatus = VerifiableCredential.create(
      type = "StreetCred",
      issuer = issuerDid.uri,
      subject = holderDid.uri,
      data = StreetCredibility(localRespect = "high", legit = true),
      credentialStatus = credentialStatus
    )

    // :snippet-end:

    // :snippet-start: revokeCredentialKt
    val statusListCredential = StatusListCredential.create(
      "revocation-id",
      issuerDid.uri,
      StatusPurpose.REVOCATION,
      listOf(credWithCredStatus)
    )

    // :snippet-end:

    // :snippet-start: checkIfCredentialIsRevokedKt
    val isRevoked = StatusListCredential.validateCredentialInStatusList(credWithCredStatus, statusListCredential)
    // :snippet-end:


    assertNotNull(credWithCredStatus)
    assertTrue(
      credWithCredStatus.vcDataModel.contexts.containsAll(
        listOf(
          URI.create("https://www.w3.org/2018/credentials/v1"),
          URI.create("https://w3id.org/vc/status-list/2021/v1")
        )
      )
    )

    assertNotNull(statusListCredential)
    assertTrue(
      statusListCredential.vcDataModel.types.containsAll(
        listOf(
          "VerifiableCredential",
          "StatusList2021Credential"
        )
      )
    )
    assertTrue(isRevoked)
  }

}
