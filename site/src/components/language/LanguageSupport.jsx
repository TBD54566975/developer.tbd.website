import React, { useEffect } from 'react';
import { useSupportedLanguages } from './SupportedLanguagesContext';
import { useLanguage } from './LanguageContext';

const LanguageSupport = ({ languages }) => {
  const languagesArray = languages.split(',').map(function (language) {
    return language.trim();
  });
  const { changeLanguages } = useSupportedLanguages();
  const { changeLanguage } = useLanguage();

  useEffect(() => {
    changeLanguages(languagesArray);
    changeLanguage(languagesArray[0]);
  }, [languages]);

  return <div></div>;
};

export default LanguageSupport;
