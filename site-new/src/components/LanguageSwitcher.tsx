import React from "react";
import { useLanguage } from "@site/src/context/LanguageSwitcher";

interface LanguageSwitcherProps {
  children: React.ReactNode;
  languages: string[];
}

interface LanguageContentProps {
  language: string;
  children: React.ReactNode;
}

export const LanguageContent: React.FC<LanguageContentProps> = ({
  language,
  children,
}) => {
  const { selectedLanguage } = useLanguage();

  return selectedLanguage === language.toLowerCase() ? <>{children}</> : null;
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  children,
  languages,
}) => {
  const { selectedLanguage, setLanguage } = useLanguage();

  return (
    <div>
      <div className="tabs mb-4 space-x-4">
        {languages.map((lang) => {
          const isActive = selectedLanguage === lang.toLowerCase();
          return (
            <button
              key={lang}
              className={`tab-button text-lg font-medium text-white ${
                isActive
                  ? "rounded-none border-b-2 border-l-0 border-r-0 border-t-0 border-tbd-yellow"
                  : "border-b-2 border-transparent text-white"
              } flex items-center rounded bg-transparent px-4 py-2`}
              onClick={() => setLanguage(lang)}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          );
        })}
      </div>

      {children}
    </div>
  );
};
