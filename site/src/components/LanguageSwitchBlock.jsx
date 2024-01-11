// LanguageSwitchBlock.js
import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitchBlock = ({ javascriptContent, kotlinContent }) => {
  const { language } = useLanguage();

  return (
    <div>
      {language === 'javascript' ? javascriptContent : kotlinContent}
    </div>
  );
};

export default LanguageSwitchBlock;