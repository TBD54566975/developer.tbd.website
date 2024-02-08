package website.tbd.developer.site.docs.web5.build.verifiablecredentials;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

import web5.sdk.credentials.PresentationExchange
import web5.sdk.credentials.model.*
import java.io.File
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule

/**
 * Tests backing the Presentation Definition Guide
 */
internal class PresentationDefinitionTest {

val objectMapper = ObjectMapper()
val pd = PresentationDefinitionV2(
        id = "PD_JobApplication_123456",
        name = "Credentials Verification for Ethical Hacker Job Application",
        purpose = "To verify the applicant's employment history, and either their academic degree or Certified Ethical Hacker certification",
        inputDescriptors = listOf(
            InputDescriptorV2(
                id = "employmentHistoryVerification",
                name = "Employment History",
                purpose = "Verify the applicant's previous employment experiences",
                constraints = ConstraintsV2(
                    fields = listOf(
                        FieldV2(
                            path = listOf("$.type[*]"),
                            filterJson = objectMapper.readTree(
                                """{"type": "string", "pattern": "Employment"}"""
                            ),

                        )
                    )
                )
            ),
            InputDescriptorV2(
                id = "degreeVerification",
                name = "Degree",
                purpose = "Confirm the applicant's academic qualification",
                constraints = ConstraintsV2(
                    fields = listOf(
                        FieldV2(
                            path = listOf("$.credentialSubject.degree.type"),
                            filterJson = objectMapper.readTree(
                                """{"type": "string", "pattern": "(Engineering|Computer|Cyber|Security)"}"""
                            )
                        )
                    )
                )
            ),
            InputDescriptorV2(
                id = "CEH_CertificationVerification",
                name = "Certified Ethical Hacker Certification",
                purpose = "Confirm the applicant holds a Certified Ethical Hacker certification",
                constraints = ConstraintsV2(
                    fields = listOf(
                        FieldV2(
                            path = listOf("$.credentialSubject.certifications[*].name"),
                            filterJson = objectMapper.readTree(
                                """{"type": "string", "pattern": "Certified Ethical Hacker"}"""
                            )
                        ),
                        FieldV2(
                            path = listOf("$.issuer"),
                            filterJson = objectMapper.readTree(
                                """{"type": "string", "const": "did:example:123456789abcdefghi"}"""
                            )
                        )
                    )
                )
            )
        )
    )

  @Test
  fun `validates Presentation Definition`() {
    assertDoesNotThrow {
    // :snippet-start: validatePresentationDefinitionKt
    try {
        PresentationExchange.validateDefinition(pd)
    } catch (err: Exception) {
        println(err.message)
    }
    // :snippet-end:
    }
  }
}