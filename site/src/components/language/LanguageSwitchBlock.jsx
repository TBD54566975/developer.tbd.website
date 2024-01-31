// LanguageSwitchBlock.js
import { useLanguage } from './LanguageContext';
import React, { Children } from 'react';

const LanguageSwitchBlock = ({ children }) => {
  const { language } = useLanguage();

  const childArray = Children.toArray(children);
  var childToRender;

  childArray.forEach((child) => {
    if (child.props.language === language) {
      childToRender = child;
    }
  });

  return <div>{childToRender}</div>;
};

export default LanguageSwitchBlock;
