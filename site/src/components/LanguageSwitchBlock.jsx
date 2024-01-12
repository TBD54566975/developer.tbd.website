// LanguageSwitchBlock.js
import { React, Children } from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitchBlock = ({ children }) => {
  const { language } = useLanguage();
  const arrayChildren = Children.toArray(children);

  function selectContent() {
    arrayChildren.map((child) => {
      if (child.props.language === language) {
        return child;
      }
    });
  }

  return (
    <div>
      { selectContent() }
    </div>
  );
};

export default LanguageSwitchBlock;