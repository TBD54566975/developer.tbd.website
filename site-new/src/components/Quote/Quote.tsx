import React, { ComponentProps } from "react";
import Heading from "@theme/Heading";
import { cn } from "@site/lib/utils";
import Background from "../Background";

type Props = {
  quote: string;
  author?: string;
  className?: string;
} & Pick<ComponentProps<typeof Background>, "bgColor" | "squareCount">;

const Quote = ({ quote, className, author, bgColor, squareCount }: Props) => {
  return (
    <Background
      bgColor={bgColor}
      squareCount={squareCount}
      className={cn(
        "flex flex-col gap-twist-core-spacing-8 p-twist-core-spacing-10 lg:gap-twist-core-spacing-9 lg:p-twist-core-spacing-12",
        className,
      )}
    >
      <Heading as="h2" className="text-inherit mb-0 font-medium">
        <q className="text-inherit">{quote}</q>
      </Heading>
      {author && (
        <span className="text-inherit eyebrow uppercase">{author}</span>
      )}
    </Background>
  );
};

export default Quote;
