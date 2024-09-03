import React from "react";
import tbdRex from "@site/static/img/tbd-rex";
import TbdArrow from "@site/static/img/tbd-arrow";

type Theme = "yellow" | "teal" | "purple" | "grey";

type TextIconCardProps = {
  icon?: React.ComponentType<{ className: string; fill: string }>;
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
}: TextIconCardProps) {
  const themeClass = themeClasses[theme];
  const iconClass = themeClasses[`icon${theme}`];

  return (
    <div
      className={`sm:w-72 md:min-w-[512px] mobile:w-[360px] col-span-4 border-[1px] border-solid ${themeClass} ${className} transition-all duration-300 group mb-8`}
    >
      <div className="flex flex-col justify-center p-8 h-full">
        <div>
          {Icon && (
            <Icon
              className={`w-[84px] h-[126px] md:w-[100px] md:h-[150px] ${iconClass} transition-all duration-300`}
            />
          )}
          <h3
            className={`text-lg md:text-2xl font-bold mt-4 text-tbd-${theme} group-hover:text-tbd-gray transition-all duration-300`}
          >
            {title}
          </h3>
          <p className={`text-sm md:text-lg mt-2`}>{text}</p>
        </div>
        {url && buttonText && (
          <a
            href={url}
            className={`w-fit text-sm mt-auto items-center inline-flex px-4 pb-2 pt-2 border-solid border-t-4 border-tbd-yellow text-tbd-gray bg-tbd-yellow group-hover:bg-tbd-gray group-hover:text-white group-hover:border-t-white transition-all duration-300 border-b-0 border-x-0 text-[12px] md:text-lg`}
            target="_blank"
            rel="noreferrer"
          >
            {buttonText}
            <TbdArrow
              fill=""
              className="ml-4 fill-tbd-gray group-hover:fill-white transition-all duration-300 rotate-180 size-5 md:size-6"
            />
          </a>
        )}
      </div>
    </div>
  );
}

export default TextIconCard;
