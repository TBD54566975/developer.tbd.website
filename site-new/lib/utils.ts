import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type BackgroundColors = "teal" | "purple" | "yellow";
export type TextColors = BackgroundColors;

export const backgroundClassesMap: Record<BackgroundColors, string> = {
  teal: "bg-tbd-teal",
  purple: "bg-tbd-purple-tint-2",
  yellow: "bg-tbd-yellow",
};

export const textClassesMap: Record<TextColors, string> = {
  teal: "text-tbd-teal",
  purple: "text-tbd-purple",
  yellow: "text-tbd-yellow",
};
