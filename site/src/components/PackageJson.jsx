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

  // Replace placeholder with actual version number
  jsonString = jsonString.replace(
    'VERSION_PLACEHOLDER',
    customFields.WEB5_VERSION,
  );

  return <pre>{jsonString}</pre>;
}

export default PackageJson;
