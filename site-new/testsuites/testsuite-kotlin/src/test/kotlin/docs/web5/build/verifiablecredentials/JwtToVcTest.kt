package website.tbd.developer.site.docs.web5.build.verifiablecredentials;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*
import web5.sdk.credentials.VerifiableCredential
import java.text.SimpleDateFormat
import java.util.TimeZone

/**
 * Tests backing the JwtToVC Guide
 */
internal class JwtToVcTest {

  @Test
  fun `getVerifiableCredentialFromJwt works`() {

    // :snippet-start: jwtToVcVarKt
    val signedVcJwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6ImRpZDpkaHQ6a2ZkdGJjbTl6Z29jZjVtYXRmOWZ4dG5uZmZoaHp4YzdtZ2J3cjRrM3gzcXppYXVjcHA0eSMwIn0.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1wbG95bWVudENyZWRlbnRpYWwiXSwiaWQiOiJ1cm46dXVpZDo4ZmQ1MjAzMC0xY2FmLTQ5NzgtYTM1ZC1kNDE3ZWI4ZTAwYjIiLCJpc3N1ZXIiOiJkaWQ6ZGh0OmtmZHRiY205emdvY2Y1bWF0ZjlmeHRubmZmaGh6eGM3bWdid3I0azN4M3F6aWF1Y3BwNHkiLCJpc3N1YW5jZURhdGUiOiIyMDIzLTEyLTIxVDE3OjAyOjAxWiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmRodDp5MzltNDhvem9ldGU3ejZmemFhbmdjb3M4N2ZodWgxZHppN2Y3andiamZ0N290c2toOXRvIiwicG9zaXRpb24iOiJTb2Z0d2FyZSBEZXZlbG9wZXIiLCJzdGFydERhdGUiOiIyMDIxLTA0LTAxVDEyOjM0OjU2WiIsImVtcGxveW1lbnRTdGF0dXMiOiJDb250cmFjdG9yIn0sImV4cGlyYXRpb25EYXRlIjoiMjAyMi0wOS0zMFQxMjozNDo1NloifSwiaXNzIjoiZGlkOmRodDprZmR0YmNtOXpnb2NmNW1hdGY5Znh0bm5mZmhoenhjN21nYndyNGszeDNxemlhdWNwcDR5Iiwic3ViIjoiZGlkOmRodDp5MzltNDhvem9ldGU3ejZmemFhbmdjb3M4N2ZodWgxZHppN2Y3andiamZ0N290c2toOXRvIn0.ntcgPOdXOatULWo-q6gkuhKmi5X3bzCONQY38t_rsC1hVhvvdAtmiz-ccoLIYUkjECRHIxO_UZbOKgn0EETBCA"
    // :snippet-end:

    // :snippet-start: jwtToVcParseKt
    val vc = VerifiableCredential.parseJwt(signedVcJwt)
    // :snippet-end:

    // Make sure the contents of the VC are as expected
    val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
    dateFormat.timeZone = TimeZone.getTimeZone("UTC")
    val formattedExpirationDate = dateFormat.format(vc.vcDataModel.expirationDate)


    assertNotNull(vc, "The VC should not be null")
    assertTrue(vc.issuer.startsWith("did:dht"), "The VC issuer should have a did that starts with did:dht")
    assertTrue(vc.subject.startsWith("did:dht:"), "The VC subject should have a did that starts with did:dht")
    assertEquals("EmploymentCredential", vc.type, "The VC type should be EmploymentCredential")
    assertEquals("urn:uuid:8fd52030-1caf-4978-a35d-d417eb8e00b2", vc.vcDataModel.id.toString(), "The VC id should be urn:uuid:8fd52030-1caf-4978-a35d-d417eb8e00b2")
    assertEquals("2022-09-30T12:34:56Z", formattedExpirationDate, "The VC expirationDate should be 2022-09-30T12:34:56Z")
    assertEquals("Software Developer", vc.vcDataModel.credentialSubject.claims["position"])
    assertEquals("Contractor", vc.vcDataModel.credentialSubject.claims["employmentStatus"])
  }

}
