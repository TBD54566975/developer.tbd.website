import React, { useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import JsIcon from "@site/static/img/js-icon";
import KotlinIcon from "@site/static/img/KotlinIcon";
import Chevron from "@site/static/img/chevron";
import { useLanguage } from "../context/LanguageSwitcher";

function LanguageSwitcher() {
  const { selectedOption, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "JavaScript", icon: JsIcon },
    { label: "Kotlin", icon: KotlinIcon },
  ];

  const handleChange = (event) => {
    const selected = options.find(
      (option) => option.label === event.target.value
    );
    toggleLanguage(selected);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const SelectedIcon = options.find(
    (option) => option.label === selectedOption.label
  )?.icon;

  return (
    <div className="flex-col justify-start items-start pl-2 font-spaceGrotesk bg-tbd-gray-shade-1">
      <div className="eyebrow pl-2 py-2">LANGUAGE</div>
      <section>
        <div className="flex items-center justify-start pb-4">
          <div className="relative inline-block w-full">
            <div
              className="flex items-center justify-between cursor-pointer p-2 border border-gray-300 rounded-none bg-tbd-gray-shade-1"
              onClick={toggleDropdown}
            >
              <div className="flex items-center">
                {SelectedIcon && (
                  <SelectedIcon
                    className="w-5 h-5 mr-2 fill-current text-tbd-yellow"
                    fill="yellow"
                  />
                )}
                <span className="mr-2 text-white">{selectedOption.label}</span>
              </div>

              <Chevron
                className={`h-6 w-6 transition-all ${
                  isOpen ? "transform rotate-0" : "transform rotate-180"
                }`}
                fill="white"
              />
            </div>
            <div
              className={`absolute bottom-full left-0 w-full border border-gray-300 rounded-none bg-dark-grey transition-transform duration-300 ${
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0 pointer-events-none"
              }`}
            >
              {options.map(({ label, icon: LanguageIcon }) => (
                <div
                  key={label}
                  className="flex items-center cursor-pointer p-2 hover:bg-gray-700"
                  onClick={() => {
                    handleChange({ target: { value: label } });
                  }}
                >
                  <LanguageIcon
                    className="w-5 h-5 mr-2 fill-current text-tbd-yellow"
                    fill="yellow"
                  />
                  <span className="mr-2 text-white font-bold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LanguageSwitcher;
