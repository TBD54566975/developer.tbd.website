<<<<<<< HEAD
import Link from "@docusaurus/Link";
=======
>>>>>>> 6db78d23 (add IconButton Component)
import { cn } from "@site/lib/utils";
import React from "react";

type ButtonProps = Omit<React.ComponentProps<"button">, "children"> & {
  children: React.ReactNode;
};

<<<<<<< HEAD
type LinkProps = React.ComponentProps<typeof Link>;

=======
>>>>>>> 6db78d23 (add IconButton Component)
const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          "unset w-max cursor-pointer leading-[0] outline-none hover:opacity-50 focus-visible:ring-1 focus-visible:ring-white active:opacity-20",
          className,
        )}
      >
        {children}
      </button>
    );
  },
);

export default IconButton;
