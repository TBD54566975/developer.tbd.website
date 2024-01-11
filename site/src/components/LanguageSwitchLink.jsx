// LanguageSwitchLink.js
import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitchLink = ({ text, javascriptContent, kotlinContent }) => {
  const { language } = useLanguage();

  return (
    <a href={language === 'javascript' ? javascriptContent : kotlinContent}>{text}</a>
  );
};

export default LanguageSwitchLink;