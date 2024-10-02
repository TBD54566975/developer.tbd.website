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

export type TypeWriterWordType =
  | string
  | {
      text: string;
      className: string;
      highlight: { start: number; end: number }[];
    };

type TypeWriterProps = {
  wordsToType: TypeWriterWordType[];
  typingSpeed: number;
  typingDelay: number;
  typeWriterRef: React.MutableRefObject<HTMLElement>;
};

export function typeWriter({
  wordsToType,
  typingSpeed,
  typeWriterRef,
  typingDelay,
}: TypeWriterProps) {
  if (!typeWriterRef.current) return;
  const wordAndCharacterTracker = {
    currentWordIndex: 0,
    currentCharacterIndex: 0,
  };

  function type() {
    if (!typeWriterRef.current) return;
    const typer = typeWriterRef.current;

    const wordOrObjToType =
      wordsToType[
        wordAndCharacterTracker.currentWordIndex % wordsToType.length
      ];

    const wordToType =
      typeof wordOrObjToType === "string"
        ? wordOrObjToType
        : wordOrObjToType.text;

    if (wordAndCharacterTracker.currentCharacterIndex < wordToType.length) {
      const character =
        wordToType[wordAndCharacterTracker.currentCharacterIndex++];
      if (typeof wordOrObjToType !== "string") {
        if (
          wordOrObjToType.highlight.some(
            ({ start, end }) =>
              wordAndCharacterTracker.currentCharacterIndex >= start &&
              wordAndCharacterTracker.currentCharacterIndex <= end,
          )
        ) {
          typer.innerHTML += `<span class="${wordOrObjToType.className}">${character}</span>`;
        } else {
          typer.innerHTML += `<span>${character}</span>`;
        }
      } else {
        typer.innerHTML += `<span>${character}</span>`;
      }

      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, typingDelay);
    }
  }
  function erase() {
    if (!typeWriterRef.current) return;
    const typer = typeWriterRef.current;
    if (wordAndCharacterTracker.currentCharacterIndex > 0) {
      --wordAndCharacterTracker.currentCharacterIndex;
      typer.removeChild(typer.lastChild);

      setTimeout(erase, typingSpeed);
    } else {
      wordAndCharacterTracker.currentWordIndex++;
      setTimeout(type, typingDelay);
    }
  }
  type();
}
