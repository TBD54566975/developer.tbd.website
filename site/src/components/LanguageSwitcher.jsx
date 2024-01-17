// LanguageSwitcher.js
import React from 'react';
import { useLanguage } from './LanguageContext';
import { useSupportedLanguages } from './SupportedLanguagesContext';

const LanguageSwitcher = () => {
  const { changeLanguage } = useLanguage();
  const { languages } = useSupportedLanguages();

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} defaultValue="JavaScript">
        {languages.map((languageOption) => 
            <option value={languageOption}>{languageOption}</option>
        )}
    </select>
  );
};

export default LanguageSwitcher;