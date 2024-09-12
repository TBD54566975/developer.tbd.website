import { AccordionTriggerProps } from "@radix-ui/react-accordion";
import React from "react";
import * as AccordionPremitives from "@radix-ui/react-accordion";
import { accordionClassesMap, cn, ToneTypes } from "@site/lib/utils";
import Plus from "@site/assets/icons/Plus";
import Minus from "@site/assets/icons/Minus";
import { useAccordionTone } from "./AccordionToneProvider";

type AccordionGroupProps = {
  tone?: ToneTypes;
};

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps & Pick<AccordionGroupProps, "tone">
>(({ children, className, tone: accordionTone, ...props }, forwardedRef) => {
  let tone: ToneTypes | undefined = undefined;
  const providerTone = useAccordionTone();
  if (providerTone) {
    tone = providerTone.tone ?? accordionTone;
  }
  if (accordionTone) {
    tone = accordionTone;
  }
  if (!tone) {
    tone = "yellow";
  }

  return (
    <AccordionPremitives.Header
      className={cn(
        "relative mb-0 flex text-lg outline-none ring-white before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-white before:content-[''] focus:ring-[0.5px] lg:text-2.5xl",
        accordionClassesMap[tone],
        {
          "opacity-40": props.disabled,
        },
      )}
      tabIndex={0}
    >
      <AccordionPremitives.Trigger
        className={cn(
          "unset p flex w-full items-center justify-between pt-twist-core-spacing-3 lg:pt-twist-core-spacing-8",
          {
            "hover:underline": !props.disabled,
          },
          "[&>.open-icon]:data-[state='open']:hidden",
          "[&>.close-icon]:data-[state='open']:block",
          "[&>.close-icon]:data-[state='closed']:hidden",
          "[&>.open-icon]:data-[state='closed']:block",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <span className={cn("open-icon")}>
          <Plus />
        </span>
        <span className={cn("close-icon")}>
          <Minus />
        </span>
      </AccordionPremitives.Trigger>
    </AccordionPremitives.Header>
  );
});

export default AccordionTrigger;
