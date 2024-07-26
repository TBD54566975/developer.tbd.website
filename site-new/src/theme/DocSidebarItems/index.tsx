import React, { memo } from "react";
import {
  DocSidebarItemsExpandedStateProvider,
  useVisibleSidebarItems,
} from "@docusaurus/theme-common/internal";
import DocSidebarItem from "@theme/DocSidebarItem";

import type { Props } from "@theme/DocSidebarItems";

function DocSidebarItems({ items, ...props }: Props): JSX.Element {
  const visibleItems = useVisibleSidebarItems(items, props.activePath);

  console.log("visible items", visibleItems);

  // const label = visibleItems.shift().label;

  return (
    <DocSidebarItemsExpandedStateProvider>
      {/* <span>{label}</span> */}
      {visibleItems.map((item, index) => (
        <DocSidebarItem key={index} item={item} index={index} {...props} />
      ))}
    </DocSidebarItemsExpandedStateProvider>
  );
}

// Optimize sidebar at each "level"
export default memo(DocSidebarItems);
