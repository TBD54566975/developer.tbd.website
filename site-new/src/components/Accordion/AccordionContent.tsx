import { AccordionContentProps } from "@radix-ui/react-accordion";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@site/lib/utils";
import React from "react";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={cn(
      "mt-twist-core-spacing-8 overflow-hidden lg:mt-twist-core-spacing-9",
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Content>
));

export default AccordionContent;
