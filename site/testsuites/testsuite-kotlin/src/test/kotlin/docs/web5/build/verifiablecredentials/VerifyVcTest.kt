
package website.tbd.developer.site.docs.web5.build.verifiablecredentials;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

import web5.sdk.credentials.VerifiableCredential
import web5.sdk.credentials.model.*
import web5.sdk.credentials.VerifiablePresentation
import web5.sdk.credentials.PresentationExchange
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.key.DidKey

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

val holderDid = DidKey.create(InMemoryKeyManager())

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

val vcJwt1 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDppb246RWlBbVBHbmJzZVUtOW9mcWR4MGVaQjI1QTE1V3Bfam5LWDVoQmZDd2VPajUwUTpleUprWld4MFlTSTZleUp3WVhSamFHVnpJanBiZXlKaFkzUnBiMjRpT2lKeVpYQnNZV05sSWl3aVpHOWpkVzFsYm5RaU9uc2ljSFZpYkdsalMyVjVjeUk2VzNzaWFXUWlPaUprZDI0dGMybG5JaXdpY0hWaWJHbGpTMlY1U25kcklqcDdJbU55ZGlJNklrVmtNalUxTVRraUxDSnJkSGtpT2lKUFMxQWlMQ0o0SWpvaVdTMXBNMDVOYVZOYVdsWkdRVzF4V25reGNtMTZjMGRFVmpWSVJUbFpkVWx2WkZSSGRscFdiall4WnlKOUxDSndkWEp3YjNObGN5STZXeUpoZFhSb1pXNTBhV05oZEdsdmJpSXNJbUZ6YzJWeWRHbHZiazFsZEdodlpDSmRMQ0owZVhCbElqb2lTbk52YmxkbFlrdGxlVEl3TWpBaWZWMHNJbk5sY25acFkyVnpJanBiWFgxOVhTd2lkWEJrWVhSbFEyOXRiV2wwYldWdWRDSTZJa1ZwUTJveWRsUlFZMGRmZVZWdFNXVmtkMGRPWHpKeWNtTm9RVk5ZWW1SSWJYQTRMV0l4ZVV4cFdHSkVSR2NpZlN3aWMzVm1abWw0UkdGMFlTSTZleUprWld4MFlVaGhjMmdpT2lKRmFVTlRVREZ0WHpWUU1uaE1TVVZxU2toalRHNTVObkZZTkcxT2QyeFhaR2QxVTJrMFNYRk5TWE16V2taQklpd2ljbVZqYjNabGNubERiMjF0YVhSdFpXNTBJam9pUldsRFVuWjNSV3BTVVRKd04xcHhibmhhVTA1bloyOVJiVTVIZDFoVWFUTlhYMDV0VWpJMlZUQm5XVmhVZHlKOWZRI2R3bi1zaWcifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1wbG95bWVudENyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDpiOGI4OTM1NS01MTZjLTQ3YWYtYjdmMy1lNzBhOTFkZjhlMGEiLCJpc3N1ZXIiOiJkaWQ6aW9uOkVpQW1QR25ic2VVLTlvZnFkeDBlWkIyNUExNVdwX2puS1g1aEJmQ3dlT2o1MFE6ZXlKa1pXeDBZU0k2ZXlKd1lYUmphR1Z6SWpwYmV5SmhZM1JwYjI0aU9pSnlaWEJzWVdObElpd2laRzlqZFcxbGJuUWlPbnNpY0hWaWJHbGpTMlY1Y3lJNlczc2lhV1FpT2lKa2QyNHRjMmxuSWl3aWNIVmliR2xqUzJWNVNuZHJJanA3SW1OeWRpSTZJa1ZrTWpVMU1Ua2lMQ0pyZEhraU9pSlBTMUFpTENKNElqb2lXUzFwTTA1TmFWTmFXbFpHUVcxeFdua3hjbTE2YzBkRVZqVklSVGxaZFVsdlpGUkhkbHBXYmpZeFp5SjlMQ0p3ZFhKd2IzTmxjeUk2V3lKaGRYUm9aVzUwYVdOaGRHbHZiaUlzSW1GemMyVnlkR2x2YmsxbGRHaHZaQ0pkTENKMGVYQmxJam9pU25OdmJsZGxZa3RsZVRJd01qQWlmVjBzSW5ObGNuWnBZMlZ6SWpwYlhYMTlYU3dpZFhCa1lYUmxRMjl0YldsMGJXVnVkQ0k2SWtWcFEyb3lkbFJRWTBkZmVWVnRTV1ZrZDBkT1h6SnljbU5vUVZOWVltUkliWEE0TFdJeGVVeHBXR0pFUkdjaWZTd2ljM1ZtWm1sNFJHRjBZU0k2ZXlKa1pXeDBZVWhoYzJnaU9pSkZhVU5UVURGdFh6VlFNbmhNU1VWcVNraGpURzU1Tm5GWU5HMU9kMnhYWkdkMVUyazBTWEZOU1hNeldrWkJJaXdpY21WamIzWmxjbmxEYjIxdGFYUnRaVzUwSWpvaVJXbERVblozUldwU1VUSndOMXB4Ym5oYVUwNW5aMjlSYlU1SGQxaFVhVE5YWDA1dFVqSTJWVEJuV1ZoVWR5SjlmUSIsImlzc3VhbmNlRGF0ZSI6IjIwMjMtMTItMjdUMTg6MTI6MzlaIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6aW9uOkVpQllCbnQwbTB5NzNWMDdVOS1yZEt0VS1GZ2ViUlVoVVQ0VUxBc0pCZ3p2U2c6ZXlKa1pXeDBZU0k2ZXlKd1lYUmphR1Z6SWpwYmV5SmhZM1JwYjI0aU9pSnlaWEJzWVdObElpd2laRzlqZFcxbGJuUWlPbnNpY0hWaWJHbGpTMlY1Y3lJNlczc2lhV1FpT2lKa2QyNHRjMmxuSWl3aWNIVmliR2xqUzJWNVNuZHJJanA3SW1OeWRpSTZJa1ZrTWpVMU1Ua2lMQ0pyZEhraU9pSlBTMUFpTENKNElqb2lVVVJHUVhSSldUTnlVWEZCWkZSYWVrOUxPVTVhWm5jeVlsWlhNMnBKVUdkdFZXTjZiWFpwVVdFeGR5SjlMQ0p3ZFhKd2IzTmxjeUk2V3lKaGRYUm9aVzUwYVdOaGRHbHZiaUlzSW1GemMyVnlkR2x2YmsxbGRHaHZaQ0pkTENKMGVYQmxJam9pU25OdmJsZGxZa3RsZVRJd01qQWlmVjBzSW5ObGNuWnBZMlZ6SWpwYlhYMTlYU3dpZFhCa1lYUmxRMjl0YldsMGJXVnVkQ0k2SWtWcFFYTkNRbmt0V0hweVoyNUtiR2RWV25JeWRtaFpkbFJoZVc5eGJETXdTa3h4YlUxQ1kyWkNkbEZrY21jaWZTd2ljM1ZtWm1sNFJHRjBZU0k2ZXlKa1pXeDBZVWhoYzJnaU9pSkZhVU5qVEhwbVpWQkRMV3RCV1hNeVoyNWtYMDVEZVVjM1UwWlBWM2RpZEdWdFdYVjNUa2xYY0RjelNVaEJJaXdpY21WamIzWmxjbmxEYjIxdGFYUnRaVzUwSWpvaVJXbEJUMTh3Tm1OcGFTMVlRVmcyU1dadmNuUnFRVzAxU1ZaRWMyZENSMko0TjBaRlIzcGlXR0ZwUXpKNlVTSjlmUSIsImVtcGxveW1lbnRTdGF0dXMiOiJlbXBsb3llZCJ9fSwiaXNzIjoiZGlkOmlvbjpFaUFtUEduYnNlVS05b2ZxZHgwZVpCMjVBMTVXcF9qbktYNWhCZkN3ZU9qNTBROmV5SmtaV3gwWVNJNmV5SndZWFJqYUdWeklqcGJleUpoWTNScGIyNGlPaUp5WlhCc1lXTmxJaXdpWkc5amRXMWxiblFpT25zaWNIVmliR2xqUzJWNWN5STZXM3NpYVdRaU9pSmtkMjR0YzJsbklpd2ljSFZpYkdsalMyVjVTbmRySWpwN0ltTnlkaUk2SWtWa01qVTFNVGtpTENKcmRIa2lPaUpQUzFBaUxDSjRJam9pV1MxcE0wNU5hVk5hV2xaR1FXMXhXbmt4Y20xNmMwZEVWalZJUlRsWmRVbHZaRlJIZGxwV2JqWXhaeUo5TENKd2RYSndiM05sY3lJNld5SmhkWFJvWlc1MGFXTmhkR2x2YmlJc0ltRnpjMlZ5ZEdsdmJrMWxkR2h2WkNKZExDSjBlWEJsSWpvaVNuTnZibGRsWWt0bGVUSXdNakFpZlYwc0luTmxjblpwWTJWeklqcGJYWDE5WFN3aWRYQmtZWFJsUTI5dGJXbDBiV1Z1ZENJNklrVnBRMm95ZGxSUVkwZGZlVlZ0U1dWa2QwZE9Yekp5Y21Ob1FWTllZbVJJYlhBNExXSXhlVXhwV0dKRVJHY2lmU3dpYzNWbVptbDRSR0YwWVNJNmV5SmtaV3gwWVVoaGMyZ2lPaUpGYVVOVFVERnRYelZRTW5oTVNVVnFTa2hqVEc1NU5uRllORzFPZDJ4WFpHZDFVMmswU1hGTlNYTXpXa1pCSWl3aWNtVmpiM1psY25sRGIyMXRhWFJ0Wlc1MElqb2lSV2xEVW5aM1JXcFNVVEp3TjFweGJuaGFVMDVuWjI5UmJVNUhkMWhVYVROWFgwNXRVakkyVlRCbldWaFVkeUo5ZlEiLCJzdWIiOiJkaWQ6aW9uOkVpQllCbnQwbTB5NzNWMDdVOS1yZEt0VS1GZ2ViUlVoVVQ0VUxBc0pCZ3p2U2c6ZXlKa1pXeDBZU0k2ZXlKd1lYUmphR1Z6SWpwYmV5SmhZM1JwYjI0aU9pSnlaWEJzWVdObElpd2laRzlqZFcxbGJuUWlPbnNpY0hWaWJHbGpTMlY1Y3lJNlczc2lhV1FpT2lKa2QyNHRjMmxuSWl3aWNIVmliR2xqUzJWNVNuZHJJanA3SW1OeWRpSTZJa1ZrTWpVMU1Ua2lMQ0pyZEhraU9pSlBTMUFpTENKNElqb2lVVVJHUVhSSldUTnlVWEZCWkZSYWVrOUxPVTVhWm5jeVlsWlhNMnBKVUdkdFZXTjZiWFpwVVdFeGR5SjlMQ0p3ZFhKd2IzTmxjeUk2V3lKaGRYUm9aVzUwYVdOaGRHbHZiaUlzSW1GemMyVnlkR2x2YmsxbGRHaHZaQ0pkTENKMGVYQmxJam9pU25OdmJsZGxZa3RsZVRJd01qQWlmVjBzSW5ObGNuWnBZMlZ6SWpwYlhYMTlYU3dpZFhCa1lYUmxRMjl0YldsMGJXVnVkQ0k2SWtWcFFYTkNRbmt0V0hweVoyNUtiR2RWV25JeWRtaFpkbFJoZVc5eGJETXdTa3h4YlUxQ1kyWkNkbEZrY21jaWZTd2ljM1ZtWm1sNFJHRjBZU0k2ZXlKa1pXeDBZVWhoYzJnaU9pSkZhVU5qVEhwbVpWQkRMV3RCV1hNeVoyNWtYMDVEZVVjM1UwWlBWM2RpZEdWdFdYVjNUa2xYY0RjelNVaEJJaXdpY21WamIzWmxjbmxEYjIxdGFYUnRaVzUwSWpvaVJXbEJUMTh3Tm1OcGFTMVlRVmcyU1dadmNuUnFRVzAxU1ZaRWMyZENSMko0TjBaRlIzcGlXR0ZwUXpKNlVTSjlmUSJ9.ex6f3obHx_Mh1aab3oU5JRBoqncUEAc7o426aKpbQXDWbi_pJ98cyH0BtPKC_twXaEdNJUjuxpVNjIUyJxFuBA"
val vcJwt2 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDppb246RWlBbVBHbmJzZVUtOW9mcWR4MGVaQjI1QTE1V3Bfam5LWDVoQmZDd2VPajUwUTpleUprWld4MFlTSTZleUp3WVhSamFHVnpJanBiZXlKaFkzUnBiMjRpT2lKeVpYQnNZV05sSWl3aVpHOWpkVzFsYm5RaU9uc2ljSFZpYkdsalMyVjVjeUk2VzNzaWFXUWlPaUprZDI0dGMybG5JaXdpY0hWaWJHbGpTMlY1U25kcklqcDdJbU55ZGlJNklrVmtNalUxTVRraUxDSnJkSGtpT2lKUFMxQWlMQ0o0SWpvaVdTMXBNMDVOYVZOYVdsWkdRVzF4V25reGNtMTZjMGRFVmpWSVJUbFpkVWx2WkZSSGRscFdiall4WnlKOUxDSndkWEp3YjNObGN5STZXeUpoZFhSb1pXNTBhV05oZEdsdmJpSXNJbUZ6YzJWeWRHbHZiazFsZEdodlpDSmRMQ0owZVhCbElqb2lTbk52YmxkbFlrdGxlVEl3TWpBaWZWMHNJbk5sY25acFkyVnpJanBiWFgxOVhTd2lkWEJrWVhSbFEyOXRiV2wwYldWdWRDSTZJa1ZwUTJveWRsUlFZMGRmZVZWdFNXVmtkMGRPWHpKeWNtTm9RVk5ZWW1SSWJYQTRMV0l4ZVV4cFdHSkVSR2NpZlN3aWMzVm1abWw0UkdGMFlTSTZleUprWld4MFlVaGhjMmdpT2lKRmFVTlRVREZ0WHpWUU1uaE1TVVZxU2toalRHNTVObkZZTkcxT2QyeFhaR2QxVTJrMFNYRk5TWE16V2taQklpd2ljbVZqYjNabGNubERiMjF0YVhSdFpXNTBJam9pUldsRFVuWjNSV3BTVVRKd04xcHhibmhhVTA1bloyOVJiVTVIZDFoVWFUTlhYMDV0VWpJMlZUQm5XVmhVZHlKOWZRI2R3bi1zaWcifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUElJQ3JlZGVudGlhbCJdLCJpZCI6InVybjp1dWlkOjMyMTY5NTE5LWU2NTgtNGQxYi1hYzUxLTIxYjhhODI4YzYxZiIsImlzc3VlciI6ImRpZDppb246RWlBbVBHbmJzZVUtOW9mcWR4MGVaQjI1QTE1V3Bfam5LWDVoQmZDd2VPajUwUTpleUprWld4MFlTSTZleUp3WVhSamFHVnpJanBiZXlKaFkzUnBiMjRpT2lKeVpYQnNZV05sSWl3aVpHOWpkVzFsYm5RaU9uc2ljSFZpYkdsalMyVjVjeUk2VzNzaWFXUWlPaUprZDI0dGMybG5JaXdpY0hWaWJHbGpTMlY1U25kcklqcDdJbU55ZGlJNklrVmtNalUxTVRraUxDSnJkSGtpT2lKUFMxQWlMQ0o0SWpvaVdTMXBNMDVOYVZOYVdsWkdRVzF4V25reGNtMTZjMGRFVmpWSVJUbFpkVWx2WkZSSGRscFdiall4WnlKOUxDSndkWEp3YjNObGN5STZXeUpoZFhSb1pXNTBhV05oZEdsdmJpSXNJbUZ6YzJWeWRHbHZiazFsZEdodlpDSmRMQ0owZVhCbElqb2lTbk52YmxkbFlrdGxlVEl3TWpBaWZWMHNJbk5sY25acFkyVnpJanBiWFgxOVhTd2lkWEJrWVhSbFEyOXRiV2wwYldWdWRDSTZJa1ZwUTJveWRsUlFZMGRmZVZWdFNXVmtkMGRPWHpKeWNtTm9RVk5ZWW1SSWJYQTRMV0l4ZVV4cFdHSkVSR2NpZlN3aWMzVm1abWw0UkdGMFlTSTZleUprWld4MFlVaGhjMmdpT2lKRmFVTlRVREZ0WHpWUU1uaE1TVVZxU2toalRHNTVObkZZTkcxT2QyeFhaR2QxVTJrMFNYRk5TWE16V2taQklpd2ljbVZqYjNabGNubERiMjF0YVhSdFpXNTBJam9pUldsRFVuWjNSV3BTVVRKd04xcHhibmhhVTA1bloyOVJiVTVIZDFoVWFUTlhYMDV0VWpJMlZUQm5XVmhVZHlKOWZRIiwiaXNzdWFuY2VEYXRlIjoiMjAyMy0xMi0yN1QxODoxMjozOVoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDppb246RWlCWUJudDBtMHk3M1YwN1U5LXJkS3RVLUZnZWJSVWhVVDRVTEFzSkJnenZTZzpleUprWld4MFlTSTZleUp3WVhSamFHVnpJanBiZXlKaFkzUnBiMjRpT2lKeVpYQnNZV05sSWl3aVpHOWpkVzFsYm5RaU9uc2ljSFZpYkdsalMyVjVjeUk2VzNzaWFXUWlPaUprZDI0dGMybG5JaXdpY0hWaWJHbGpTMlY1U25kcklqcDdJbU55ZGlJNklrVmtNalUxTVRraUxDSnJkSGtpT2lKUFMxQWlMQ0o0SWpvaVVVUkdRWFJKV1ROeVVYRkJaRlJhZWs5TE9VNWFabmN5WWxaWE0ycEpVR2R0VldONmJYWnBVV0V4ZHlKOUxDSndkWEp3YjNObGN5STZXeUpoZFhSb1pXNTBhV05oZEdsdmJpSXNJbUZ6YzJWeWRHbHZiazFsZEdodlpDSmRMQ0owZVhCbElqb2lTbk52YmxkbFlrdGxlVEl3TWpBaWZWMHNJbk5sY25acFkyVnpJanBiWFgxOVhTd2lkWEJrWVhSbFEyOXRiV2wwYldWdWRDSTZJa1ZwUVhOQ1Fua3RXSHB5WjI1S2JHZFZXbkl5ZG1oWmRsUmhlVzl4YkRNd1NreHhiVTFDWTJaQ2RsRmtjbWNpZlN3aWMzVm1abWw0UkdGMFlTSTZleUprWld4MFlVaGhjMmdpT2lKRmFVTmpUSHBtWlZCRExXdEJXWE15WjI1a1gwNURlVWMzVTBaUFYzZGlkR1Z0V1hWM1RrbFhjRGN6U1VoQklpd2ljbVZqYjNabGNubERiMjF0YVhSdFpXNTBJam9pUldsQlQxOHdObU5wYVMxWVFWZzJTV1p2Y25ScVFXMDFTVlpFYzJkQ1IySjROMFpGUjNwaVdHRnBReko2VVNKOWZRIiwibmFtZSI6IkFsaWNlIFNtaXRoIiwiZGF0ZU9mQmlydGgiOiIyMDAxLTEyLTIxVDE3OjAyOjAxWiJ9fSwiaXNzIjoiZGlkOmlvbjpFaUFtUEduYnNlVS05b2ZxZHgwZVpCMjVBMTVXcF9qbktYNWhCZkN3ZU9qNTBROmV5SmtaV3gwWVNJNmV5SndZWFJqYUdWeklqcGJleUpoWTNScGIyNGlPaUp5WlhCc1lXTmxJaXdpWkc5amRXMWxiblFpT25zaWNIVmliR2xqUzJWNWN5STZXM3NpYVdRaU9pSmtkMjR0YzJsbklpd2ljSFZpYkdsalMyVjVTbmRySWpwN0ltTnlkaUk2SWtWa01qVTFNVGtpTENKcmRIa2lPaUpQUzFBaUxDSjRJam9pV1MxcE0wNU5hVk5hV2xaR1FXMXhXbmt4Y20xNmMwZEVWalZJUlRsWmRVbHZaRlJIZGxwV2JqWXhaeUo5TENKd2RYSndiM05sY3lJNld5SmhkWFJvWlc1MGFXTmhkR2x2YmlJc0ltRnpjMlZ5ZEdsdmJrMWxkR2h2WkNKZExDSjBlWEJsSWpvaVNuTnZibGRsWWt0bGVUSXdNakFpZlYwc0luTmxjblpwWTJWeklqcGJYWDE5WFN3aWRYQmtZWFJsUTI5dGJXbDBiV1Z1ZENJNklrVnBRMm95ZGxSUVkwZGZlVlZ0U1dWa2QwZE9Yekp5Y21Ob1FWTllZbVJJYlhBNExXSXhlVXhwV0dKRVJHY2lmU3dpYzNWbVptbDRSR0YwWVNJNmV5SmtaV3gwWVVoaGMyZ2lPaUpGYVVOVFVERnRYelZRTW5oTVNVVnFTa2hqVEc1NU5uRllORzFPZDJ4WFpHZDFVMmswU1hGTlNYTXpXa1pCSWl3aWNtVmpiM1psY25sRGIyMXRhWFJ0Wlc1MElqb2lSV2xEVW5aM1JXcFNVVEp3TjFweGJuaGFVMDVuWjI5UmJVNUhkMWhVYVROWFgwNXRVakkyVlRCbldWaFVkeUo5ZlEiLCJzdWIiOiJkaWQ6aW9uOkVpQllCbnQwbTB5NzNWMDdVOS1yZEt0VS1GZ2ViUlVoVVQ0VUxBc0pCZ3p2U2c6ZXlKa1pXeDBZU0k2ZXlKd1lYUmphR1Z6SWpwYmV5SmhZM1JwYjI0aU9pSnlaWEJzWVdObElpd2laRzlqZFcxbGJuUWlPbnNpY0hWaWJHbGpTMlY1Y3lJNlczc2lhV1FpT2lKa2QyNHRjMmxuSWl3aWNIVmliR2xqUzJWNVNuZHJJanA3SW1OeWRpSTZJa1ZrTWpVMU1Ua2lMQ0pyZEhraU9pSlBTMUFpTENKNElqb2lVVVJHUVhSSldUTnlVWEZCWkZSYWVrOUxPVTVhWm5jeVlsWlhNMnBKVUdkdFZXTjZiWFpwVVdFeGR5SjlMQ0p3ZFhKd2IzTmxjeUk2V3lKaGRYUm9aVzUwYVdOaGRHbHZiaUlzSW1GemMyVnlkR2x2YmsxbGRHaHZaQ0pkTENKMGVYQmxJam9pU25OdmJsZGxZa3RsZVRJd01qQWlmVjBzSW5ObGNuWnBZMlZ6SWpwYlhYMTlYU3dpZFhCa1lYUmxRMjl0YldsMGJXVnVkQ0k2SWtWcFFYTkNRbmt0V0hweVoyNUtiR2RWV25JeWRtaFpkbFJoZVc5eGJETXdTa3h4YlUxQ1kyWkNkbEZrY21jaWZTd2ljM1ZtWm1sNFJHRjBZU0k2ZXlKa1pXeDBZVWhoYzJnaU9pSkZhVU5qVEhwbVpWQkRMV3RCV1hNeVoyNWtYMDVEZVVjM1UwWlBWM2RpZEdWdFdYVjNUa2xYY0RjelNVaEJJaXdpY21WamIzWmxjbmxEYjIxdGFYUnRaVzUwSWpvaVJXbEJUMTh3Tm1OcGFTMVlRVmcyU1dadmNuUnFRVzAxU1ZaRWMyZENSMko0TjBaRlIzcGlXR0ZwUXpKNlVTSjlmUSJ9.l0_H9lUbTNSZ5p1loo3n2bk8lKxmYzRoNcK6IwO3X23DNhW0b3At_goX40IjqhrN7RwFosQz-h69bJb4z6HzCA"

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