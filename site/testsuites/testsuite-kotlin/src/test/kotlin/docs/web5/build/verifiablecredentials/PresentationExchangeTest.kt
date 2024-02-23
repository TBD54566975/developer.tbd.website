package website.tbd.developer.site.docs.web5.build.verifiablecredentials;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.DidDht
import web5.sdk.credentials.VerifiableCredential
import web5.sdk.credentials.VerifiablePresentation
import web5.sdk.credentials.PresentationExchange

import web5.sdk.credentials.model.FieldV2
import web5.sdk.credentials.model.ConstraintsV2
import web5.sdk.credentials.model.PresentationDefinitionV2
import web5.sdk.credentials.model.InputDescriptorV2
import web5.sdk.credentials.model.PresentationSubmission
import com.fasterxml.jackson.databind.ObjectMapper

/**
 * Tests backing the Presentation Exchange Guide
 */
internal class PresentationExchangeTest {
    val issuerDid = DidDht.create(InMemoryKeyManager())
    val aliceDid = DidDht.create(InMemoryKeyManager())

    data class NameAndDobCredential(
        val name: String,
        val dateOfBirth: String
    )

    val nameAndDobVc = VerifiableCredential.create(
        type = "NameAndDobCredential",
        issuer = issuerDid.uri,
        subject = aliceDid.uri,
        data = NameAndDobCredential(name= "alice bob",dateOfBirth = "1990-10-01" )
    )

    val signedNameAndDobVcJwt = nameAndDobVc.sign(issuerDid)
    val signedEmploymentVcJwt = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDprZXk6ejZNa2VyNDlDbnVnN2hzdkhEZ3Y0NHl2cGR2dE1oNHlMaURYeFM2N2huclVodHQyI3o2TWtlcjQ5Q251Zzdoc3ZIRGd2NDR5dnBkdnRNaDR5TGlEWHhTNjdobnJVaHR0MiJ9.eyJpc3MiOiJkaWQ6a2V5Ono2TWtlcjQ5Q251Zzdoc3ZIRGd2NDR5dnBkdnRNaDR5TGlEWHhTNjdobnJVaHR0MiIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJFbXBsb3ltZW50Q3JlZGVudGlhbCJdLCJpZCI6InVybjp1dWlkOjcyNDhiOTkyLTkwOTYtNDk2NS1hMGVjLTc3ZDhhODNhMWRmYiIsImlzc3VlciI6ImRpZDprZXk6ejZNa2VyNDlDbnVnN2hzdkhEZ3Y0NHl2cGR2dE1oNHlMaURYeFM2N2huclVodHQyIiwiaXNzdWFuY2VEYXRlIjoiMjAyMy0xMi0yMVQyMDoxMToyNVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDppb246RWlEMTR4UmY0cTJNWlh1ZWY2X2ZXYnBGbVlTUG94dGFxTkp1SmdEMG96Wl84UTpleUprWld4MFlTSTZleUp3WVhSamFHVnpJanBiZXlKaFkzUnBiMjRpT2lKeVpYQnNZV05sSWl3aVpHOWpkVzFsYm5RaU9uc2ljSFZpYkdsalMyVjVjeUk2VzNzaWFXUWlPaUprZDI0dGMybG5JaXdpY0hWaWJHbGpTMlY1U25kcklqcDdJbU55ZGlJNklrVmtNalUxTVRraUxDSnJkSGtpT2lKUFMxQWlMQ0o0SWpvaWVubGFNbVYzTlhKeVVXdFVjbUV3WlZsVk16WlBTblJzTURCbFJWZHhhalZhV0dkNmNEZFpSVTVKUVNKOUxDSndkWEp3YjNObGN5STZXeUpoZFhSb1pXNTBhV05oZEdsdmJpSmRMQ0owZVhCbElqb2lTbk52YmxkbFlrdGxlVEl3TWpBaWZTeDdJbWxrSWpvaVpIZHVMV1Z1WXlJc0luQjFZbXhwWTB0bGVVcDNheUk2ZXlKamNuWWlPaUp6WldOd01qVTJhekVpTENKcmRIa2lPaUpGUXlJc0luZ2lPaUpQZDJZMFQyMUViamxKWm5SNFdYWnBkRTFHWm1jMVVXeDVMVVV6VWs1b1dsUkdPVlpFTWtnNVQzVjNJaXdpZVNJNkltUnZjVmxtV2s1c1NtRlRNVll4U201bU9HdEZObEF6VkRsd2QzaDNla3hFVTJWc1ZqTlRUa2s1U2xFaWZTd2ljSFZ5Y0c5elpYTWlPbHNpYTJWNVFXZHlaV1Z0Wlc1MElsMHNJblI1Y0dVaU9pSktjMjl1VjJWaVMyVjVNakF5TUNKOVhTd2ljMlZ5ZG1salpYTWlPbHQ3SW1sa0lqb2laSGR1SWl3aWMyVnlkbWxqWlVWdVpIQnZhVzUwSWpwN0ltVnVZM0o1Y0hScGIyNUxaWGx6SWpwYklpTmtkMjR0Wlc1aklsMHNJbTV2WkdWeklqcGJJbWgwZEhCek9pOHZaSGR1TG5SaVpHUmxkaTV2Y21jdlpIZHVOaUlzSW1oMGRIQnpPaTh2WkhkdUxuUmlaR1JsZGk1dmNtY3ZaSGR1TUNKZExDSnphV2R1YVc1blMyVjVjeUk2V3lJalpIZHVMWE5wWnlKZGZTd2lkSGx3WlNJNklrUmxZMlZ1ZEhKaGJHbDZaV1JYWldKT2IyUmxJbjFkZlgxZExDSjFjR1JoZEdWRGIyMXRhWFJ0Wlc1MElqb2lSV2xEWm05bVFUQkpVbU5uY2tWdVVHZHdRbU5RV1ZsV2VFWlliR0pTYjJRd2RVNWZRVkJwTkVrNUxVRmZRU0o5TENKemRXWm1hWGhFWVhSaElqcDdJbVJsYkhSaFNHRnphQ0k2SWtWcFFtd3pWWG80VldGT2REZGxlREJKYjJJMFJFNXNhbFJGVmpaelQwTmtjbFJ3TWxvNE5FTkJPVFJPUWtFaUxDSnlaV052ZG1WeWVVTnZiVzFwZEcxbGJuUWlPaUpGYVVOWk9WRldZbWRKYkUxemRraEZYMVJtTld4a1MxQjBkR3d3WVV4blNrdHNSbmt6Vms0d2QzQTJhVFpSSW4xOSIsImVtcGxveW1lbnRTdGF0dXMiOiJlbXBsb3llZCJ9fX0.Sazc8Ndhs-NKjxvtVMKeC9dxjEkI26fVsp2kFNWM-SYLtxMzKvl5ffeWd81ysHgPmBBSk2ar4dMqGgUsyM4gAQ"

   val allCredentials = listOf(signedEmploymentVcJwt, signedNameAndDobVcJwt)

    val presentationDefinition = PresentationDefinitionV2(
    id = "presDefIdloanAppVerification123",
    name = "Loan Application Employment Verification",
    purpose = "To verify applicant’s employment, date of birth, and name",
    inputDescriptors = listOf(
        InputDescriptorV2(
            id = "employmentVerification",
            purpose = "Confirm current employment status",
            constraints = ConstraintsV2(
                fields = listOf(FieldV2(
                    path = listOf("$.vc.credentialSubject.employmentStatus"),
                    filterJson = ObjectMapper().readTree(
                        """
                    {
                        "type": "string",
                        "pattern": "employed"
                    }
                    """
                    )
                ))
            )
        ),
        // Date of Birth Verification
        InputDescriptorV2(
            id = "dobVerification",
            purpose = "Confirm the applicant's date of birth",
            constraints = ConstraintsV2(
                fields = listOf(FieldV2(
                    path = listOf("$.vc.credentialSubject.dateOfBirth"),
                    filterJson = ObjectMapper().readTree(
                        """
                    {
                        "type": "string",
                        "format": "date"
                    }
                    """
                    )
                ))
            )
        ),
        // Name Verification
        InputDescriptorV2(
            id = "nameVerification",
            purpose = "Confirm the applicant’s legal name",
            constraints = ConstraintsV2(
                fields = listOf(FieldV2(
                    path = listOf("$.vc.credentialSubject.name"),
                    filterJson = ObjectMapper().readTree(
                        """
                    {
                        "type": "string"
                    }
                    """
                    )
                ))
            )
        )
    )
)

  @Test
  fun `getLoanAppPresentationDefinitionKt `() {
    // :snippet-start: getLoanAppPresentationDefinitionKt
    val presentationDefinition = PresentationDefinitionV2(
      id = "presDefIdloanAppVerification123",
      name = "Loan Application Employment Verification",
      purpose = "To verify applicant’s employment, date of birth, and name",
      inputDescriptors = listOf(
        InputDescriptorV2(
          id = "employmentVerification",
          purpose = "Confirm current employment status",
          constraints = ConstraintsV2(
            fields = listOf(FieldV2(
              path = listOf("$.vc.credentialSubject.employmentStatus"),
              filterJson = ObjectMapper().readTree(
                """
                    {
                        "type": "string",
                        "pattern": "employed"
                    }
                    """
              )
            ))
          )
        ),
        // Date of Birth Verification
        InputDescriptorV2(
          id = "dobVerification",
          purpose = "Confirm the applicant's date of birth",
          constraints = ConstraintsV2(
            fields = listOf(FieldV2(
              path = listOf("$.vc.credentialSubject.dateOfBirth"),
              filterJson = ObjectMapper().readTree(
                """
                    {
                        "type": "string",
                        "format": "date"
                    }
                    """
              )
            ))
          )
        ),
        // Name Verification
        InputDescriptorV2(
          id = "nameVerification",
          purpose = "Confirm the applicant’s legal name",
          constraints = ConstraintsV2(
            fields = listOf(FieldV2(
              path = listOf("$.vc.credentialSubject.name"),
              filterJson = ObjectMapper().readTree(
                """
                    {
                        "type": "string"
                    }
                    """
              )
            ))
          )
        )
      )
    )
    // :snippet-end:

    assertEquals("presDefIdloanAppVerification123", presentationDefinition.id)
    assertEquals("Loan Application Employment Verification", presentationDefinition.name)
    assertEquals("To verify applicant’s employment, date of birth, and name", presentationDefinition.purpose)
    assertEquals(3, presentationDefinition.inputDescriptors.size)
  }

  @Test
  fun `selectCredentialsForPexKt selects VCs that match presentation defintion`() {
    // :snippet-start: selectCredentialsForPexKt
    val selectedCredentials = PresentationExchange.selectCredentials(
        vcJwts = allCredentials,
        presentationDefinition = presentationDefinition
    )
    // :snippet-end:
    assertNotNull(selectedCredentials, "Selected credentials should not be null")
    assertTrue(selectedCredentials is List<*>, "Selected credentials should be a list")
    assertEquals(2, selectedCredentials.size, "Selected credentials should contain 2 items")
    assertTrue(signedEmploymentVcJwt in selectedCredentials, "Selected credentials should contain the employment VC JWT")
    assertTrue(signedNameAndDobVcJwt in selectedCredentials, "Selected credentials should contain the name and DOB VC JWT")
  }

  @Test
  fun `satisfiesPresentationDefinitionForPexKt checks if VCs satisfy PD`() {
    val selectedCredentials = allCredentials
    assertDoesNotThrow {
    // :snippet-start: satisfiesPresentationDefinitionForPexKt
    try {
        PresentationExchange.satisfiesPresentationDefinition(
            vcJwts = selectedCredentials,
            presentationDefinition = presentationDefinition
        )
    } catch (e: Exception) {
        // Handle errors here
    }
    // :snippet-end:
    }
  }

    @Test
    fun `createPresentationForPexKt creates a presentation result, a valid VP, and validates submission`() {
        val holderDid = DidDht.create(InMemoryKeyManager())
        val selectedCredentials = allCredentials
        // :snippet-start: createPresentationFromCredentialsForPexKt
        val presentationResult = PresentationExchange.createPresentationFromCredentials(
            vcJwts = selectedCredentials,
            presentationDefinition = presentationDefinition
        )

        val verifiablePresentation = VerifiablePresentation.create(
            vcJwts = selectedCredentials,
            holder = holderDid.uri,
            additionalData = mapOf("presentation_submission" to presentationResult)
        )
        // :snippet-end:
        assertDoesNotThrow {
            // :snippet-start: validatePresentationSubmissionForPexKt
            val vpDataMap = verifiablePresentation.vpDataModel.toMap()
            val presentationSubmission = vpDataMap["presentation_submission"] as PresentationSubmission

            try {
                PresentationExchange.validateSubmission(presentationSubmission)
            } catch (e: Exception) {
                println("Invalid Presentation Submission: ${e.message}")
            }
        // :snippet-end:
        }

        // :snippet-start: signVpForPexKt
        val vpJwt = verifiablePresentation.sign(holderDid)
        // :snippet-end:

        assertNotNull(verifiablePresentation, "Verifiable Presentation should not be null")
        assertEquals(holderDid.uri, verifiablePresentation.holder, "Holder DID should match")
        assertNotNull(vpJwt, "Verifiable Presentation JWT should not be null")
        assertTrue(vpJwt is String, "Verifiable Presentation JWT should be a string")
    }
}


