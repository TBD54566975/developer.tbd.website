import React from "react";
import TbdArrow from "@site/static/img/tbd-arrow";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

type Theme = "yellow" | "teal" | "purple" | "grey";

type TextIconCardProps = {
  icon?: React.ComponentType<{ className: string; fill?: string }>;
  title: string;
  text: string;
  url?: string;
  className?: string;
  theme?: Theme;
  buttonText?: string;
  hasBorder?: boolean;
};

const themeClasses = {
  yellow: "text-white hover:bg-tbd-yellow hover:text-tbd-gray",
  teal: "text-white hover:bg-tbd-teal hover:text-tbd-gray",
  purple: "text-white hover:bg-tbd-purple hover:text-tbd-gray",
  grey: "text-white hover:bg-dark-grey hover:text-tbd-gray",
  iconyellow: "fill-tbd-yellow group-hover:fill-tbd-gray",
  iconteal: "fill-tbd-teal group-hover:fill-tbd-gray",
  iconpurple: "fill-tbd-purple-tint-2 group-hover:fill-tbd-gray",
  icongrey: "fill-tbd-grey group-hover:fill-tbd-gray",
};

function TextIconCard({
  icon: Icon,
  title,
  text,
  url,
  className = "",
  theme = "grey",
  buttonText,
  hasBorder = true,
}: TextIconCardProps) {
  const themeClass = themeClasses[theme];
  const iconClass = themeClasses[`icon${theme}`];

  // Conditionally apply border styles based on `hasBorder` (only for TextIconCard)
  const borderClass = hasBorder
    ? `border-[1px] border-solid border-t-8 border-tbd-${theme}`
    : "";

  return (
    <div
      className={` ${themeClass} ${className} group transition-all duration-300 ${borderClass}`}
    >
      <div className="flex h-full flex-col justify-center p-8">
        <div>
          {Icon && (
            <Icon
              className={`h-[126px] w-[84px] md:h-[150px] md:w-[100px] ${iconClass} transition-all duration-300`}
            />
          )}
          <Heading
            as="h3"
            className={`mt-4 text-lg font-bold md:text-2xl text-tbd-${theme} transition-all duration-300 group-hover:text-tbd-gray`}
          >
            {title}
          </Heading>
          <p className={`mt-2 text-sm md:text-lg`}>{text}</p>
        </div>
        {url && buttonText && (
          <Link
            href={url}
            className={`mt-auto inline-flex w-fit items-center border-x-0 border-b-0 border-t-4 border-solid border-tbd-yellow bg-tbd-yellow px-4 pb-2 pt-2 text-[12px] text-sm text-tbd-gray transition-all duration-300 group-hover:border-t-white group-hover:bg-tbd-gray group-hover:text-white md:text-lg`}
            target="_blank"
            rel="noreferrer"
          >
            {buttonText}
            <TbdArrow
              fill=""
              className="ml-4 size-5 rotate-180 fill-tbd-gray transition-all duration-300 group-hover:fill-white md:size-6"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default TextIconCard;
