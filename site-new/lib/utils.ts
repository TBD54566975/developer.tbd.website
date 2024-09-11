import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type BackgroundColors = "teal" | "purple" | "yellow";
export const backgroundClassesMap: Record<BackgroundColors, string> = {
  teal: "bg-tbd-teal",
  purple: "bg-tbd-purple-tint-2",
  yellow: "bg-tbd-yellow",
};
