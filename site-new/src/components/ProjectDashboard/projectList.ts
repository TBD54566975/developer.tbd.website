import { Project } from "./project.types";

export const projects = {
  "@web5/common": {
    url: "https://github.com/TBD54566975/web5-js/tree/main/packages/common",
    language: "js",
    repo: "web5-js",
    group: "web5",
    packageName: "common",
    ciStatus: [
      {
        type: "ghWorkflow",
        label: "ci",
        value: "tests-ci.yml",
      },
    ],
    license: [{ type: "ghLicense" }, { type: "npmLicense" }],
    scan: [
      {
        type: "ghWorkflow",
        label: "scan",
        value: "security.yml",
      },
      { type: "fossa-license" },
      { type: "fossa-security" },
    ],
    ossf: [{ type: "ossf" }],
    sast: [{ type: "ghWorkflow", label: "CodeQL", value: "codeql.yml" }],
    tests: [{ type: "codecov" }, { type: "vectors" }],
    release: [
      { type: "ghTag", value: "@web5/common@*" },
      { type: "npmPkg" },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [],
  },
  "@web5/credentials": {
    url: "https://github.com/TBD54566975/web5-js/tree/main/packages/credentials",
    language: "js",
    repo: "web5-js",
    group: "web5",
    packageName: "credentials",
    ciStatus: [
      {
        type: "ghWorkflow",
        label: "ci",
        value: "tests-ci.yml",
      },
    ],
    license: [{ type: "ghLicense" }, { type: "npmLicense" }],
    scan: [
      {
        type: "ghWorkflow",
        label: "scan",
        value: "security.yml",
      },
      { type: "fossa-license" },
      { type: "fossa-security" },
    ],
    ossf: [{ type: "ossf" }],
    sast: [{ type: "ghWorkflow", label: "CodeQL", value: "codeql.yml" }],
    tests: [{ type: "codecov" }, { type: "vectors" }],
    release: [
      { type: "ghTag", value: "@web5/credentials@*" },
      { type: "npmPkg" },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: "ghWorkflow",
        label: "docs ci",
        value: "docs-ci.yml",
      },
      {
        type: "ghWorkflow",
        label: "docs publish",
        value: "docs-publish.yml",
      },
      {
        value: "reference docs",
        href: "https://tbd54566975.github.io/web5-js/modules/_web5_credentials.html",
      },
    ],
  },
  "@web5/crypto": {
    url: "https://github.com/TBD54566975/web5-js/tree/main/packages/crypto",
    language: "js",
    repo: "web5-js",
    group: "web5",
    packageName: "crypto",
    ciStatus: [
      {
        type: "ghWorkflow",
        label: "ci",
        value: "tests-ci.yml",
      },
    ],
    license: [{ type: "ghLicense" }, { type: "npmLicense" }],
    scan: [
      {
        type: "ghWorkflow",
        label: "scan",
        value: "security.yml",
      },
      { type: "fossa-license" },
      { type: "fossa-security" },
    ],
    ossf: [{ type: "ossf" }],
    sast: [{ type: "ghWorkflow", label: "CodeQL", value: "codeql.yml" }],
    tests: [{ type: "codecov" }, { type: "vectors" }],
    release: [
      { type: "ghTag", value: "@web5/crypto@*" },
      { type: "npmPkg" },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: "ghWorkflow",
        label: "docs ci",
        value: "docs-ci.yml",
      },
      {
        type: "ghWorkflow",
        label: "docs publish",
        value: "docs-publish.yml",
      },
      {
        value: "reference docs",
        href: "https://tbd54566975.github.io/web5-js/modules/_web5_crypto.html",
      },
    ],
  },
  "@web5/dids": {
    url: "https://github.com/TBD54566975/web5-js/tree/main/packages/dids",
    language: "js",
    repo: "web5-js",
    group: "web5",
    packageName: "dids",
    ciStatus: [
      {
        type: "ghWorkflow",
        label: "ci",
        value: "tests-ci.yml",
      },
    ],
    license: [{ type: "ghLicense" }, { type: "npmLicense" }],
    scan: [
      {
        type: "ghWorkflow",
        label: "scan",
        value: "security.yml",
      },
      { type: "fossa-license" },
      { type: "fossa-security" },
    ],
    ossf: [{ type: "ossf" }],
    sast: [{ type: "ghWorkflow", label: "CodeQL", value: "codeql.yml" }],
    tests: [{ type: "codecov" }, { type: "vectors" }],
    release: [
      { type: "ghTag", value: "@web5/dids@*" },
      { type: "npmPkg" },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: "ghWorkflow",
        label: "docs ci",
        value: "docs-ci.yml",
      },
      {
        type: "ghWorkflow",
        label: "docs publish",
        value: "docs-publish.yml",
      },
      {
        value: "reference docs",
        href: "https://tbd54566975.github.io/web5-js/modules/_web5_dids.html",
      },
    ],
  },
  "@tbdex/protocol": {
    url: "https://github.com/TBD54566975/tbdex-js/tree/main/packages/protocol",
    language: "js",
    repo: "tbdex-js",
    group: "tbdex",
    packageName: "protocol",
    ciStatus: [
      {
        type: "ghWorkflow",
        label: "ci",
        value: "integrity-check.yml",
      },
    ],
    license: [{ type: "ghLicense" }, { type: "npmLicense" }],
    scan: [
      {
        type: "ghWorkflow",
        label: "scan",
        value: "security.yml",
      },
      { type: "fossa-license" },
      { type: "fossa-security" },
    ],
    ossf: [{ type: "ossf" }],
    sast: [{ type: "ghWorkflow", label: "CodeQL", value: "codeql.yml" }],
    tests: [{ type: "codecov" }, { type: "vectors" }],
    release: [
      { type: "ghTag", value: "@tbdex/protocol@*" },
      { type: "npmPkg" },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: "ghWorkflow",
        label: "docs ci",
        value: "docs-ci.yml",
      },
      {
        type: "ghWorkflow",
        label: "docs publish",
        value: "docs-publish.yml",
      },
      {
        value: "reference docs",
        href: "https://tbd54566975.github.io/tbdex-js/modules/_tbdex_protocol.html",
      },
    ],
  },
  "@tbdex/http-client": {
    url: "https://github.com/TBD54566975/tbdex-js/tree/main/packages/http-client",
    language: "js",
    repo: "tbdex-js",
    group: "tbdex",
    packageName: "http-client",
    ciStatus: [
      {
        type: "ghWorkflow",
        label: "ci",
        value: "integrity-check.yml",
      },
    ],
    license: [{ type: "ghLicense" }, { type: "npmLicense" }],
    scan: [
      {
        type: "ghWorkflow",
        label: "scan",
        value: "security.yml",
      },
      { type: "fossa-license" },
      { type: "fossa-security" },
    ],
    ossf: [{ type: "ossf" }],
    sast: [{ type: "ghWorkflow", label: "CodeQL", value: "codeql.yml" }],
    tests: [{ type: "codecov" }, { type: "vectors" }],
    release: [
      { type: "ghTag", value: "@tbdex/http-client@*" },
      { type: "npmPkg" },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: "ghWorkflow",
        label: "docs ci",
        value: "docs-ci.yml",
      },
      {
        type: "ghWorkflow",
        label: "docs publish",
        value: "docs-publish.yml",
      },
      {
        value: "reference docs",
        href: "https://tbd54566975.github.io/tbdex-js/modules/_tbdex_http_client.html",
      },
    ],
  },
  "@tbdex/http-server": {
    url: "https://github.com/TBD54566975/tbdex-js/tree/main/packages/http-server",
    language: "js",
    repo: "tbdex-js",
    group: "tbdex",
    packageName: "http-server",
    ciStatus: [
      {
        type: "ghWorkflow",
        label: "ci",
        value: "integrity-check.yml",
      },
    ],
    license: [{ type: "ghLicense" }, { type: "npmLicense" }],
    scan: [
      {
        type: "ghWorkflow",
        label: "scan",
        value: "security.yml",
      },
      { type: "fossa-license" },
      { type: "fossa-security" },
    ],
    ossf: [{ type: "ossf" }],
    sast: [{ type: "ghWorkflow", label: "CodeQL", value: "codeql.yml" }],
    tests: [{ type: "codecov" }, { type: "vectors" }],
    release: [
      { type: "ghTag", value: "@tbdex/http-server@*" },
      { type: "npmPkg" },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: "ghWorkflow",
        label: "docs ci",
        value: "docs-ci.yml",
      },
      {
        type: "ghWorkflow",
        label: "docs publish",
        value: "docs-publish.yml",
      },
      {
        value: "reference docs",
        href: "https://tbd54566975.github.io/tbdex-js/modules/_tbdex_http_server.html",
      },
    ],
  },
  "tbdex-kt": {
    url: "https://github.com/TBD54566975/tbdex-kt",
    language: "kt",
    repo: "tbdex-kt",
    ciStatus: [
      {
        type: "ghWorkflow",
        label: "ci",
        value: "ci.yml",
      },
    ],
    license: [{ type: "ghLicense" }],
    scan: [
      {
        type: "ghWorkflow",
        label: "scan",
        value: "security.yml",
      },
      { type: "fossa-license" },
      { type: "fossa-security" },
    ],
    ossf: [{ type: "ossf" }],
    sast: [{ type: "ghWorkflow", label: "CodeQL", value: "codeql.yml" }],
    tests: [{ type: "codecov" }, { type: "vectors" }],
    release: [
      { type: "ghTag" },
      { type: "mavenCentral", value: "tbdex" },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: "ghWorkflow",
        label: "docs ci",
        value: "ci.yml",
      },
      {
        type: "ghWorkflow",
        label: "docs publish",
        value: "release.yml",
      },
      {
        value: "reference docs",
        href: "https://tbd54566975.github.io/tbdex-kt/docs",
      },
    ],
  },
  "web5-kt": {
    url: "https://github.com/TBD54566975/web5-kt",
    language: "kt",
    repo: "web5-kt",
    ciStatus: [
      {
        type: "ghWorkflow",
        label: "ci",
        value: "ci.yml",
      },
    ],
    license: [{ type: "ghLicense" }],
    scan: [
      {
        type: "ghWorkflow",
        label: "scan",
        value: "security.yml",
      },
      { type: "fossa-license" },
      { type: "fossa-security" },
    ],
    ossf: [{ type: "ossf" }],
    sast: [{ type: "ghWorkflow", label: "CodeQL", value: "codeql.yml" }],
    tests: [{ type: "codecov" }, { type: "vectors" }],
    release: [
      { type: "ghTag" },
      { type: "mavenCentral", value: "web5" },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: "ghWorkflow",
        label: "docs ci",
        value: "ci.yml",
      },
      {
        type: "ghWorkflow",
        label: "docs publish",
        value: "release.yml",
      },
      {
        value: "reference docs",
        href: "https://tbd54566975.github.io/web5-kt/docs",
      },
    ],
  },
  "web5-swift": {
    url: "https://github.com/TBD54566975/web5-swift",
    language: "swift",
    repo: "web5-swift",
    ciStatus: [
      {
        type: "ghWorkflow",
        label: "ci",
        value: "ci.yml",
      },
    ],
    license: [{ type: "ghLicense" }],
    scan: [
      {
        type: "ghWorkflow",
        label: "scan",
        value: "security.yml",
      },
      { type: "fossa-license" },
      { type: "fossa-security" },
    ],
    ossf: [{ type: "ossf" }],
    sast: [{ type: "ghWorkflow", label: "CodeQL", value: "codeql.yml" }],
    tests: [{ type: "codecov" }, { type: "vectors" }],
    release: [
      { type: "ghTag" },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        value: "reference docs",
        href: "https://swiftpackageindex.com/TBD54566975/web5-swift/main/documentation/web5",
      },
    ],
  },
  "tbdex-swift": {
    url: "https://github.com/TBD54566975/tbdex-swift",
    language: "swift",
    repo: "tbdex-swift",
    ciStatus: [
      {
        type: "ghWorkflow",
        label: "ci",
        value: "ci.yml",
      },
    ],
    license: [{ type: "ghLicense" }],
    scan: [
      {
        type: "ghWorkflow",
        label: "scan",
        value: "security.yml",
      },
      { type: "fossa-license" },
      { type: "fossa-security" },
    ],
    ossf: [{ type: "ossf" }],
    sast: [{ type: "ghWorkflow", label: "CodeQL", value: "codeql.yml" }],
    tests: [
      { type: "codecov" },
      // { type: 'vectors' }
    ],
    release: [
      { type: "ghTag" },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        value: "reference docs",
        href: "https://swiftpackageindex.com/TBD54566975/tbdex-swift/main/documentation/tbdex",
      },
    ],
  },
} as const satisfies Record<string, Project>;
