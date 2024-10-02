import React from "react";
import Heading from "@theme/Heading";
import Button from "@site/src/components/Button";
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

type CardProps = {
  icon?: React.ComponentType<{ className: string; fill?: string }>;
  image?: string;
  alt?: string;
  eyebrow?: string;
  title: string;
  text?: string;
  buttonText?: string;
  url?: string;
  className?: string;
  theme?: Theme;
  hasBorder?: boolean;
  orientation?: "horizontal" | "vertical";
  size?: "large" | "medium" | "small";
} & (ButtonProps | LanguageButtonProps | DefaultProps);

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

const themeClasses: Record<Theme, string> = {
  yellow: "text-white",
  teal: "text-white",
  purple: "text-white",
  iconyellow: "fill-tbd-yellow",
  iconteal: "fill-tbd-teal",
  iconpurple: "fill-tbd-purple",
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


function Card({
  className = "",
  icon: Icon,
  theme,
  hasBorder = true,
  image,
  eyebrow,
  title,
  alt = title,
  text,
  buttonText,
  url,
  orientation = "vertical", // Default orientation is vertical
  size = "large",
  ...props
}: CardProps) {
  const Image = image;

  const selectedTheme = theme || randomTheme();

  const isHoverEnabled =
    props.type === "buttonText" || props.type === "default" || !props.type;

  const themeClass = cn(themeClasses[selectedTheme], {
    [themeClassesHover[selectedTheme]]: isHoverEnabled,
  });

  const iconClass = cn(themeClasses["icon" + selectedTheme], {
    [themeClassesHover["icon" + selectedTheme]]: isHoverEnabled,
  });

  const borderClass = hasBorder
    ? `border-[1px] border-solid ${image ? "" : "border-t-8"} border-tbd-${selectedTheme}`
    : "";

  const sizeClasses = {
    large: {
      container: "max-w-[800px]",
      image:
        orientation === "horizontal"
          ? "md:w-[400px] w-full h-auto"
          : "h-[531px]",
      text: orientation === "horizontal" ? "md:flex-grow" : "h-[269px]",
    },
    medium: {
      container: "max-w-[584px]",
      image:
        orientation === "horizontal"
          ? "md:w-[292px] w-full h-auto"
          : "h-[291px]",
      text: orientation === "horizontal" ? "md:flex-grow" : "h-[291px]",
    },
    small: {
      container: "max-w-[366px]",
      image:
        orientation === "horizontal"
          ? "md:w-[183px] w-full h-auto"
          : "h-[366px]",
      text: orientation === "horizontal" ? "md:flex-grow" : "h-[350px]",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div
      className={`${className} group flex items-center justify-center ${orientation === "horizontal" ? "flex-col md:flex-row" : "flex-col"} w-full ${currentSize.container} ${themeClass} ${borderClass} transition-all duration-300 mb-4`}
    >

      {/* image  */}
      {Image && 
        <img
          src={Image}
          alt={alt}
          className={`${currentSize.image} object-cover w-full`}
        />
      }

      {/* card body container  */}
      <div className="w-full h-full grid grid-cols-1 gap-4 p-8">
        
        {/* icon  */}
        {Icon && (
          <Icon
            className={`h-[126px] w-[84px] md:h-[150px] md:w-[100px] ${iconClass} transition-all duration-300`}
          />
        )}

        {/* eyebrow for spotlight card  */}
        {eyebrow && (
          <p className="my-0 text-sm md:text-lg">{eyebrow}</p>
        )}

        {/* card heading  */}
        <Heading
          as="h3"
          className={cn(
            `my-0 text-lg font-bold md:text-2xl text-tbd-${selectedTheme} transition-all duration-300`,
            {
              "group-hover:text-tbd-gray": isHoverEnabled,
            },
          )}
        >
          {title}
        </Heading>

        {/* card text  */}
        {text && (
          <p className="my-0 text-sm md:text-lg">{text}</p>
        )}
        
        {/* button text  */}
        {url && buttonText && <Button text={buttonText} url={url} className="mt-2" />}
        
        {/* language icon buttons */}
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
            )
          }
        </>
      </div>
    </div>
  );
}

export default Card;
