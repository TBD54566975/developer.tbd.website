import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';

function ScriptSrc(unpkg = false, jsdelivr = false) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  if (unpkg) {
    return (
      <CodeBlock language="js">
        {`<script src="https://unpkg.com/@tbd54566975@${customFields.WEB5_VERSION}/dist/browser"></script>`}
      </CodeBlock>
    );
  } else if (jsdelivr) {
    return (
      <CodeBlock language="js" title="index.js">
        {`<script src="https://cdn.jsdelivr.net/npm/@tbd54566975@${customFields.WEB5_VERSION}/dist/browser"></script>`}
      </CodeBlock>
    );
  }
}

export default ScriptSrc;
