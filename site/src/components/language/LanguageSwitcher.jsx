// LanguageSwitcher.js
import React from 'react';
import { useLanguage } from './LanguageContext';
import { useSupportedLanguages } from './SupportedLanguagesContext';

const LanguageSwitcher = () => {
  const { changeLanguage, updateUrl } = useLanguage();
  var currentLanguage = useLanguage();
  const { languages } = useSupportedLanguages();

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    console.log(`changing language to ${newLanguage}`);
    changeLanguage(newLanguage);
    updateUrl(newLanguage);
    currentLanguage = newLanguage;
  }

  if (languages.length === 0) {
    return null;
  }

  return (
    <select style={{ width: 'auto', fontSize: '16px', color: '#000', fontWeight: 'bold', backgroundColor: '#ffec19', marginLeft: '15px' }} onChange={handleLanguageChange}>
        {languages.map((languageOption) => 
            <option value={languageOption} key={languageOption}>{languageOption}</option>
        )}
    </select>
  );
};

export default LanguageSwitcher;