import React from "react";
import Heading from "@theme/Heading";
import Button from "@site/src/components/Button";

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
          <Button
            text={buttonText}
            url={url}
          />
        )}
      </div>
    </div>
  );
}

export default TextIconCard;
