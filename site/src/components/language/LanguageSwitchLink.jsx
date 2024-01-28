import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitchLink = ({ text, links }) => {
  const { language } = useLanguage();
  const jsonObj = JSON.parse(links);
  const href = jsonObj[language] || '#';

  return (
    <a href={href}>{text}</a>
  );
};

export default LanguageSwitchLink;