import React from "react";
import clsx from "clsx";
import TOCItems from "@theme/TOCItems";
import type { Props } from "@theme/TOC";

import styles from "./styles.module.css";
import { useLocation } from "@docusaurus/router";
import Background from "@site/src/components/Background";
import Heading from "@theme/Heading";

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = "table-of-contents__link toc-highlight";
const LINK_ACTIVE_CLASS_NAME = "table-of-contents__link--active";

type Item = Props["toc"][number];

function groupByFirstLetter(items: readonly Item[]): Record<string, Item[]> {
  const grouped: Record<string, Item[]> = {};

  for (const item of items) {
    const firstLetter = item.value.charAt(0).toUpperCase();

    // Initialize the array if it doesn't exist
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }

    // Push the item into the correct group
    grouped[firstLetter].push(item);
  }

  return grouped;
}

export default function TOC({ className, ...props }: Props): JSX.Element {
  const location = useLocation();
  if (location.pathname === "/docs/glossary") {
    const groupedObject = groupByFirstLetter(props.toc);
    return (
      <div
        className={clsx(
          styles.tableOfContents,
          "thin-scrollbar",
          "custom-toc-container",
          "bg-tbd-yellow",
          className,
        )}
      >
        <Background className="flex h-[111px] items-center px-twist-core-spacing-10">
          <Heading
            as="h4"
            className="mb-0 font-spaceGrotesk font-medium text-black"
          >
            Section
          </Heading>
        </Background>
        <div className="mt-twist-core-spacing-12">
          {Object.keys(groupedObject).map((key) => (
            <div key={key}>
              <p className="sidebar mx-twist-core-spacing-10 mb-0 border-0 border-b-[1px] border-solid border-black pb-2 text-black">
                {key}
              </p>
              <TOCItems
                {...props}
                toc={groupedObject[key]}
                linkClassName={clsx(LINK_CLASS_NAME)}
                linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={clsx(styles.tableOfContents, "thin-scrollbar", className)}>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}
