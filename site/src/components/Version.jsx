import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Version() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  return <span>{customFields.WEB5_VERSION}</span>;
}

export default Version;
