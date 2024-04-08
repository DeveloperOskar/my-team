import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const getInitials = (name: string) => {
  const names = name.split(" ");
  return names
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const hyphenIfEmpty = (value: string) => {
  return value === "" ? "-" : value;
};

export const showDecimalIfNotZero = (value: number, decimals = 1) => {
  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(decimals);
};

export const toDisplayUnit = (unit: "g" | "ml") => {
  return unit === "g" ? "gram" : "milliliter";
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
