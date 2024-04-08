import React from 'react';

const projects = {
  '@web5/common': {
    url: 'https://github.com/TBD54566975/web5-js/tree/main/packages/common',
    language: 'js',
    repo: 'web5-js',
    group: 'web5',
    packageName: 'common',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'tests-ci.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa-license' },
      { type: 'fossa-security' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    tests: [{ type: 'codecov' }, { type: 'vectors' }],
    release: [
      { type: 'ghTag', value: '@web5/common@*' },
      { type: 'npmPkg' },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [],
  },
  '@web5/credentials': {
    url: 'https://github.com/TBD54566975/web5-js/tree/main/packages/credentials',
    language: 'js',
    repo: 'web5-js',
    group: 'web5',
    packageName: 'credentials',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'tests-ci.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa-license' },
      { type: 'fossa-security' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    tests: [{ type: 'codecov' }, { type: 'vectors' }],
    release: [
      { type: 'ghTag', value: '@web5/credentials@*' },
      { type: 'npmPkg' },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: 'ghWorkflow',
        label: 'docs ci',
        value: 'docs-ci.yml',
      },
      {
        type: 'ghWorkflow',
        label: 'docs publish',
        value: 'docs-publish.yml',
      },
      {
        value: 'reference docs',
        href: 'https://tbd54566975.github.io/web5-js/modules/_web5_credentials.html',
      },
    ],
  },
  '@web5/crypto': {
    url: 'https://github.com/TBD54566975/web5-js/tree/main/packages/crypto',
    language: 'js',
    repo: 'web5-js',
    group: 'web5',
    packageName: 'crypto',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'tests-ci.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa-license' },
      { type: 'fossa-security' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    tests: [{ type: 'codecov' }, { type: 'vectors' }],
    release: [
      { type: 'ghTag', value: '@web5/crypto@*' },
      { type: 'npmPkg' },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: 'ghWorkflow',
        label: 'docs ci',
        value: 'docs-ci.yml',
      },
      {
        type: 'ghWorkflow',
        label: 'docs publish',
        value: 'docs-publish.yml',
      },
      {
        value: 'reference docs',
        href: 'https://tbd54566975.github.io/web5-js/modules/_web5_crypto.html',
      },
    ],
  },
  '@web5/dids': {
    url: 'https://github.com/TBD54566975/web5-js/tree/main/packages/dids',
    language: 'js',
    repo: 'web5-js',
    group: 'web5',
    packageName: 'dids',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'tests-ci.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa-license' },
      { type: 'fossa-security' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    tests: [{ type: 'codecov' }, { type: 'vectors' }],
    release: [
      { type: 'ghTag', value: '@web5/dids@*' },
      { type: 'npmPkg' },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: 'ghWorkflow',
        label: 'docs ci',
        value: 'docs-ci.yml',
      },
      {
        type: 'ghWorkflow',
        label: 'docs publish',
        value: 'docs-publish.yml',
      },
      {
        value: 'reference docs',
        href: 'https://tbd54566975.github.io/web5-js/modules/_web5_dids.html',
      },
    ],
  },
  '@tbdex/protocol': {
    url: 'https://github.com/TBD54566975/tbdex-js/tree/main/packages/protocol',
    language: 'js',
    repo: 'tbdex-js',
    group: 'tbdex',
    packageName: 'protocol',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'integrity-check.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa-license' },
      { type: 'fossa-security' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    tests: [{ type: 'codecov' }, { type: 'vectors' }],
    release: [
      { type: 'ghTag', value: '@tbdex/protocol@*' },
      { type: 'npmPkg' },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: 'ghWorkflow',
        label: 'docs ci',
        value: 'docs-ci.yml',
      },
      {
        type: 'ghWorkflow',
        label: 'docs publish',
        value: 'docs-publish.yml',
      },
      {
        value: 'reference docs',
        href: 'https://tbd54566975.github.io/tbdex-js/modules/_tbdex_protocol.html',
      },
    ],
  },
  '@tbdex/http-client': {
    url: 'https://github.com/TBD54566975/tbdex-js/tree/main/packages/http-client',
    language: 'js',
    repo: 'tbdex-js',
    group: 'tbdex',
    packageName: 'http-client',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'integrity-check.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa-license' },
      { type: 'fossa-security' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    tests: [{ type: 'codecov' }, { type: 'vectors' }],
    release: [
      { type: 'ghTag', value: '@tbdex/http-client@*' },
      { type: 'npmPkg' },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: 'ghWorkflow',
        label: 'docs ci',
        value: 'docs-ci.yml',
      },
      {
        type: 'ghWorkflow',
        label: 'docs publish',
        value: 'docs-publish.yml',
      },
      {
        value: 'reference docs',
        href: 'https://tbd54566975.github.io/tbdex-js/modules/_tbdex_http_client.html',
      },
    ],
  },
  '@tbdex/http-server': {
    url: 'https://github.com/TBD54566975/tbdex-js/tree/main/packages/http-server',
    language: 'js',
    repo: 'tbdex-js',
    group: 'tbdex',
    packageName: 'http-server',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'integrity-check.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa-license' },
      { type: 'fossa-security' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    tests: [{ type: 'codecov' }, { type: 'vectors' }],
    release: [
      { type: 'ghTag', value: '@tbdex/http-server@*' },
      { type: 'npmPkg' },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: 'ghWorkflow',
        label: 'docs ci',
        value: 'docs-ci.yml',
      },
      {
        type: 'ghWorkflow',
        label: 'docs publish',
        value: 'docs-publish.yml',
      },
      {
        value: 'reference docs',
        href: 'https://tbd54566975.github.io/tbdex-js/modules/_tbdex_http_server.html',
      },
    ],
  },
  'tbdex-kt': {
    url: 'https://github.com/TBD54566975/tbdex-kt',
    language: 'kt',
    repo: 'tbdex-kt',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'ci.yml',
      },
    ],
    license: [{ type: 'ghLicense' }],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa-license' },
      { type: 'fossa-security' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    tests: [{ type: 'codecov' }, { type: 'vectors' }],
    release: [
      { type: 'ghTag' },
      { type: 'mavenCentral', value: 'tbdex' },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: 'ghWorkflow',
        label: 'docs ci',
        value: 'ci.yml',
      },
      {
        type: 'ghWorkflow',
        label: 'docs publish',
        value: 'release.yml',
      },
      {
        value: 'reference docs',
        href: 'https://tbd54566975.github.io/tbdex-kt/docs',
      },
    ],
  },
  'web5-kt': {
    url: 'https://github.com/TBD54566975/web5-kt',
    language: 'kt',
    repo: 'web5-kt',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'ci.yml',
      },
    ],
    license: [{ type: 'ghLicense' }],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa-license' },
      { type: 'fossa-security' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    tests: [{ type: 'codecov' }, { type: 'vectors' }],
    release: [
      { type: 'ghTag' },
      { type: 'mavenCentral', value: 'web5' },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: 'ghWorkflow',
        label: 'docs ci',
        value: 'ci.yml',
      },
      {
        type: 'ghWorkflow',
        label: 'docs publish',
        value: 'release.yml',
      },
      {
        value: 'reference docs',
        href: 'https://tbd54566975.github.io/web5-kt/docs',
      },
    ],
  },
  'web5-swift': {
    url: 'https://github.com/TBD54566975/web5-swift',
    language: 'swift',
    repo: 'web5-swift',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'ci.yml',
      },
    ],
    license: [{ type: 'ghLicense' }],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa-license' },
      { type: 'fossa-security' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    tests: [{ type: 'codecov' }, { type: 'vectors' }],
    release: [
      { type: 'ghTag' },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        value: 'reference docs',
        href: 'https://swiftpackageindex.com/TBD54566975/web5-swift/main/documentation/web5',
      },
    ],
  },
  'tbdex-swift': {
    url: 'https://github.com/TBD54566975/tbdex-swift',
    language: 'swift',
    repo: 'tbdex-swift',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'ci.yml',
      },
    ],
    license: [{ type: 'ghLicense' }],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa-license' },
      { type: 'fossa-security' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    tests: [
      { type: 'codecov' },
      // { type: 'vectors' }
    ],
    release: [
      { type: 'ghTag' },
      // { label: 'spdx' },
      // { label: 'cydx' },
    ],
    apiDocs: [
      {
        value: 'reference docs',
        href: 'https://swiftpackageindex.com/TBD54566975/tbdex-swift/main/documentation/tbdex',
      },
    ],
  },
};

/**
 * Consolidates the Projects Badges Status in a table
 */
function ProjectsDashboard() {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th>SDK</th>
          <th>CI Status </th>
          <th>License</th>
          <th>License & Security Scanning</th>
          <th>OSSF Score</th>
          <th>SAST/Lint</th>
          <th>Tests</th>
          <th>Release </th>
          <th>API Reference Docs </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(projects).map((project) => (
          <ProjectItem key={project} name={project} {...projects[project]} />
        ))}
      </tbody>
    </table>
  );
}

function ProjectItem(item) {
  return (
    <tr>
      <td>
        <div className="flex flex-row items-center">
          <LanguageIcon language={item.language} />
          <a href={item.url} target="_blank" className="ml-2">
            {item.name}
          </a>
        </div>
      </td>
      <td>
        {item.ciStatus.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.license.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.scan.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.ossf.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.sast.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.tests.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.release.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.apiDocs.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
    </tr>
  );
}

function Shield({
  type = 'badge',
  label = '',
  href,
  value,
  group,
  packageName,
  repo,
}) {
  let badgeSrc = `https://img.shields.io/${type}/${label}-${value}-purple?style=flat-square`;
  if (type === 'ghWorkflow') {
    badgeSrc = `https://img.shields.io/github/actions/workflow/status/TBD54566975/${repo}/${value}?style=flat-square&branch=main&logo=github&label=${label}&logoColor=FFFFFF`;
    href = `https://github.com/TBD54566975/${repo}/actions/workflows/${value}`;
  } else if (type === 'ghLicense') {
    badgeSrc = `https://img.shields.io/github/license/TBD54566975/${repo}?style=flat-square&logo=github&color=4c1&label=gh`;
    href = `https://github.com/TBD54566975/${repo}/blob/main/LICENSE`;
  } else if (type === 'fossa-license') {
    badgeSrc = `https://app.fossa.com/api/projects/custom%2B588%2Fgithub.com%2FTBD54566975%2F${repo}.svg?type=shield&issueType=license`;
    href = `https://app.fossa.com/projects/custom%2B588%2Fgithub.com%2FTBD54566975%2F${repo}?ref=badge_shield&issueType=license`;
  } else if (type === 'fossa-security') {
    badgeSrc = `https://app.fossa.com/api/projects/custom%2B588%2Fgithub.com%2FTBD54566975%2F${repo}.svg?type=shield&issueType=security`;
    href = `https://app.fossa.com/projects/custom%2B588%2Fgithub.com%2FTBD54566975%2F${repo}?ref=badge_shield&issueType=security`;
  } else if (type === 'ossf') {
    badgeSrc = `https://img.shields.io/ossf-scorecard/github.com/TBD54566975/${repo}?label=ossf&style=flat-square`;
    href = `https://securityscorecards.dev/viewer/?uri=github.com/TBD54566975/${repo}`;
  } else if (type === 'codecov') {
    badgeSrc = `https://img.shields.io/codecov/c/gh/TBD54566975/${repo}/main?label=codecov&style=flat-square&token=YI87CKF1LI`;
    href = `https://codecov.io/github/TBD54566975/${repo}`;
  } else if (type === 'ghTag') {
    badgeSrc = `https://img.shields.io/github/v/release/TBD54566975/${repo}?logo=github&label=tag&style=flat-square&color=4c1`;
    if(value) {
      badgeSrc += `&filter=${value}`;
    }
    href = `https://github.com/TBD54566975/${repo}/releases`;
  } else if (type === 'npmLicense') {
    badgeSrc = `https://img.shields.io/npm/l/@${group}/${packageName}.svg?style=flat-square&logo=npm&logoColor=FFFFFF&&color=4c1&santize=true&label=npm`;
    href = `https://www.npmjs.com/package/@${group}/${packageName}`;
  } else if (type === 'npmPkg') {
    badgeSrc = `https://img.shields.io/npm/v/@${group}/${packageName}.svg?style=flat-square&logo=npm&logoColor=FFFFFF&color=4c1&santize=true`;
    href = `https://www.npmjs.com/package/@${group}/${packageName}`;
  } else if (type === 'mavenCentral') {
    badgeSrc = `https://img.shields.io/maven-central/v/xyz.block/${value}?color=green`
    href = `https://central.sonatype.com/artifact/xyz.block/${value}`;
  } else if (type == 'vectors') {
    badgeSrc = `https://tbd54566975.github.io/sdk-report-runner/${repo}.svg`
    href = "https://tbd54566975.github.io/sdk-report-runner/"
  }

  const img = <img className="m-0.5" src={badgeSrc} />;
  return href ? (
    <a href={href} target="_blank">
      {img}
    </a>
  ) : (
    img
  );
}

function LanguageIcon({ language }) {
  return <Shield label={''} value={language} color="blue" />;
}

export default ProjectsDashboard;
