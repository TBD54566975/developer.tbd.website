// src/components/PackageJson.js
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';

// Set up template components
const PackageJson = (depenencies) => {
    // code block gets returned here
}

const Kotlin = (dependencies) => {
    // code block gets returned here
}

// gradle

function SdkVersions({language, dependency}) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const { SDK_VERSIONS } = customFields

  // check language logic
  // switch case to determine javascript, gradle, maven, swift
  // pass array of dependencies to code block
  // return respective language string into a variable

  // render result below

  return <CodeBlock language={language}>{SDK_VERSIONS[language][dependency]}</CodeBlock>;
}

export default SdkVersions;
