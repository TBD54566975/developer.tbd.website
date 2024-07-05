import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState({
    label: "JavaScript",
    icon: "/img/js-icon.svg",
  });

  const toggleLanguage = (newLanguage) => {
    setSelectedOption(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ selectedOption, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
