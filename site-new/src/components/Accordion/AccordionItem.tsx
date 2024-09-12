import { ToneTypes } from "@site/lib/utils";
import * as AccordionPremitives from "@radix-ui/react-accordion";
import AccordionTrigger from "./AccordionTrigger";
import AccordionContent from "./AccordionContent";
import type { AccordionItemProps } from "@radix-ui/react-accordion";

type AccordionProps = {
  tone?: ToneTypes;
  summary: React.ReactNode;
  details: React.ReactNode;
} & Pick<AccordionItemProps, "value" | "disabled">;
const AccordionItem = ({
  tone,
  summary,
  details,
  value,
  disabled,
}: AccordionProps) => {
  return (
    <AccordionPremitives.Item value={value} disabled={disabled}>
      <AccordionTrigger tone={tone} disabled={disabled}>
        {summary}
      </AccordionTrigger>
      <AccordionContent>{details}</AccordionContent>
    </AccordionPremitives.Item>
  );
};

export default AccordionItem;
