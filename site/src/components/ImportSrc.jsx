import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';

function ImportSrc(site) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  if (site.src === "unpkg") {
    return (
      <CodeBlock language="js">
        {`import { Web5 } from 'https://unpkg.com/@web5/api@${customFields.WEB5_VERSION}/dist/browser.js';`}
      </CodeBlock>
    );
  } else {
    return (
      <CodeBlock language="js">
        {`import { Web5 } from 'https://cdn.jsdelivr.net/npm/@web5/api@${customFields.WEB5_VERSION}/dist/browser.mjs'`}
      </CodeBlock>
    );
  }
}

export default ImportSrc;
