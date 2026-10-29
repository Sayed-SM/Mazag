import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 1850 -> "1,850 ج.م" */
export function egp(value: number) {
  const n = new Intl.NumberFormat("en-EG", {
    maximumFractionDigits: 0,
    numberingSystem: "latn",
  }).format(Math.round(value));
  return `${n} ج.م`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)/g, "");
}
