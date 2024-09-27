import XCTest
@testable import DevSiteTestSuite

final class DevSiteTestSuiteTests: XCTestCase {

    override class func setUp() {
        super.setUp()
        // Your setup code here, executed before any tests are run in this class
    }

    override func setUp() {
        super.setUp()
        // This is run before each test method in the class
    }

    override func tearDown() {
        // This is run after each test method in the class
        super.tearDown()
    }

    override class func tearDown() {
        // Your teardown code here, executed after all tests in this class are done
        super.tearDown()
    }

    func testExample() throws {
        // XCTest Documentation
        // https://developer.apple.com/documentation/xctest

        // ALR Added to validate test completion and error failures
        XCTAssert(true);
        // XCTAssert(false); // Uncomment to fail this suite

        // Defining Test Cases and Test Methods
        // https://developer.apple.com/documentation/xctest/defining_test_cases_and_test_methods
    }
}
