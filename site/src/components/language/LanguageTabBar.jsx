import React from 'react';
import { useLanguage } from './LanguageContext';
import { useSupportedLanguages } from './SupportedLanguagesContext';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const LanguageTabBar = () => {
    const { changeLanguage, updateUrl } = useLanguage();
    var currentLanguage = useLanguage().language;
    const { languages } = useSupportedLanguages();
    var activeTab = currentLanguage;

    const setActiveTab = (tab) => {
        changeLanguage(tab);
        updateUrl(tab);
        activeTab = tab;
        if (ExecutionEnvironment.canUseDOM) {
          localStorage.setItem('language', tab);
        }
    }

    if (!languages.includes(currentLanguage)) {
      setActiveTab(languages[0]);
    }

  return (
      <div className='languageTabs'>
        {languages.map(tab => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '20px',
              borderBottom: activeTab === tab ? '2px solid yellow' : 'none',
              borderRadius: '10px 10px 0 0',
              background: activeTab === tab ? '#282828' : 'none'
            }}
          >
            {tab}
          </div>
        ))}
      </div>

  );
};

export default LanguageTabBar;