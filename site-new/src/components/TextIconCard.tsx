import React from "react";
import TbdArrow from "@site/static/img/tbd-arrow";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import Swift from "@site/assets/icons/Swift";
import SwiftMobile from "@site/assets/icons/SwiftMobile";
import Kotlin from "@site/assets/icons/Kotlin";
import JSIcon from "@site/assets/icons/JSIcon";
import GoIcon from "@site/assets/icons/GoIcon";
import { cn } from "@site/lib/utils";
import JSMobile from "@site/assets/icons/JSMobile";
import GoMobile from "@site/assets/icons/GoMobile";
import KotlinMobile from "@site/assets/icons/KotlinMobile";
import { IconButtonLink } from "./IconButton";

type Theme =
  | "yellow"
  | "teal"
  | "purple"
  | "iconyellow"
  | "iconteal"
  | "iconpurple";

type Languages = "swift" | "kotlin" | "js" | "go";

type ButtonProps = {
  type: "buttonText";
  buttonText: string;
  url: string;
};

type LanguageButtonProps = {
  type: "languageButton";
  resources: Partial<Record<Languages, string>>;
};

const ResponsiveIcon = ({
  mobileIcon,
  desktopIcon,
}: {
  mobileIcon: React.ReactNode;
  desktopIcon: React.ReactNode;
}) => (
  <>
    <span className="hidden lg:inline">{desktopIcon}</span>
    <span className="lg:hidden">{mobileIcon}</span>
  </>
);

const languageIconMap: Record<Languages, JSX.Element> = {
  swift: (
    <ResponsiveIcon mobileIcon={<SwiftMobile />} desktopIcon={<Swift />} />
  ),
  js: <ResponsiveIcon mobileIcon={<JSMobile />} desktopIcon={<JSIcon />} />,
  go: <ResponsiveIcon mobileIcon={<GoMobile />} desktopIcon={<GoIcon />} />,
  kotlin: (
    <ResponsiveIcon mobileIcon={<KotlinMobile />} desktopIcon={<Kotlin />} />
  ),
};

type DefaultProps = {
  type?: "default";
};

type TextIconCardProps = {
  icon?: React.ComponentType<{ className: string; fill?: string }>;
  title: string;
  text: string;
  className?: string;
  theme?: Theme;
  hasBorder?: boolean;
} & (ButtonProps | LanguageButtonProps | DefaultProps);

const themeClasses: Record<Theme, string> = {
  yellow: "text-white ",
  teal: "text-white ",
  purple: "text-white ",
  iconyellow: "fill-tbd-yellow ",
  iconteal: "fill-tbd-teal ",
  iconpurple: "fill-tbd-purple-tint-2 ",
};

const themeClassesHover: Record<Theme, string> = {
  yellow: "hover:bg-tbd-yellow hover:text-tbd-gray",
  teal: "hover:bg-tbd-teal hover:text-tbd-gray",
  purple: "hover:bg-tbd-purple hover:text-tbd-gray",
  iconyellow: "group-hover:fill-tbd-gray",
  iconteal: "group-hover:fill-tbd-gray",
  iconpurple: "group-hover:fill-tbd-gray",
};

const randomTheme = (): Theme => {
  const themes: Theme[] = ["yellow", "teal", "purple"];
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
};

function TextIconCard({
  icon: Icon,
  title,
  text,
  className = "",
  theme,
  hasBorder = true,
  ...props
}: TextIconCardProps) {
  const selectedTheme = theme || randomTheme();

  const isHoverEnabled =
    props.type === "buttonText" || props.type === "default" || !props.type;
  const themeClass = cn(themeClasses[selectedTheme], {
    [themeClassesHover[selectedTheme]]: isHoverEnabled,
  });
  const iconClass = themeClasses[selectedTheme];

  const borderClass = hasBorder
    ? `border-[1px] border-solid border-t-8 border-tbd-${selectedTheme}`
    : "";

  console.log("border class", borderClass);

  return (
    <div
      className={`${themeClass} ${className} group transition-all duration-300 ${borderClass}`}
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
            className={cn(
              `mt-4 text-lg font-bold md:text-2xl text-tbd-${selectedTheme} transition-all duration-300`,
              {
                "group-hover:text-tbd-gray": isHoverEnabled,
              },
            )}
          >
            {title}
          </Heading>
          <p className="mt-2 text-sm md:text-lg">{text}</p>
        </div>
        {props.type === "buttonText" && (
          <Link
            href={props.url}
            className="mt-auto inline-flex w-fit items-center border-x-0 border-b-0 border-t-4 border-solid border-tbd-yellow bg-tbd-yellow px-4 pb-2 pt-2 text-[12px] text-sm text-tbd-gray transition-all duration-300 group-hover:border-t-white group-hover:bg-tbd-gray group-hover:text-white md:text-lg"
            target="_blank"
            rel="noreferrer"
          >
            {props.buttonText}
            <TbdArrow
              fill=""
              className="ml-4 size-5 rotate-180 fill-tbd-gray transition-all duration-300 group-hover:fill-white md:size-6"
            />
          </Link>
        )}
        <>
          {props.type === "languageButton" &&
            Object.keys(props.resources).some(
              (key) => props.resources[key as Languages],
            ) && (
              <div className="flex gap-twist-core-spacing-8">
                {Object.keys(props.resources).map((key) => {
                  const value = props.resources[key as Languages];
                  return (
                    value && (
                      <IconButtonLink
                        key={key}
                        href={value}
                        className="leading-[0]"
                      >
                        {languageIconMap[key as Languages]}
                      </IconButtonLink>
                    )
                  );
                })}
              </div>
            )}
        </>
      </div>
    </div>
  );
}

export default TextIconCard;
