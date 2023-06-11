import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isObjectDifferent = <T extends object>(obj1: T, obj2: T): boolean => {
  const keys = Object.entries(obj1);

  for (const [key, value] of keys) {
    if (value !== (obj2 as any)[key]) {
      return true;
    }
  }

  return false;
};