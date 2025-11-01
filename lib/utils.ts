import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { de } from "zod/v4/locales";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileName(url: string): string {
  const fileName = url.split("/").pop() || "";
  return fileName
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/[-_]/g, " ") // replace - and _ with spaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
