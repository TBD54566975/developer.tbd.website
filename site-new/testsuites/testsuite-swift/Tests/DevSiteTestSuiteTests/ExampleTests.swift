import XCTest
@testable import DevSiteTestSuite
import Mocker
@testable import Web5

final class ExampleTests: XCTestCase {
    func testExample() throws {
        // XCTest Documentation
        // https://developer.apple.com/documentation/xctest

        // ALR Added to validate test completion and error failures
        XCTAssert(true);
        // XCTAssert(false); // Uncomment to fail this suite

        // Defining Test Cases and Test Methods
        // https://developer.apple.com/documentation/xctest/defining_test_cases_and_test_methods
    }


    func testExampleAPIFetchNames() {

        // Setting up a mock
        let url = URL(string: "https://example.com/names")!
        // let expectedData = "{\"key\":\"value\"}".data(using: .utf8)!
        let mockNames = ["John", "Jane", "Doe"]
        let expectedData = try! JSONEncoder().encode(mockNames)

        // Configure the mock for the specific URL and HTTP method.
        let mock = Mock(url: url, contentType: .json, statusCode: 200, data: [.get: expectedData])
        mock.register()

        // End of setting up a mock.

        // Create a URLSession configuration that uses the protocol class of Mocker.
        let configuration = URLSessionConfiguration.ephemeral
        configuration.protocolClasses = [MockingURLProtocol.self]
        let session = URLSession(configuration: configuration)

        let expectation = self.expectation(description: "Names fetch completed")

        // Perform the network request.
        session.dataTask(with: url) { data, response, error in
            XCTAssertNil(error)
            XCTAssertEqual(data, expectedData)
            expectation.fulfill()
        }.resume()

        waitForExpectations(timeout: 5, handler: nil)
    }

}
