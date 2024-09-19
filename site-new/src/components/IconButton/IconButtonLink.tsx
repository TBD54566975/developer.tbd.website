import Link from "@docusaurus/Link";
import { cn } from "@site/lib/utils";
import React from "react";
import { iconButtonClasses } from "./IconButton";

type LinkProps = React.ComponentProps<typeof Link>;

const IconButtonLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Link {...props} ref={ref} className={cn(iconButtonClasses, className)}>
        {children}
      </Link>
    );
  },
);

export default IconButtonLink;
