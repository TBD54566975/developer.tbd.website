// src/components/PackageJson.js
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';

function SdkVersions({language, dependency}) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const { SDK_VERSIONS } = customFields

  console.log(SDK_VERSIONS)

  return <CodeBlock language={language}>{SDK_VERSIONS[language][dependency]}</CodeBlock>;
}

export default SdkVersions;
