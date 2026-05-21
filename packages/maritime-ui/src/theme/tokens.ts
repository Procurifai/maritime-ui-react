/**
 * Theme name set: four built-in palettes derived from IEC 62288 luminance
 * categories. Apply via `<html data-mu-theme="dusk">` (or any ancestor).
 */
export type ThemeName = 'day' | 'dusk' | 'night' | 'bright';

/**
 * Semantic status colour. Maps to `--mu-color-status-<value>` and the
 * corresponding `.bg-mu-status-<value>` / `.text-mu-status-<value>` utility.
 */
export type StatusColor = 'safe' | 'caution' | 'warning' | 'alarm' | 'inactive';

/** All four theme names, in display order. */
export const THEMES: readonly ThemeName[] = ['day', 'dusk', 'night', 'bright'] as const;

/** All five status values, in severity order (low → high). */
export const STATUS_COLORS: readonly StatusColor[] = [
  'inactive',
  'safe',
  'caution',
  'warning',
  'alarm',
] as const;
