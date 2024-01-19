import React from 'react';

const projects = [
  {
    name: '@web5/common',
    url: 'https://github.com/TBD54566975/web5-js/tree/main/packages/common',
    language: 'js',
    ghOwnerRepo: 'TBD54566975/web5-js',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'tests-ci.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense', value: '@web5/common' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    unit: [{ label: 'unit' }, { type: 'codecov' }],
    acceptance: [{ label: 'e2e' }],
    release: [
      { type: 'ghTag' },
      { type: 'npmPkg', value: '@web5/common' },
      { label: 'spdx' },
      { label: 'cydx' },
    ],
    apiDocs: [{ label: 'docs ci' }, { label: 'docs publish' }],
  },
  {
    name: '@web5/crypto',
    url: 'https://github.com/TBD54566975/web5-js/tree/main/packages/crypto',
    language: 'js',
    ghOwnerRepo: 'TBD54566975/web5-js',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'tests-ci.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense', value: '@web5/crypto' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    unit: [{ label: 'unit' }, { type: 'codecov' }],
    acceptance: [{ label: 'e2e' }],
    release: [
      { type: 'ghTag' },
      { type: 'npmPkg', value: '@web5/crypto' },
      { label: 'spdx' },
      { label: 'cydx' },
    ],
    apiDocs: [{ label: 'docs ci' }, { label: 'docs publish' }],
  },
  {
    name: '@web5/dids',
    url: 'https://github.com/TBD54566975/web5-js/tree/main/packages/dids',
    language: 'js',
    ghOwnerRepo: 'TBD54566975/web5-js',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'tests-ci.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense', value: '@web5/dids' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa' },
    ],
    ossf: [{ type: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    unit: [{ label: 'unit' }, { type: 'codecov' }],
    acceptance: [{ label: 'e2e' }],
    release: [
      { type: 'ghTag' },
      { type: 'npmPkg', value: '@web5/dids' },
      { label: 'spdx' },
      { label: 'cydx' },
    ],
    apiDocs: [{ label: 'docs ci' }, { label: 'docs publish' }],
  },
  {
    name: '@tbdex/protocol',
    url: 'https://github.com/TBD54566975/tbdex-js/tree/main/packages/protocol',
    language: 'js',
    ghOwnerRepo: 'TBD54566975/tbdex-js',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'integrity-check.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense', value: '@tbdex/protocol' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa' },
    ],
    ossf: [{ label: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    unit: [{ label: 'unit' }, { type: 'codecov' }],
    acceptance: [{ label: 'e2e' }],
    release: [
      { type: 'ghTag' },
      { type: 'npmPkg', value: '@tbdex/protocol' },
      { label: 'spdx' },
      { label: 'cydx' },
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
        color: 'purple',
      },
    ],
  },
  {
    name: '@tbdex/http-client',
    url: 'https://github.com/TBD54566975/tbdex-js/tree/main/packages/http-client',
    language: 'js',
    ghOwnerRepo: 'TBD54566975/tbdex-js',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'integrity-check.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense', value: '@tbdex/http-client' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa' },
    ],
    ossf: [{ label: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    unit: [{ label: 'unit' }, { type: 'codecov' }],
    acceptance: [{ label: 'e2e' }],
    release: [
      { type: 'ghTag' },
      { type: 'npmPkg', value: '@tbdex/http-client' },
      { label: 'spdx' },
      { label: 'cydx' },
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
        color: 'purple',
      },
    ],
  },
  {
    name: '@tbdex/http-server',
    url: 'https://github.com/TBD54566975/tbdex-js/tree/main/packages/http-server',
    language: 'js',
    ghOwnerRepo: 'TBD54566975/tbdex-js',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'integrity-check.yml',
      },
    ],
    license: [
      { type: 'ghLicense' },
      { type: 'npmLicense', value: '@tbdex/http-server' },
    ],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yml',
      },
      { type: 'fossa' },
    ],
    ossf: [{ label: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yml' }],
    unit: [{ label: 'unit' }, { type: 'codecov' }],
    acceptance: [{ label: 'e2e' }],
    release: [
      { type: 'ghTag' },
      { type: 'npmPkg', value: '@tbdex/http-server' },
      { label: 'spdx' },
      { label: 'cydx' },
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
        color: 'purple',
      },
    ],
  },
  {
    name: 'tbdex-kt',
    url: 'https://github.com/TBD54566975/tbdex-kt',
    language: 'kt',
    ghOwnerRepo: 'TBD54566975/tbdex-kt',
    ciStatus: [
      {
        type: 'ghWorkflow',
        label: 'ci',
        value: 'ci.yaml',
      },
    ],
    license: [{ type: 'ghLicense' }, { type: 'mvnLicense' }],
    scan: [
      {
        type: 'ghWorkflow',
        label: 'scan',
        value: 'security.yaml',
      },
      { type: 'fossa' },
    ],
    ossf: [{ label: 'ossf' }],
    sast: [{ type: 'ghWorkflow', label: 'CodeQL', value: 'codeql.yaml' }],
    unit: [{ label: 'unit' }, { type: 'codecov' }],
    acceptance: [{ label: 'e2e' }],
    release: [
      { type: 'ghTag' },
      { type: 'jitPkg' },
      { label: 'spdx' },
      { label: 'cydx' },
    ],
    apiDocs: [
      {
        type: 'ghWorkflow',
        label: 'docs ci',
        value: 'ci.yaml',
      },
      {
        type: 'ghWorkflow',
        label: 'docs publish',
        value: 'docs.yaml',
      },
      {
        value: 'reference docs',
        href: 'https://tbd54566975.github.io/tbdex-kt/index.html',
        color: 'purple',
      },
    ],
  },
];

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
          <th>Unit Tests </th>
          <th>Acceptance Tests</th>
          <th>Release </th>
          <th>API Reference Docs </th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p) => (
          <ProjectItem key={p.name} {...p} />
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
        {item.unit.map((shield, idx) => (
          <Shield key={`ci-status-${idx}`} {...shield} {...item} />
        ))}
      </td>
      <td>
        {item.acceptance.map((shield, idx) => (
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
  value = 'todo',
  color = 'indigo',
  ghOwnerRepo,
}) {
  let badgeSrc = `https://img.shields.io/${type}/${label}-${value}-${color}?style=flat-square`;
  if (type === 'ghWorkflow') {
    badgeSrc = `https://img.shields.io/github/actions/workflow/status/${ghOwnerRepo}/${value}?style=flat-square&branch=main&logo=github&label=${label}&logoColor=FFFFFF`;
    href = `https://github.com/${ghOwnerRepo}/actions/workflows/${value}`;
  } else if (type === 'ghLicense') {
    badgeSrc = `https://img.shields.io/github/license/${ghOwnerRepo}?style=flat-square&logo=github&color=4c1&label=gh`;
    href = `https://github.com/${ghOwnerRepo}/blob/main/LICENSE`;
  } else if (type === 'fossa') {
    const fossaRepoPath = ghOwnerRepo.replace('/', '%2F');
    badgeSrc = `https://app.fossa.com/api/projects/custom%2B588%2Fgithub.com%2F${fossaRepoPath}.svg?type=small`;
    href = `https://app.fossa.com/projects/custom%2B588%2Fgithub.com%2F${fossaRepoPath}?ref=badge_small`;
  } else if (type === 'ossf') {
    badgeSrc = `https://img.shields.io/ossf-scorecard/github.com/${ghOwnerRepo}?label=ossf&style=flat-square`;
    href = `https://securityscorecards.dev/viewer/?uri=github.com/${ghOwnerRepo}`;
  } else if (type === 'codecov') {
    badgeSrc = `https://img.shields.io/codecov/c/gh/${ghOwnerRepo}/main?label=codecov&style=flat-square&token=YI87CKF1LI`;
    href = `https://codecov.io/github/${ghOwnerRepo}`;
  } else if (type === 'ghTag') {
    badgeSrc = `https://img.shields.io/github/v/release/${ghOwnerRepo}?logo=github&label=tag&style=flat-square&color=4c1`;
    href = `https://github.com/${ghOwnerRepo}/releases`;
  } else if (type === 'npmLicense') {
    badgeSrc = `https://img.shields.io/npm/l/${value}.svg?style=flat-square&logo=npm&logoColor=FFFFFF&&color=F7DF1Esantize=true&label=npm`;
    href = `https://www.npmjs.com/package/${value}`;
  } else if (type === 'npmPkg') {
    badgeSrc = `https://img.shields.io/npm/v/${value}.svg?style=flat-square&logo=npm&logoColor=FFFFFF&color=F7DF1E&santize=true`;
    href = `https://www.npmjs.com/package/${value}`;
  } else if (type === 'mvnLicense') {
    badgeSrc = `https://img.shields.io/badge/mvn-todo-indigo?style=flat-square&logo=apachemaven&logoColor=FFFFFF&santize=true`;
    href = `https://www.npmjs.com/package/${value}`;
  } else if (type === 'jitPkg') {
    badgeSrc = `https://img.shields.io/jitpack/version/com.github.${ghOwnerRepo}?style=flat-square&logo=jitpack&color=brightgreen`;
    href = `https://jitpack.io/#${ghOwnerRepo}`;
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
  const languageColor = getLanguageColor(language);
  return <Shield label={''} value={language} color={languageColor} />;
}

function getLanguageColor(language) {
  switch (language) {
    case 'js':
      return 'F7DF1E';
    case 'kt':
      return '7F52FF';
    default:
      return 'black';
  }
}

export default ProjectsDashboard;
