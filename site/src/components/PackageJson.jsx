// src/components/PackageJson.js
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';

function PackageJson() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const json = {
    dependencies: {
      '@web5/api': customFields.WEB5_VERSION,
    },
    type: 'module',
  };

  let jsonString = JSON.stringify(json, null, 2);

  return <CodeBlock language="js">{jsonString}</CodeBlock>;
}

export default PackageJson;
