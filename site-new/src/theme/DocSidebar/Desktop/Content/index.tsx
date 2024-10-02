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
import DocBreadcrumbsWrapper from "@site/src/theme/DocBreadcrumbs";

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
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
}: Props): JSX.Element {
  const showAnnouncementBar = useShowAnnouncementBar();

  const sidebarHeader = sidebar[0].customProps.sidebarHeader;

  return (
    <nav
      aria-label={translate({
        id: "theme.docs.sidebar.navAriaLabel",
        message: "Docs sidebar",
        description: "The ARIA label for the sidebar navigation",
      })}
      className={clsx(
        "menu thin-scrollbar flex h-full flex-col",
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className,
      )}
      style={{ minHeight: "100vh" }}
    >
      <Background
        bgColor="yellow"
        squareCount={5}
        className={"mb-8 h-52 w-64 py-2 pl-4"}
      >
        <DocBreadcrumbsWrapper />
        <h4 className="text-dark-grey">{sidebarHeader}</h4>
      </Background>
      <ul
        className={clsx(
          ThemeClassNames.docs.docSidebarMenu,
          "menu__list flex-grow",
        )}
      >
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}
