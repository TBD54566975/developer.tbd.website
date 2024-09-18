import { cn } from "@site/lib/utils";
import React from "react";

type ButtonProps = Omit<React.ComponentProps<"button">, "children"> & {
  children: React.ReactNode;
};

export const iconButtonClasses =
  "unset w-max cursor-pointer leading-[0] outline-none hover:opacity-50 focus-visible:ring-1 focus-visible:ring-white active:opacity-20 transition-opacity";

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button {...props} ref={ref} className={cn(iconButtonClasses, className)}>
        {children}
      </button>
    );
  },
);

export default IconButton;
