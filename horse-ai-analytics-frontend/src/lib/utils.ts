import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberInputConvert = (value: any): number | undefined => {
  const valueStr = String(value);
  if (value != null && !Number.isNaN(value) && valueStr) {
    return parseInt(valueStr);
  }
  return undefined;
};
