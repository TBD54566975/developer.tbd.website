import { AccordionContentProps } from "@radix-ui/react-accordion";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@site/lib/utils";
import React from "react";
import "./accordionContent.css";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={cn("overflow-hidden", "AccordionContent", className)}
    {...props}
    ref={forwardedRef}
  >
    <div className="mt-twist-core-spacing-8 lg:mt-twist-core-spacing-9">
      {children}
    </div>
  </Accordion.Content>
));

export default AccordionContent;
