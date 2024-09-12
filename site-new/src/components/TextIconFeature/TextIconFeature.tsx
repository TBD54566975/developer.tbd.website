import React from "react";
import Heading from "@theme/Heading";
import Heart from "@site/assets/icons/Heart";
import { cn, textClassesMap, TextColors } from "@site/lib/utils";

type Props = {
  body: string;
  title?: string;
  icon?: (_props?: { className?: string }) => JSX.Element;
  variant?: TextColors;
};

const TextIconFeature = ({
  body,
  title,
  variant = "yellow",
  icon: Icon = (props) => (
    <Heart size={24} className={cn(textClassesMap[variant], props.className)} />
  ),
}: Props) => {
  return (
    <div className="relative pt-twist-core-spacing-8 before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-white before:content-['']">
      {Icon && <Icon className="mb-twist-core-spacing-8" />}
      {title && (
        <Heading
          as="h4"
          className={cn("mb-twist-core-spacing-5", textClassesMap[variant])}
        >
          {title}
        </Heading>
      )}
      <p>{body}</p>
    </div>
  );
};

export default TextIconFeature;
