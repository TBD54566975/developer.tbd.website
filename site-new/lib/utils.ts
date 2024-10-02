import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type BackgroundColors =
  | "teal"
  | "purple"
  | "yellow"
  | "yellow-shade-1"
  | "black"
  | "red";

export type TextColors = BackgroundColors;
export type ToneTypes = "teal" | "purple" | "yellow";

export const backgroundClassesMap: Record<BackgroundColors, string> = {
  teal: "bg-tbd-teal",
  purple: "bg-tbd-purple-tint-2",
  yellow: "bg-tbd-yellow",
  "yellow-shade-1": "bg-tbd-yellow-shade-1",
  black: "bg-tbd-gray-shade-1",
  red: "bg-tbd-red",
};

export const textClassesMap: Record<TextColors, string> = {
  teal: "text-tbd-teal",
  purple: "text-tbd-purple",
  yellow: "text-tbd-yellow",
  "yellow-shade-1": "text-tbd-yellow-shade-1",
  black: "text-tbd-gray-shade-1",
  red: "text-tbd-red",
};

export const accordionClassesMap: Record<
  ToneTypes,
  `data-[state=open]:${string}`
> = {
  teal: `data-[state=open]:${textClassesMap.teal}`,
  purple: `data-[state=open]:${textClassesMap.purple}`,
  yellow: `data-[state=open]:${textClassesMap.yellow}`,
};

type TypeWriterVariableTextProps = {
  variableTexts: string[];
  typingSpeed?: number;
  typeWriterRef: React.MutableRefObject<HTMLElement>;
  pauseBeforeErasing?: number;
  eraseSpeed?: number;
};

const typeWriteVariableText = ({
  variableTexts,
  typingSpeed,
  typeWriterRef,
  pauseBeforeErasing = 1000,
  eraseSpeed = 50,
}: TypeWriterVariableTextProps) => {
  if (!typeWriterRef.current) {
    return;
  }
  let timeout = 0;
  for (let i = 0; i < variableTexts.length; i++) {
    if (i !== 0) {
      timeout += typingSpeed * 2;
    }
    for (let j = 0; j < variableTexts[i].length; j++) {
      timeout += typingSpeed;

      setTimeout(() => {
        if (!typeWriterRef.current) return;
        typeWriterRef.current.innerHTML += `${variableTexts[i].charAt(j)}`;
      }, timeout);
    }
    // pause before erasing the variable text
    timeout += pauseBeforeErasing;
    // erase only the variable text letter by letter like typewriter animation after it's been typed
    for (let k = 0; k < variableTexts[i].length; k++) {
      timeout += eraseSpeed;
      setTimeout(() => {
        if (!typeWriterRef.current) return;
        typeWriterRef.current.innerHTML = typeWriterRef.current.innerHTML.slice(
          0,
          -1,
        );
      }, timeout);
    }
  }
  return timeout + typingSpeed * 2;
};

export const typeWritter = ({
  baseTexts,
  typeWriterRef,
  typingSpeed = 100,
  ...rest
}: {
  baseTexts: { text: string; class: string }[];
  variableTexts: string[];
} & TypeWriterVariableTextProps) => {
  if (!typeWriterRef.current) {
    return;
  }
  let timeout = 0;
  for (let i = 0; i < baseTexts.length; i++) {
    for (let j = 0; j < baseTexts[i].text.length; j++) {
      const currentText = baseTexts[i].text;
      const currentClass = baseTexts[i].class;
      timeout += typingSpeed;
      if (typeWriterRef.current) {
        setTimeout(() => {
          typeWriterRef.current.innerHTML += `<span class=${currentClass}>${currentText.charAt(j)}</span>`;
          if (
            i * j ===
            (baseTexts.length - 1) * (baseTexts[i].text.length - 1)
          ) {
            const totalTimeForVariableText = typeWriteVariableText({
              typingSpeed,
              typeWriterRef,
              ...rest,
            });
            setInterval(() => {
              typeWriteVariableText({
                typingSpeed,
                typeWriterRef,
                ...rest,
              });
            }, totalTimeForVariableText);
          }
        }, timeout);
      }
    }
  }
  return timeout;
};
