// LanguageSwitchLink.js
import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitchLink = ({ text, links }) => {
  const { language } = useLanguage();
  const href = links[language] || '#';

  return (
    <a href={href}>{text}</a>
  );
};

export default LanguageSwitchLink;