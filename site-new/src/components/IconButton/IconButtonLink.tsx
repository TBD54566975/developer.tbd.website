import Link from "@docusaurus/Link";
import { cn } from "@site/lib/utils";
import React from "react";

type LinkProps = React.ComponentProps<typeof Link>;

const IconButtonLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Link
        {...props}
        ref={ref}
        className={cn(
          "unset w-max cursor-pointer leading-[0] outline-none hover:opacity-50 focus-visible:ring-1 focus-visible:ring-white active:opacity-20",
          className,
        )}
      >
        {children}
      </Link>
    );
  },
);

export default IconButtonLink;
