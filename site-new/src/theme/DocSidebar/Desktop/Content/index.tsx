import React, { useState } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  useAnnouncementBar,
  useScrollPosition,
} from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import DocSidebarItems from "@theme/DocSidebarItems";
import type { Props } from "@theme/DocSidebar/Desktop/Content";
import Background from "@site/src/components/Background";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./styles.module.css";

function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive]
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
}: Props): JSX.Element {
  const showAnnouncementBar = useShowAnnouncementBar();
  const options = [
    { label: "JavaScript", icon: useBaseUrl("/img/js-icon.svg") },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (event) => {
    const selected = options.find(
      (option) => option.label === event.target.value
    );
    setSelectedOption(selected);
  };

  return (
    <nav
      aria-label={translate({
        id: "theme.docs.sidebar.navAriaLabel",
        message: "Docs sidebar",
        description: "The ARIA label for the sidebar navigation",
      })}
      className={clsx(
        "menu thin-scrollbar flex flex-col h-full",
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className
      )}
      style={{ minHeight: "100vh" }}
    >
      <Background
        primaryColor="#FFEC19"
        squareCount={5}
        className={"w-64 h-52 py-8 pl-4"}
      >
        <h2>Docs</h2>
      </Background>
      <ul
        className={clsx(
          ThemeClassNames.docs.docSidebarMenu,
          "menu__list flex-grow"
        )}
      >
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
      <div className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 category-label">
        LANGUAGE
      </div>
      <section className="p-4">
        <div className="flex items-center justify-center">
          <div className="custom-select">
            <div className="selected-option">
              <img
                src={selectedOption.icon}
                alt={selectedOption.label}
                className="icon-left"
              />
              <span className="option-label">{selectedOption.label}</span>
              <img
                src={useBaseUrl("/img/chevron.svg")}
                alt="Caret Icon"
                className="icon-right"
              />
            </div>
            <select onChange={handleChange} value={selectedOption.label}>
              {options.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
    </nav>
  );
}
