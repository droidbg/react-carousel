import { shuffle } from "../utils/shuffle";

/** A two-stop colour palette used to render a card in any design variant. */
export interface Palette {
  from: string;
  to: string;
}

/** Built-in colour palettes (the 1.x gradient set, as colour pairs). */
export const palettes: Palette[] = [
  { from: "#4A90E2", to: "#5F9EE7" },
  { from: "#D35400", to: "#E67E22" },
  { from: "#8E44AD", to: "#9B59B6" },
  { from: "#27AE60", to: "#2ECC71" },
  { from: "#F39C12", to: "#F1C40F" },
  { from: "#E74C3C", to: "#EC7063" },
  { from: "#9B59B6", to: "#8E44AD" },
  { from: "#16A085", to: "#1ABC9C" },
  { from: "#00C9A7", to: "#02AABD" },
  { from: "#FF4E50", to: "#FC913A" },
  { from: "#6A0572", to: "#AB83A1" },
  { from: "#D946EF", to: "#F472B6" },
  { from: "#8E2DE2", to: "#4A00E0" },
  { from: "#FFD700", to: "#FFA500" },
];

/** Build a CSS gradient string from a palette. */
export function gradientCss({ from, to }: Palette): string {
  return `linear-gradient(135deg, ${from}, ${to})`;
}

/** Palettes (optionally shuffled) for assigning one per card. */
export function getPalettes(randomBackground: boolean): Palette[] {
  return randomBackground ? shuffle(palettes) : palettes.slice();
}

/**
 * Gradient strings, optionally shuffled. Retained for 1.x compatibility.
 *
 * @deprecated Prefer {@link getPalettes} + the `variant` API.
 */
export function getBackground(randomBackground: boolean): string[] {
  return getPalettes(randomBackground).map(gradientCss);
}

/** @deprecated Retained for 1.x compatibility. */
export const gradients = palettes.map(gradientCss);
