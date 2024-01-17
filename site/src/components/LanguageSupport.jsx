// LanguageSupport.js
import React from 'react';
import { useSupportedLanguages } from './LanguageContext';

const LanguageSupport = ({ languages }) => {
  const languagesArray = languages.split(',');
  const { changeLanguages } = useSupportedLanguages();

  changeLanguages(languagesArray);

  return (
    <div></div>
  );
};

export default LanguageSupport;