
package website.tbd.developer.site.docs.web5.build.verifiablecredentials;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

import web5.sdk.credentials.VerifiableCredential
import web5.sdk.credentials.model.*
import web5.sdk.credentials.VerifiablePresentation
import web5.sdk.credentials.PresentationExchange
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.jwk.DidJwk

/**
 * Tests backing the Verify VC Guide
 */

 data class VerifiablePresentation(
    val context: List<String>,
    val type: List<String>,
    val id: String,
    val presentation_submission: PresentationSubmission,
    val verifiableCredential: List<String>,
    val holder: String
)

data class PresentationSubmission(
    val id: String,
    val definitionId: String,
    val descriptorMap: List<DescriptorMapItem>
)

data class DescriptorMapItem(
    val id: String,
    val format: String,
    val path: String
)

data class VerificationResult(
    val jwt: String,
    val result: Any?,
    val isValid: Boolean,
    val error: String?
)

val holderDid = DidJwk.create(InMemoryKeyManager())

val presentationDefinition = PresentationDefinitionV2(
    id = "presDefIdloanAppVerification123",
    name = "Loan Application Employment Verification",
    purpose = "To verify applicant’s employment, date of birth, and name",
    inputDescriptors = listOf(
        InputDescriptorV2(
            id = "employmentVerification",
            purpose = "Confirm current employment status",
            constraints = ConstraintsV2(
                fields = listOf(FieldV2(path = listOf("$.vc.credentialSubject.employmentStatus")))
            )
        ),
        InputDescriptorV2(
            id = "dobVerification",
            purpose = "Confirm the applicant’s date of birth",
            constraints = ConstraintsV2(
                fields = listOf(FieldV2(path = listOf("$.vc.credentialSubject.dateOfBirth")))
            )
        ),
        InputDescriptorV2(
            id = "nameVerification",
            purpose = "Confirm the applicant’s legal name",
            constraints = ConstraintsV2(
                fields = listOf(FieldV2(path = listOf("$.vc.credentialSubject.name")))
            )
        )
    )
)

val vcJwt1 = "eyJraWQiOiJkaWQ6andrOmV5SnJkSGtpT2lKRlF5SXNJblZ6WlNJNkluTnBaeUlzSW1OeWRpSTZJbk5sWTNBeU5UWnJNU0lzSW10cFpDSTZJbmQ1YzBvek0ycDNYMU52TjFVeGEyRXRNazVOWDJsSlZEWlRaVlpQYkVWSVdISlJOMWROZVRGSmRXc2lMQ0o0SWpvaU1sOUJkM0pYY0ZKRGFIVndWa3RFUlU0elFVOWpNbmhVY0MwNGNWQnBSbkJCUWxKUlRFTlpjSFZ6T0NJc0lua2lPaUpwYzBabVpWa3dZVlJSVm5ka1ozSlFWMjFoVVhSd2EwaHdURFZtT1ZCT2JWSTFhVEJvUWtVMldEVlZJaXdpWVd4bklqb2lSVk15TlRaTEluMCMwIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTZLIn0.eyJpc3MiOiJkaWQ6andrOmV5SnJkSGtpT2lKRlF5SXNJblZ6WlNJNkluTnBaeUlzSW1OeWRpSTZJbk5sWTNBeU5UWnJNU0lzSW10cFpDSTZJbmQ1YzBvek0ycDNYMU52TjFVeGEyRXRNazVOWDJsSlZEWlRaVlpQYkVWSVdISlJOMWROZVRGSmRXc2lMQ0o0SWpvaU1sOUJkM0pYY0ZKRGFIVndWa3RFUlU0elFVOWpNbmhVY0MwNGNWQnBSbkJCUWxKUlRFTlpjSFZ6T0NJc0lua2lPaUpwYzBabVpWa3dZVlJSVm5ka1ozSlFWMjFoVVhSd2EwaHdURFZtT1ZCT2JWSTFhVEJvUWtVMldEVlZJaXdpWVd4bklqb2lSVk15TlRaTEluMCIsInN1YiI6ImRpZDpqd2s6ZXlKcmRIa2lPaUpGUXlJc0luVnpaU0k2SW5OcFp5SXNJbU55ZGlJNkluTmxZM0F5TlRack1TSXNJbXRwWkNJNklraGhNRVpuWmxwS2J6UXlXVlJNYWpKbFJUaFJORFE0VlhkT1UybzFPR1JrV1dKR01HVkJURTlIZHpBaUxDSjRJam9pVmpoR2REUklaR3hJYzFoeVJVOWpabGx2TkV0a2MzbFZWVEp4YVRGTGRUTTBNV3RZTVdSaGVVRlRVU0lzSW5raU9pSXdiR0p2YUV0SlRsVkRaVmR2UzJwUFN6RXlXVEJFT0Mxc2JHczVVSHBzYkVzd1ZuTjZUVTVPWkhGVklpd2lZV3huSWpvaVJWTXlOVFpMSW4wIiwiaWF0IjoxNzEwNDEwMjM1LCJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiTmFtZUFuZERvYkNyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDoxOWNhMTljNS04Y2ZiLTQxNjAtYTVmOC1iYzgzYWE5NTFkMGMiLCJpc3N1ZXIiOiJkaWQ6andrOmV5SnJkSGtpT2lKRlF5SXNJblZ6WlNJNkluTnBaeUlzSW1OeWRpSTZJbk5sWTNBeU5UWnJNU0lzSW10cFpDSTZJbmQ1YzBvek0ycDNYMU52TjFVeGEyRXRNazVOWDJsSlZEWlRaVlpQYkVWSVdISlJOMWROZVRGSmRXc2lMQ0o0SWpvaU1sOUJkM0pYY0ZKRGFIVndWa3RFUlU0elFVOWpNbmhVY0MwNGNWQnBSbkJCUWxKUlRFTlpjSFZ6T0NJc0lua2lPaUpwYzBabVpWa3dZVlJSVm5ka1ozSlFWMjFoVVhSd2EwaHdURFZtT1ZCT2JWSTFhVEJvUWtVMldEVlZJaXdpWVd4bklqb2lSVk15TlRaTEluMCIsImlzc3VhbmNlRGF0ZSI6IjIwMjQtMDMtMTRUMDk6NTc6MTVaIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6andrOmV5SnJkSGtpT2lKRlF5SXNJblZ6WlNJNkluTnBaeUlzSW1OeWRpSTZJbk5sWTNBeU5UWnJNU0lzSW10cFpDSTZJa2hoTUVablpscEtielF5V1ZSTWFqSmxSVGhSTkRRNFZYZE9VMm8xT0dSa1dXSkdNR1ZCVEU5SGR6QWlMQ0o0SWpvaVZqaEdkRFJJWkd4SWMxaHlSVTlqWmxsdk5FdGtjM2xWVlRKeGFURkxkVE0wTVd0WU1XUmhlVUZUVVNJc0lua2lPaUl3YkdKdmFFdEpUbFZEWlZkdlMycFBTekV5V1RCRU9DMXNiR3M1VUhwc2JFc3dWbk42VFU1T1pIRlZJaXdpWVd4bklqb2lSVk15TlRaTEluMCIsIm5hbWUiOiJhbGljZSBib2IiLCJkYXRlT2ZCaXJ0aCI6IjE5OTAtMTAtMDEifX19.XtBLBzXO_KdrUGzgSKiU7P_eaKVlybR_PG48D7AlbiJUevtYxWi1ieCCFNJx5ijtZM9E6Mmolhjsj557nLdP2g"
val vcJwt2= "eyJraWQiOiJkaWQ6andrOmV5SnJkSGtpT2lKRlF5SXNJblZ6WlNJNkluTnBaeUlzSW1OeWRpSTZJbk5sWTNBeU5UWnJNU0lzSW10cFpDSTZJbmQ1YzBvek0ycDNYMU52TjFVeGEyRXRNazVOWDJsSlZEWlRaVlpQYkVWSVdISlJOMWROZVRGSmRXc2lMQ0o0SWpvaU1sOUJkM0pYY0ZKRGFIVndWa3RFUlU0elFVOWpNbmhVY0MwNGNWQnBSbkJCUWxKUlRFTlpjSFZ6T0NJc0lua2lPaUpwYzBabVpWa3dZVlJSVm5ka1ozSlFWMjFoVVhSd2EwaHdURFZtT1ZCT2JWSTFhVEJvUWtVMldEVlZJaXdpWVd4bklqb2lSVk15TlRaTEluMCMwIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTZLIn0.eyJpc3MiOiJkaWQ6andrOmV5SnJkSGtpT2lKRlF5SXNJblZ6WlNJNkluTnBaeUlzSW1OeWRpSTZJbk5sWTNBeU5UWnJNU0lzSW10cFpDSTZJbmQ1YzBvek0ycDNYMU52TjFVeGEyRXRNazVOWDJsSlZEWlRaVlpQYkVWSVdISlJOMWROZVRGSmRXc2lMQ0o0SWpvaU1sOUJkM0pYY0ZKRGFIVndWa3RFUlU0elFVOWpNbmhVY0MwNGNWQnBSbkJCUWxKUlRFTlpjSFZ6T0NJc0lua2lPaUpwYzBabVpWa3dZVlJSVm5ka1ozSlFWMjFoVVhSd2EwaHdURFZtT1ZCT2JWSTFhVEJvUWtVMldEVlZJaXdpWVd4bklqb2lSVk15TlRaTEluMCIsInN1YiI6ImRpZDpqd2s6ZXlKcmRIa2lPaUpGUXlJc0luVnpaU0k2SW5OcFp5SXNJbU55ZGlJNkluTmxZM0F5TlRack1TSXNJbXRwWkNJNklraGhNRVpuWmxwS2J6UXlXVlJNYWpKbFJUaFJORFE0VlhkT1UybzFPR1JrV1dKR01HVkJURTlIZHpBaUxDSjRJam9pVmpoR2REUklaR3hJYzFoeVJVOWpabGx2TkV0a2MzbFZWVEp4YVRGTGRUTTBNV3RZTVdSaGVVRlRVU0lzSW5raU9pSXdiR0p2YUV0SlRsVkRaVmR2UzJwUFN6RXlXVEJFT0Mxc2JHczVVSHBzYkVzd1ZuTjZUVTVPWkhGVklpd2lZV3huSWpvaVJWTXlOVFpMSW4wIiwiaWF0IjoxNzEwNDEwMjM1LCJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1wbG95bWVudENyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDphMmQ0MGY2Zi04ZjViLTQyNzctOTdlNi1kYWViNDJhZWI0NGMiLCJpc3N1ZXIiOiJkaWQ6andrOmV5SnJkSGtpT2lKRlF5SXNJblZ6WlNJNkluTnBaeUlzSW1OeWRpSTZJbk5sWTNBeU5UWnJNU0lzSW10cFpDSTZJbmQ1YzBvek0ycDNYMU52TjFVeGEyRXRNazVOWDJsSlZEWlRaVlpQYkVWSVdISlJOMWROZVRGSmRXc2lMQ0o0SWpvaU1sOUJkM0pYY0ZKRGFIVndWa3RFUlU0elFVOWpNbmhVY0MwNGNWQnBSbkJCUWxKUlRFTlpjSFZ6T0NJc0lua2lPaUpwYzBabVpWa3dZVlJSVm5ka1ozSlFWMjFoVVhSd2EwaHdURFZtT1ZCT2JWSTFhVEJvUWtVMldEVlZJaXdpWVd4bklqb2lSVk15TlRaTEluMCIsImlzc3VhbmNlRGF0ZSI6IjIwMjQtMDMtMTRUMDk6NTc6MTVaIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6andrOmV5SnJkSGtpT2lKRlF5SXNJblZ6WlNJNkluTnBaeUlzSW1OeWRpSTZJbk5sWTNBeU5UWnJNU0lzSW10cFpDSTZJa2hoTUVablpscEtielF5V1ZSTWFqSmxSVGhSTkRRNFZYZE9VMm8xT0dSa1dXSkdNR1ZCVEU5SGR6QWlMQ0o0SWpvaVZqaEdkRFJJWkd4SWMxaHlSVTlqWmxsdk5FdGtjM2xWVlRKeGFURkxkVE0wTVd0WU1XUmhlVUZUVVNJc0lua2lPaUl3YkdKdmFFdEpUbFZEWlZkdlMycFBTekV5V1RCRU9DMXNiR3M1VUhwc2JFc3dWbk42VFU1T1pIRlZJaXdpWVd4bklqb2lSVk15TlRaTEluMCIsImVtcGxveW1lbnRTdGF0dXMiOiJlbXBsb3llZCJ9fX0.7gtzMXgIE-pAgdlDhUWANdh9p-LCrB-wZ5w-urNQnK8t4hmXQAkBMVM33aOgtpHqrQgNSf1dBvvBPLTD9kmkWQ"

val presentationResult = PresentationExchange.createPresentationFromCredentials(
    vcJwts= listOf(vcJwt1, vcJwt2),
    presentationDefinition= presentationDefinition
)

val verifiablePresentation = VerifiablePresentation.create(
    vcJwts = listOf(vcJwt1, vcJwt2),
    holder = holderDid.uri,
    additionalData = mapOf("presentation_submission" to presentationResult)
)


internal class VerifyVcTest {

  @Test
  fun `verifyVcforVerifyVcsKt verifies a verifiable credential `() {
    // :snippet-start: verifyVcsKt
    val vpDataMap = verifiablePresentation.vpDataModel.toMap()
    //highlight-start
    val vcJwtArray = vpDataMap["verifiableCredential"] as? List<String> ?: emptyList()
    // highlight-end

    val verificationResults = mutableListOf<VerificationResult>()
    var errorsFound = false

    vcJwtArray.forEach { vcJwt ->
        try {
            //highlight-start
            val verificationResult = VerifiableCredential.verify(vcJwt)
            //highlight-end
            verificationResults.add(VerificationResult(vcJwt, verificationResult, true, null))
        } catch (e: Exception) {
            errorsFound = true
            verificationResults.add(VerificationResult(vcJwt, null, false, e.message))
        }
    }
    // :snippet-end:

    // :snippet-start: errorsFoundKt
    if (errorsFound) {
        verificationResults.forEach { result ->
            if (!result.isValid) {
                println("Error: ${result.error} for JWT ${result.jwt}")
            }
        }
    } else {
         //no errors are found. continue processing
    }
    // :snippet-end:
    verificationResults.forEach { result ->
        assertNotNull(result.result, "Verification result should not be null")
        assertTrue(result.isValid, "Verification result should be valid")
        assertNull(result.error, "Verification result error should be null")
    }
  }

   @Test
  fun `verifyVpKt signs and verifies a verifiable presenation `() {
    val vpJwt = verifiablePresentation.sign(holderDid)

    assertDoesNotThrow {
        // :snippet-start: verifyVpKt
        try {
            VerifiablePresentation.verify(vpJwt)
        } catch (e: Exception) {
            println("VP Verification failed: ${e.message}")
        }
        // :snippet-end:
    }
  }
}