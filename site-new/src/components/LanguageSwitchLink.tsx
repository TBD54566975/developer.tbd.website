import React from "react";
import { useLanguage } from "@site/src/context/LanguageSwitcher";
import Link from "@docusaurus/Link";

interface LanguageSwitchLinkProps {
  text: string;
  links: string; // The links are coming in as a JSON string
}

const LanguageSwitchLink: React.FC<LanguageSwitchLinkProps> = ({
  text,
  links,
}) => {
  const { selectedLanguage } = useLanguage();

  // Parse the links JSON string into an object
  let parsedLinks: { [key: string]: string } = {};
  try {
    parsedLinks = JSON.parse(links);
  } catch (error) {
    console.error("Failed to parse links:", error);
    return <Link href="#">{text}</Link>; // Return fallback if parsing fails
  }

  // Normalize the selectedLanguage to match the keys in parsedLinks
  const normalizedLanguage = Object.keys(parsedLinks).find(
    (lang) => lang.toLowerCase() === selectedLanguage.toLowerCase(),
  );

  // Use the normalized language to get the correct href
  const href = normalizedLanguage ? parsedLinks[normalizedLanguage] : "#";

  return <Link href={href}>{text}</Link>;
};

export default LanguageSwitchLink;
