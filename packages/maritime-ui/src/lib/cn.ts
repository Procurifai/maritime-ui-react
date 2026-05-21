import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Compose className strings safely.
 *
 * `clsx` flattens conditional class expressions; `tailwind-merge` resolves
 * conflicting Tailwind utilities (e.g. `p-4 p-2` → `p-2`) so component
 * defaults can be overridden by consumer-supplied `className`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
