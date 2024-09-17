import { cn, textClassesMap, ToneTypes } from "@site/lib/utils";
import React from "react";
import Heading from "@theme/Heading";

type SpotLightCardProps = {
  src: string;
  alt?: string;
  className?: string;
  tone?: ToneTypes;
  title: string;
  handle: string;
  children?: React.ReactNode;
};

const SpotLightCard = ({
  src,
  alt,
  className,
  tone = "yellow",
  title,
  handle,
  children,
}: SpotLightCardProps) => {
  return (
    <div className={cn("border-[0.5px] border-solid", className)}>
      <img
        src={src}
        alt={alt}
        className="block aspect-[312/225] w-full object-cover lg:aspect-[584/328.5]"
      />
      <div className="bg-black p-twist-core-spacing-9 lg:p-twist-core-spacing-12">
        <p
          className={cn(
            "publication mb-[15px] lg:mb-[27px]",
            textClassesMap[tone],
          )}
        >
          {title}
        </p>
        <Heading as="h3" className="mb-twist-core-spacing-4 lg:mb-[14px]">
          {handle}
        </Heading>
        {typeof children === "string" ? <p>{children}</p> : children}
      </div>
    </div>
  );
};

export default SpotLightCard;
