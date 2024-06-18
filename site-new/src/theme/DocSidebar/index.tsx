import React from "react";
import DocSidebar from "@theme-original/DocSidebar";
import type DocSidebarType from "@theme/DocSidebar";
import type { WrapperProps } from "@docusaurus/types";

type Props = WrapperProps<typeof DocSidebarType>;

export default function DocSidebarWrapper(props: Props): JSX.Element {
  const sidebarHeader = props.sidebar[0]?.customProps.sidebarHeader ?? "Error";
  return (
    <>
      <section className="bg-tbd-yellow relative top-[60px] h-20 flex items-center pl-4 pt-4">
        <h2>{sidebarHeader}</h2>
      </section>
      <DocSidebar {...props} />
    </>
  );
}
