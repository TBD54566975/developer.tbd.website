import React, { createContext, useState, useContext } from 'react';

// Create a context
const LanguageContext = createContext();

// Custom hook for consuming context
export function useLanguage() {
  return useContext(LanguageContext);
}

// Provider component
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('JavaScript'); // Default language

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}