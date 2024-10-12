// src/components/PackageJson.tsx
import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from "@theme/CodeBlock";

interface CustomFields {
  WEB5_VERSION: string;
  [key: string]: any;
}

const PackageJson: React.FC = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const json = {
    dependencies: {
      "@web5/api": (customFields as CustomFields).WEB5_VERSION,
    },
    type: "module",
  };

  const jsonString = JSON.stringify(json, null, 2);

  return <CodeBlock language="js">{jsonString}</CodeBlock>;
};

export default PackageJson;
