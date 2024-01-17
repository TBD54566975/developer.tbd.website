// LanguageSwitchBlock.js
import { useLanguage } from './LanguageContext';
import React from 'react';

const LanguageSwitchBlock = ({ children }) => {
  const { language } = useLanguage();

  var childComponent;
  children.forEach((child) => {

  if (child.props.language === language) {
      childComponent = child;
      return;
    }
  });

  return (
    <div>
      {childComponent}
    </div>
  );
};

export default LanguageSwitchBlock;