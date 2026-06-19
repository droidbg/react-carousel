/**
 * Legacy 1.x preset, importable on its own subpath for clean tree-shaking:
 *   import { CardSlider } from "react-carousel-latest/legacy";
 *   import "react-carousel-latest/legacy.css";
 */
export { default, default as CardSlider } from "./CardSlider";
export type { CardSliderProps, CardSliderSlide } from "./CardSlider";
export { default as Card } from "./Card";
export type { CardProps, CardVariant } from "./Card";
export { default as Blobs } from "./Blobs";
export type { ShapeOption } from "./Blobs";
export { getBackground, getPalettes, gradientCss, gradients, palettes } from "./gradient";
export type { Palette } from "./gradient";
