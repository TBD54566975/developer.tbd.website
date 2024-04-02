package website.tbd.developer.site.docs.web5.build.verifiablecredentials;

import java.io.ByteArrayOutputStream
import java.io.PrintStream

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

import web5.sdk.credentials.VerifiableCredential
import web5.sdk.credentials.PresentationExchange
import web5.sdk.credentials.model.*
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.credentials.VerifiablePresentation

/**
 * Tests backing the VC Fan Club Workflow
 */
internal class FanClubVcTest {
    data class SwiftiesFanClub(
        val level: String,
        val legit: Boolean
    )

    val fanClubIssuerDid = DidDht.create(InMemoryKeyManager())
    val aliceDid = DidDht.create(InMemoryKeyManager())
    
    val vc = VerifiableCredential.create(
        type = "SwiftiesFanClub",
        issuer = fanClubIssuerDid.uri,
        subject = aliceDid.uri,
        data = SwiftiesFanClub(level = "Stan", legit = true)
    )
    
    val signedVcJwt = vc.sign(fanClubIssuerDid)
   
    val presentationDefinition = PresentationDefinitionV2(
        id = "presDefId123",
        name = "Swifties Fan Club Presentation Definition",
        purpose = "for proving membership in the fan club",
        inputDescriptors = listOf(
            InputDescriptorV2(
                id = "legitness",
                purpose = "are you legit or not?",
                constraints = ConstraintsV2(
                    fields = listOf(
                        FieldV2(
                            path = listOf("$.vc.credentialSubject.legit")
                        )
                    )
                )
            )
        )
    )

  @Test
  fun `createDidsKt imports dids package and creates dids`() {
    // :snippet-start: createDidsKt
    val fanClubIssuerDid = DidDht.create(InMemoryKeyManager())
    val aliceDid = DidDht.create(InMemoryKeyManager())
    // :snippet-end:
    assertTrue(fanClubIssuerDid.uri.startsWith("did:dht:"), "fanClubIssuerDid should start with 'did:dht:'")
    assertTrue(aliceDid.uri.startsWith("did:dht:"), "aliceDid should start with 'did:dht:'")
  }

  @Test
  fun `createFanClubVcKt creates a vc for fan club`() {
    // :snippet-start: createFanClubVcKt
    val vc = VerifiableCredential.create(
        type = "SwiftiesFanClub",
        issuer = fanClubIssuerDid.uri,
        subject = aliceDid.uri,
        data = SwiftiesFanClub(level = "Stan", legit = true)
    )
    // :snippet-end:

    assertEquals("SwiftiesFanClub", vc.type)
    assertEquals("Stan", vc.vcDataModel.credentialSubject.claims["level"])
    assertEquals(true, vc.vcDataModel.credentialSubject.claims["legit"])  
  }

  @Test 
  fun `signFanClubVcKt signs a vc for fan club and returns jwt`() {
    // :snippet-start: signFanClubVcKt
    val signedVcJwt = vc.sign(fanClubIssuerDid)
    // :snippet-end:

    assertTrue(signedVcJwt is String, "signedVcJwt should be a String")
  }

  @Test
  fun `createAndValidatePresentationKt creates and validates presentation definitionl`() {
    // :snippet-start: createAndValidatePresentationKt
        val presentationDefinition = PresentationDefinitionV2(
            id = "presDefId123",
            name = "Swifties Fan Club Presentation Definition",
            purpose = "for proving membership in the fan club",
            inputDescriptors = listOf(
                InputDescriptorV2(
                    id = "legitness",
                    purpose = "are you legit or not?",
                    constraints = ConstraintsV2(
                        fields = listOf(
                            FieldV2(
                                path = listOf("$.vc.credentialSubject.legit")
                            )
                        )
                    )
                )
            )
        )
        try {
            PresentationExchange.validateDefinition(presentationDefinition)
        } catch (err: Exception) {
            println("Presentation Definition is not valid: " + err.message)
        }
        // :snippet-end:
        assertDoesNotThrow {PresentationExchange.validateDefinition(presentationDefinition)}
  }

  @Test 
  fun `satisfiesPresentationDefinitionFanClubVcKt checks if VC satisfies the presentation definition`() {
    val outContent = ByteArrayOutputStream()
    System.setOut(PrintStream(outContent))

    // :snippet-start: satisfiesPresentationDefinitionFanClubVcKt
    // Does VC Satisfy the Presentation Definition
    try {
        PresentationExchange.satisfiesPresentationDefinition(listOf(signedVcJwt), presentationDefinition)
    } catch (err: Exception) {
        println("VC does not satisfy Presentation Definition: " + err.message)
    }
    // :snippet-end:

    assertFalse(outContent.toString().contains("VC does not satisfy Presentation Definition:"))
    System.setOut(System.out)
  }

  @Test 
  fun `createPresentationFromCredentialsFanClubVcKt creates presentation from credentials and checks the presentation result`() {
    // :snippet-start: createPresentationFromCredentialsFanClubVcKt
    // Create Presentation Result that contains a Verifiable Presentation and Presentation Submission
    val presentationResult = PresentationExchange.createPresentationFromCredentials(listOf(signedVcJwt), presentationDefinition)
    
    val vp = VerifiablePresentation.create(
        vcJwts = listOf(signedVcJwt),
        holder = aliceDid.uri,
        additionalData = mapOf("presentation_submission" to presentationResult)
    )
    // :snippet-end:
   assertEquals("presDefId123", presentationResult.definitionId)
   assertEquals("VerifiablePresentation", vp.vpDataModel.type)  
  }

  @Test 
  fun `verifyFanClubVcKt checks if VC verification is successful`() {
    val outContent = ByteArrayOutputStream()
    System.setOut(PrintStream(outContent))

    // :snippet-start: verifyFanClubVcKt
    try {
        VerifiableCredential.verify(signedVcJwt)
    } catch (err: Exception) {
        println("VC Verification failed:" + err.message)
    }
    // :snippet-end:
    assertFalse(outContent.toString().contains("VC Verification failed:"))
    System.setOut(System.out)
  }

  @Test 
  fun `parseFanClubJwtKt parses the signed VC JWT`() {
    // :snippet-start: parseFanClubJwtKt
    val parsedVc = VerifiableCredential.parseJwt(signedVcJwt)
    // :snippet-end:
    assertEquals("Stan", parsedVc.vcDataModel.credentialSubject.claims["level"])
    assertEquals(true, parsedVc.vcDataModel.credentialSubject.claims["legit"])
  }
}