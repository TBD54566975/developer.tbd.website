import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Create a context
const LanguageContext = createContext();

// Custom hook for consuming context
export function useLanguage() {
  return useContext(LanguageContext);
}

// Provider component
export function LanguageProvider({ children }) {
  //Load language if set
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let langParam = queryParams.get('lang');
  if (ExecutionEnvironment.canUseDOM) {
    langParam = langParam 
                ? queryParams.get('lang') 
                : localStorage.getItem('language');
  }
  if(!langParam) langParam = 'JavaScript';
  const [language, setLanguage] = useState(langParam);
  const history = useHistory();

  // Read in the language in the url if available
  useEffect(() => {
    if (langParam && langParam.length > 0) {
      setLanguage(langParam);
      if (ExecutionEnvironment.canUseDOM) {
        localStorage.setItem('language', langParam);
      }
    }
  }, [queryParams]);

  const updateUrl = (language) => {
    if (language.length > 0) {
      history.replace(`?lang=${language}`);
    }
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    if(ExecutionEnvironment.canUseDOM) {
      localStorage.setItem('language', newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, updateUrl }}>
      {children}
    </LanguageContext.Provider>
  );
}
