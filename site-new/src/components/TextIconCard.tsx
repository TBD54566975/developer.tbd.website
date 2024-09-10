import React from "react";
import TbdArrow from "@site/static/img/tbd-arrow";

type Theme = "yellow" | "teal" | "purple" | "grey";

type TextIconCardProps = {
  icon?: React.ComponentType<{ className: string; fill?: string }>;
  title: string;
  text: string;
  url?: string;
  className?: string;
  theme?: Theme;
  buttonText?: string;
};

const themeClasses = {
  yellow:
    "border-t-8 border-tbd-yellow text-white hover:bg-tbd-yellow hover:text-tbd-gray",
  teal: "border-t-8 border-tbd-teal text-white hover:bg-tbd-teal hover:text-tbd-gray",
  purple:
    "border-t-8 border-tbd-purple text-white hover:bg-tbd-purple hover:text-tbd-gray",
  grey: "border-t-8 border-dark-grey text-white hover:bg-dark-grey hover:text-tbd-gray",
  iconyellow: "fill-tbd-yellow group-hover:fill-tbd-gray",
  iconteal: "fill-tbd-teal group-hover:fill-tbd-gray",
  iconpurple: "fill-tbd-purple group-hover:fill-tbd-gray",
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
}: TextIconCardProps) {
  const themeClass = themeClasses[theme];
  const iconClass = themeClasses[`icon${theme}`];

  return (
    <div
      className={`mobile:w-[360px] border-2 border-solid sm:w-72 md:min-w-[512px] ${themeClass} ${className} group mb-8 transition-all duration-300`}
    >
      <div className="flex h-full flex-col justify-center p-8">
        <div>
          {Icon && (
            <Icon
              className={`h-[126px] w-[84px] md:h-[150px] md:w-[100px] ${iconClass} transition-all duration-300`}
            />
          )}
          <h3
            className={`mt-4 text-lg font-bold md:text-2xl text-tbd-${theme} transition-all duration-300 group-hover:text-tbd-gray`}
          >
            {title}
          </h3>
          <p className={`mt-2 text-sm md:text-lg`}>{text}</p>
        </div>
        {url && buttonText && (
          <a
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
          </a>
        )}
      </div>
    </div>
  );
}

export default TextIconCard;
