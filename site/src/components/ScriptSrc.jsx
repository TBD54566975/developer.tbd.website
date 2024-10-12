import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';

function ScriptSrc(site) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  if (site.src === 'unpkg') {
    return (
      <CodeBlock language="js">
        {`<script src="https://unpkg.com/@web5/api@${customFields.WEB5_VERSION}/dist/browser.js"></script>`}
      </CodeBlock>
    );
  } else {
    return (
      <CodeBlock language="js">
        {`<script src="https://cdn.jsdelivr.net/npm/@web5/api@${customFields.WEB5_VERSION}/dist/browser.mjs"></script>`}
      </CodeBlock>
    );
  }
}

export default ScriptSrc;
