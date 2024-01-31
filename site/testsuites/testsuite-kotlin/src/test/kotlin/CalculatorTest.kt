package website.tbd.developer.site

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

/**
 * Simple test of the Calculator
 *
 * @author ALR <mailto:alr@tbd.email>
 */
internal class CalculatorTest {
// :snippet-start: Calculator-test
    private val calculator: Calculator = Calculator()

    @Test
    fun testSum() {
        val expected = 42
        assertEquals(expected, calculator.sum(17, 25))
    }
    // :snippet-end:
}
