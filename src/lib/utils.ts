// src/lib/utils.ts
// Tailwind “cn” helper  – shadcn-ui preset
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind class strings intelligently.
 *   cn("p-2 text-sm", cond && "opacity-50") → "p-2 text-sm opacity-50"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
