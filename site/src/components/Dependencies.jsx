// src/components/PackageJson.js
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';

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

// Function to render Gradle dependencies
function GradleDependencies({ dependencies, sdks }) {
  const repositoriesBlock = `repositories {
    mavenCentral()
    maven("https://repo.danubetech.com/repository/maven-public/")
  }`;

  const dependenciesBlock = dependencies.map(dep => {
    return `implementation("xyz.block:${dep}:${sdks[dep]}")`;
  }).join('\n');

  const gradleString = `${repositoriesBlock}\n${dependenciesBlock}`;
  return <CodeBlock language="gradle">{gradleString}</CodeBlock>;
}

// Main Dependencies component
function Dependencies({ language, dependencies, display = 'command' }) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const { SDK_VERSIONS } = customFields;

  if (display === 'command') {
    if (language === 'javascript') {
      return <InstallCommands dependencies={dependencies} />;
    } else if (language === 'maven') {
      return <GradleDependencies dependencies={dependencies} sdks={SDK_VERSIONS[language]} />;
    }
  }

  switch (language) {
    case 'javascript':
      return <PackageJson sdkVersions={SDK_VERSIONS} dependencies={dependencies} />;
    default:
      return null;
  
}

export default Dependencies;
