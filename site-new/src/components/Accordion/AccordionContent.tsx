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
      "overflow-hidden",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="p mt-twist-core-spacing-8 lg:mt-twist-core-spacing-9">
      {children}
    </div>
  </Accordion.Content>
));

export default AccordionContent;
