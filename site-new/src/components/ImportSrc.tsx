import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from "@theme/CodeBlock";

interface ImportSrcProps {
  src: string;
}

const ImportSrc: React.FC<ImportSrcProps> = ({ src }) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  return (
    <CodeBlock language="js">
      {src === "unpkg"
        ? `import { Web5 } from 'https://unpkg.com/@web5/api@${customFields.WEB5_VERSION}/dist/browser.js';`
        : `import { Web5 } from 'https://cdn.jsdelivr.net/npm/@web5/api@${customFields.WEB5_VERSION}/dist/browser.mjs';`}
    </CodeBlock>
  );
};

export default ImportSrc;
