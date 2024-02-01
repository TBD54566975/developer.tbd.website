package website.tbd.developer.site.docs.web5.build.verifiablecredentials;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.assertEquals

/**
 * Tests backing the VC Guides
 */
internal class JwtToVcTest {

  @Test
  fun `getVerifiableCredentialFromJwt works`() {
    val jwtToVc: JwtToVc = JwtToVc()
    val vc = jwtToVc.getVerifiableCredentialFromJwt()
    // Make sure the contents of the VC are as expected
    assertEquals("did:dht:kfdtbcm9zgocf5matf9fxtnnffhhzxc7mgbwr4k3x3qziaucpp4y",vc.issuer)
  }

}
