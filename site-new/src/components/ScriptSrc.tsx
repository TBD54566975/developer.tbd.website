import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from "@theme/CodeBlock";

interface ScriptSrcProps {
  src: string;
}

const ScriptSrc: React.FC<ScriptSrcProps> = ({ src }) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  return (
    <CodeBlock language="js">
      {src === "unpkg"
        ? `<script src="https://unpkg.com/@web5/api@${customFields.WEB5_VERSION}/dist/browser.js"></script>`
        : `<script src="https://cdn.jsdelivr.net/npm/@web5/api@${customFields.WEB5_VERSION}/dist/browser.mjs"></script>`}
    </CodeBlock>
  );
};

export default ScriptSrc;
