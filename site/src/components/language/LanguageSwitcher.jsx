// LanguageSwitcher.js
import React from 'react';
import { useLanguage } from './LanguageContext';
import { useSupportedLanguages } from './SupportedLanguagesContext';

const LanguageSwitcher = () => {
  const { changeLanguage } = useLanguage();
  const { languages } = useSupportedLanguages();

  if (languages.length === 0) {
    return null;
  }

  return (
    <select style={{ width: '20%', fontSize: '18px', color: '#000', fontWeight: 'bold', backgroundColor: '#ffec19' }} onChange={(e) => changeLanguage(e.target.value)} defaultValue="JavaScript">
        {languages.map((languageOption) => 
            <option value={languageOption} key={languageOption}>{languageOption}</option>
        )}
    </select>
  );
};

export default LanguageSwitcher;