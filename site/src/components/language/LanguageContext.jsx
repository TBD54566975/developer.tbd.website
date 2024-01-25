import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';

// Create a context
const LanguageContext = createContext();

// Custom hook for consuming context
export function useLanguage() {
  return useContext(LanguageContext);
}

// Provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('JavaScript');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();

  // Read in the language in the url if available
  useEffect(() => {
    const langParam = queryParams.get('lang');
    if (langParam) {
      setLanguage(langParam);
    }
  }, [queryParams]);

  const updateUrl = (language) => {
    if (language.length > 0) {
      history.replace(`?lang=${language}`);
    }
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, updateUrl }}>
      {children}
    </LanguageContext.Provider>
  );
}