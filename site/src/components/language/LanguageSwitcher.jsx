import React from 'react';
import { useLanguage } from './LanguageContext';
import { useSupportedLanguages } from './SupportedLanguagesContext';
import LanguageSupport from './LanguageSupport';

const LanguageSwitcher = ({ languages: supportedLanguages }) => {
  const { changeLanguage, updateUrl } = useLanguage();
  var currentLanguage = useLanguage().language;
  const { languages } = useSupportedLanguages();

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    changeLanguage(newLanguage);
    updateUrl(newLanguage);
    currentLanguage = newLanguage;
  }

  if (languages.length === 0) {
    return null;
  }
  return (
    <>
    <LanguageSupport languages={supportedLanguages} />
    <div className="language-switch-header">
      <select className="language-switcher-select" onChange={handleLanguageChange} value={currentLanguage}>
        {languages.map((languageOption) => 
            <option value={languageOption} key={languageOption}>{languageOption}</option>
        )}
      </select>
    </div>
    </>
  );
};

export default LanguageSwitcher;