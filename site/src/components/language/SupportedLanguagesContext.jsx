import React, { createContext, useState, useContext } from 'react';

// Create a context
const SupportedLanguagesContext = createContext();

// Custom hook for consuming context
export function useSupportedLanguages() {
  return useContext(SupportedLanguagesContext);
}

// Provider component
export function LanguageOptionsProvider({ children }) {
  const [languages, setLanguages] = useState(['JavaScript', 'Kotlin','Swift']); // Default languages

  const changeLanguages = (newLanguages) => {
    setLanguages(newLanguages);
  };

  return (
    <SupportedLanguagesContext.Provider value={{ languages, changeLanguages }}>
      {children}
    </SupportedLanguagesContext.Provider>
  );
}
