// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "DevSiteTestSuite",
    platforms: [
        .iOS(.v13),
        .macOS(.v10_15), // Web5 and tbDEX require minimum 'v10_15'
    ],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "DevSiteTestSuite",
            targets: ["DevSiteTestSuite"]),
    ],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
         .package(url: "https://github.com/TBD54566975/web5-swift.git", exact: "1.0.0"),
         .package(url: "https://github.com/TBD54566975/tbdex-swift.git", exact: "1.0.0"),
         .package(url: "https://github.com/WeTransfer/Mocker.git", .upToNextMajor(from: "3.0.2")),
        ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .target(
            name: "DevSiteTestSuite",
            dependencies: [
                .product(name: "Web5", package: "web5-swift"),
                .product(name: "tbDEX", package: "tbdex-swift"),
            ]),
        .testTarget(
            name: "DevSiteTestSuiteTests",
            dependencies: [
                "DevSiteTestSuite",
                "Mocker",
                .product(name: "Web5", package: "web5-swift"),
                .product(name: "tbDEX", package: "tbdex-swift"),
                ]),
    ]
)
