import React, { type ReactNode } from "react";
import { Admonition as CustomAdmonition } from "@site/src/components/Admonition";
import type { Variant } from "@site/src/components/Admonition";

import type { Props } from "@theme/Admonition/Layout";

export default function AdmonitionLayout(props: Props): JSX.Element {
  const { type, children } = props;
  return <CustomAdmonition variant={type as Variant} children={children} />;
}
