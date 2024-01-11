// LanguageSwitcher.js
import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitcher = () => {
  const { changeLanguage } = useLanguage();

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} defaultValue="javascript">
      <option value="javascript">JavaScript</option>
      <option value="kotlin">Kotlin</option>
    </select>
  );
};

export default LanguageSwitcher;