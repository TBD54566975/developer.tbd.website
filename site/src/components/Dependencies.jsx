// src/components/PackageJson.js
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';


function GradleDependencies({ dependencies, sdks }) {
  const repositoriesBlock = `repositories {
    mavenCentral()
    maven("https://repo.danubetech.com/repository/maven-public/")
  }`;

  // Generate the implementation lines
  const dependenciesBlock = dependencies.map(dep => {
    return `    implementation("xyz.block:${dep}:${sdks[dep]}")`; // Note the added indentation
  }).join('\n');

  // Wrap the implementation lines in a `dependencies` block
  const gradleDependenciesBlock = `dependencies {\n${dependenciesBlock}\n}`;

  // Combine repositories and dependencies blocks
  const gradleString = `${repositoriesBlock}\n${gradleDependenciesBlock}`;

  return <CodeBlock language="gradle">{gradleString}</CodeBlock>;
}


function MavenDependencies({ dependencies, sdks }) {
  const repositoriesBlock = dependencies.map(dep => {
    return `
        <repository>
            <id>mavenCentral</id>
            <url>https://repo1.maven.org/maven2/</url>
        </repository>
    `;
  }).join('\n');

  const dependenciesBlock = dependencies.map(dep => {
    return `
        <dependency>
            <groupId>xyz.block</groupId>
            <artifactId>${dep}</artifactId>
            <version>${sdks[dep]}</version>
        </dependency>
    `;
  }).join('\n');

  const mavenString = `
<repositories>
${repositoriesBlock}
</repositories>

<dependencies>
${dependenciesBlock}
</dependencies>
  `;

  return <CodeBlock language="xml">{mavenString}</CodeBlock>;
}

function SwiftDependencies({ dependencies, sdkVersions }) {
  const swiftImports = dependencies.map((dep, index) => {
    const packageInfo = sdkVersions.swift[dep];
    if (!packageInfo) {
      console.error(`Package "${dep}" not found in sdkVersions.swift`);
      return null;
    }
    const { url, branch } = packageInfo;
    return `    .package(url: "${url}", branch: "${branch}")`;
  }).filter(Boolean).join(',\n');

  const swiftDependenciesString = `dependencies: [\n${swiftImports}\n]`;

  return <CodeBlock language="swift">{swiftDependenciesString}</CodeBlock>;
}







// Function to render npm install commands
function InstallCommands({ dependencies }) {
  const commandString = dependencies.map(dep => `npm install ${dep}`).join('\r\n');
  return <CodeBlock language="bash">{commandString}</CodeBlock>;
}

// Function to render JavaScript package.json
function PackageJson({ sdkVersions, dependencies }) {
  const requiredDependencies = Object.entries(dependencies).reduce((acc, [dep, depName]) => {
    const depVersion = sdkVersions.js[depName];
    acc[depName] = depVersion;
    return acc;
  }, { type: 'module' });

  const jsonString = JSON.stringify(requiredDependencies, null, 2);
  return <CodeBlock language="js">{jsonString}</CodeBlock>;
}

function JvmDependencies({ dependencies, sdks, language }) {
  if(language === 'gradle') {

   return <GradleDependencies dependencies={dependencies} sdks={sdks} />
  }

  if (language === 'maven') {
    return <MavenDependencies dependencies={dependencies} sdks={sdks} />
  }

}

// Main Dependencies component
function Dependencies({ language, dependencies, display = 'install' }) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const { SDK_VERSIONS } = customFields;

  switch (display) {
    case 'install':
      switch (language) {
        case 'javascript':
          return <InstallCommands dependencies={dependencies} />;
        case 'gradle':
        case 'maven':
          return <JvmDependencies language={language} dependencies={dependencies} sdks={SDK_VERSIONS.jvm} />;
        case 'swift':
          return <SwiftDependencies sdkVersions={SDK_VERSIONS} dependencies={dependencies} />;
        default:
          return null; // Handle unsupported languages
      }
    default:
  }
  
  switch (language) {
    case 'javascript':
      return <PackageJson sdkVersions={SDK_VERSIONS} dependencies={dependencies} />;
    default:
      return null; 
  }

}

export default Dependencies;
