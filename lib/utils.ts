import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Locale for every number shown in the UI. Fixed rather than left to the
 * runtime default, so the server render and the browser agree (otherwise
 * Node's "156,000" and an Indian browser's "1,56,000" cause a hydration
 * mismatch). The product reports in ₹ and IST, so Indian grouping.
 */
export const NUMBER_LOCALE = "en-IN"
