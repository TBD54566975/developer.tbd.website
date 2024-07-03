import React, { useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import JsIcon from "@site/static/img/js-icon";

function LanguageSwitcher() {
  const options = [
    { label: "JavaScript", icon: useBaseUrl("/img/js-icon.svg") },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    const selected = options.find(
      (option) => option.label === event.target.value
    );
    setSelectedOption(selected);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex-col justify-start items-start pl-2 font-spaceGrotesk">
      <div className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 category-label mb-2">
        LANGUAGE
      </div>
      <section>
        <div className="flex items-center justify-start pb-4">
          <div className="relative inline-block w-full">
            <div
              className="flex items-center cursor-pointer p-2 border border-gray-300 rounded-none bg-tbd-yellow"
              onClick={toggleDropdown}
            >
              <img
                src={selectedOption.icon}
                alt={selectedOption.label}
                className="w-5 h-5 mr-2"
              />
              <span className="mr-2">{selectedOption.label}</span>
              <img
                src={useBaseUrl("/img/chevron.svg")}
                alt="Caret Icon"
                className={`w-3 h-3 transition-transform ${
                  isOpen
                    ? "transform rotate-[90deg]"
                    : "transform rotate-[-90deg]"
                }`}
              />
            </div>
            {isOpen && (
              <div className="absolute bottom-full left-0 w-full h-10 mt-1 border border-gray-300 rounded-none bg-dark-grey">
                {options.map((option) => (
                  <div
                    key={option.label}
                    className="flex items-center cursor-pointer p-2 hover:bg-gray-700"
                    onClick={() => {
                      setSelectedOption(option);
                      setIsOpen(false);
                    }}
                  >
                    <JsIcon
                      className="w-5 h-5 mr-2 fill-current text-tbd-yellow"
                      fill="yellow"
                    />
                    <span className="mr-2 text-white font-bold">
                      {option.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LanguageSwitcher;
