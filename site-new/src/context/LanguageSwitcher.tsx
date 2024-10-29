import React, { createContext, useState, useContext, useEffect } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

interface LanguageContextProps {
  selectedLanguage: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      const storedLanguage = localStorage.getItem("selectedLanguage");
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage.toLowerCase());
      }
    }
  }, []);

  const setLanguage = (language: string) => {
    setSelectedLanguage(language.toLowerCase());
    if (ExecutionEnvironment.canUseDOM) {
      localStorage.setItem("selectedLanguage", language);
    }
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
