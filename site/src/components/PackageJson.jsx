// src/components/PackageJson.js
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function PackageJson() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const json = {
    dependencies: {
      '@tbd54566975/web5': customFields.WEB5_VERSION,
    },
    type: 'module',
  };

  let jsonString = JSON.stringify(json, null, 2);

  return <pre>{jsonString}</pre>;
}

export default PackageJson;
