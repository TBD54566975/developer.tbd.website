// src/components/PackageJson.js
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';
import BreadcrumbTab from '@site/src/components/BreadcrumbTab';

function GradleDependencies({ dependencies, sdks }) {
  const repositoriesBlock = `repositories {
    mavenCentral()
    maven {
      name = "tbd-oss-thirdparty"
      url = uri("https://blockxyz.jfrog.io/artifactory/tbd-oss-thirdparty-maven2/")
      mavenContent {
        releasesOnly()
    }
  }`;

  const dependenciesBlock = dependencies
    .map((dep) => {
      const version = sdks[dep];
      if (version) {
        return `    implementation("xyz.block:${dep}:${version}")`;
      } else {
        return `    implementation("${dep}")`;
      }
    })
    .join('\n');

  const gradleDependenciesBlock = `dependencies {\n${dependenciesBlock}\n}`;
  const gradleString = `${repositoriesBlock}\n${gradleDependenciesBlock}`;

  return <CodeBlock language="gradle">{gradleString}</CodeBlock>;
}

function MavenDependencies({ dependencies, sdks }) {
  const repositoriesBlock = `
 <repository>
      <id>tbd-oss-thirdparty</id>
      <name>tbd-oss-thirdparty</name>
      <releases>
        <enabled>true</enabled>
      </releases>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
      <url>https://blockxyz.jfrog.io/artifactory/tbd-oss-thirdparty-maven2/</url>
</repository>
  `;

  const dependenciesBlock = dependencies
    .map((dep) => {
      let [groupId, artifactId, version] = dep.split(':');
      if (!version) {
        // Handle the case where the version isn't part of the split
        version = sdks[dep];
        groupId = 'xyz.block';
        artifactId = dep;
      }
      return `
<dependency>
    <groupId>${groupId}</groupId>
    <artifactId>${artifactId}</artifactId>
    <version>${version}</version>
</dependency>`;
    })
    .join('');

  const mavenString = `<repositories>${repositoriesBlock}</repositories>\n<dependencies>${dependenciesBlock}</dependencies>`;

  return <CodeBlock language="xml">{mavenString}</CodeBlock>;
}

function SwiftDependencies({ dependencies, sdkVersions }) {
  const swiftImports = dependencies
    .map((dep, index) => {
      const packageInfo = sdkVersions.swift[dep];
      if (!packageInfo) {
        console.error(`Package "${dep}" not found in sdkVersions.swift`);
        return null;
      }
      const { url, branch } = packageInfo;
      return `    .package(url: "${url}", branch: "${branch}")`;
    })
    .filter(Boolean)
    .join(',\n');

  const swiftDependenciesString = `dependencies: [\n${swiftImports}\n]`;

  return <CodeBlock language="swift">{swiftDependenciesString}</CodeBlock>;
}

// Function to render npm install commands
function InstallCommands({ dependencies, sdkVersions }) {
  const commandString = dependencies
    .map((dep) => {
      const normalizedDep = dep.startsWith('@') ? dep : `@${dep}`;
      const version = sdkVersions[normalizedDep];
      if (version) {
        return `npm install ${normalizedDep}@${version}`;
      } else {
        return `npm install ${normalizedDep}`;
      }
    })
    .join('\n');

  return <CodeBlock language="bash">{commandString}</CodeBlock>;
}

// Function to render JavaScript package.json
function PackageJson({ sdkVersions, dependencies }) {
  const requiredDependencies = Object.entries(dependencies).reduce(
    (acc, [dep, depName]) => {
      const depVersion = sdkVersions.js[depName];
      acc[depName] = depVersion;
      return acc;
    },
    { type: 'module' },
  );

  const jsonString = JSON.stringify(requiredDependencies, null, 2);
  return <CodeBlock language="js">{jsonString}</CodeBlock>;
}

function JvmDependencies({ dependencies, sdks, language }) {
  if (language === 'gradle') {
    return <GradleDependencies dependencies={dependencies} sdks={sdks} />;
  }

  if (language === 'maven') {
    return <MavenDependencies dependencies={dependencies} sdks={sdks} />;
  }
}

// Main Dependencies component
function Dependency({ language, dependencies, display = 'install' }) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const { SDK_VERSIONS } = customFields;

  switch (display) {
    case 'install':
      switch (language) {
        case 'javascript':
          return (
            <InstallCommands
              dependencies={dependencies}
              sdkVersions={SDK_VERSIONS.js}
            />
          );
        case 'gradle':
        case 'maven':
          return (
            <JvmDependencies
              language={language}
              dependencies={dependencies}
              sdks={SDK_VERSIONS.jvm}
            />
          );
        case 'swift':
          return (
            <SwiftDependencies
              sdkVersions={SDK_VERSIONS}
              dependencies={dependencies}
            />
          );
        default:
          return null; // Handle unsupported languages
      }
    default:
  }

  switch (language) {
    case 'javascript':
      return (
        <PackageJson sdkVersions={SDK_VERSIONS} dependencies={dependencies} />
      );
    default:
      return null;
  }
}

export default Dependency;
