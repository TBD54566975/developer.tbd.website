// src/components/Version.tsx
import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface CustomFields {
  WEB5_VERSION: string;
  [key: string]: any;
}

const Version: React.FC = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const web5Version = (customFields as CustomFields).WEB5_VERSION;

  return <span>{web5Version}</span>;
};

export default Version;
