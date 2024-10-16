import React, { useState } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  useAnnouncementBar,
  useLocalPathname,
  useScrollPosition,
} from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import DocSidebarItems from "@theme/DocSidebarItems";
import type { Props } from "@theme/DocSidebar/Desktop/Content";
import Background from "@site/src/components/Background";
import useBaseUrl from "@docusaurus/useBaseUrl";
import DocBreadcrumbsWrapper from "@site/src/theme/DocBreadcrumbs";
import Heading from "@theme/Heading";

import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import ArrowLeft from "@site/assets/icons/ArrowLeft";
import { BlockBg } from "@site/src/components/BlockBg";

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

  const sidebarHeader = sidebar[0].customProps.sidebarHeader as string;

  const pathName = useLocalPathname();
  const pathArray = pathName.split("/");
  if (pathArray.length > 1) {
    pathArray.pop();
  }

  let previousePage = pathArray.join("/");

  if (`${previousePage}/` === pathName) {
    previousePage = "/";
  }

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
      <BlockBg
        // bgColor="yellow"
        // squareCount={5}
        className={
          "center grid h-[105px] items-center bg-tbd-yellow-shade-1 px-twist-core-spacing-8 [--block-color:var(--tbd-yellow-shade-2)]"
        }
        maxSize={30}
        minSize={20}
        columns={6}
        rows={4}
        decreaseBlockLevel={0}
      >
        {/* <DocBreadcrumbsWrapper /> */}
        <Link
          to={previousePage}
          className={
            "mb-twist-core-spacing-8 font-spaceGrotesk text-xs text-black hover:text-black hover:no-underline"
          }
        >
          <ArrowLeft className="relative top-1 mr-[6px]" />
          Back
        </Link>
        <Heading as="h4" className="my-0 text-dark-grey">
          {sidebarHeader}
        </Heading>
      </BlockBg>
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
