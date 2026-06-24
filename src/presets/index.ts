/**
 * Ready-made slider presets built on the headless `Carousel` core. Importable
 * on their own subpath for clean tree-shaking:
 *   import { ImageSlider, CardSlider } from "react-carousel-latest/presets";
 *   import "react-carousel-latest/presets.css";
 */
export { default, default as CardSlider } from "./CardSlider";
export type { CardSliderProps, CardSliderSlide } from "./CardSlider";
export { default as ImageSlider } from "./ImageSlider";
export type { ImageSliderProps, ImageSlide } from "./ImageSlider";
export { default as SlicerSlider } from "./SlicerSlider";
export type { SlicerSliderProps, SlicerSlide } from "./SlicerSlider";
export { default as CubeSlider } from "./CubeSlider";
export type { CubeSliderProps, CubeSlide } from "./CubeSlider";
export { default as Card } from "./Card";
export type { CardProps, CardVariant } from "./Card";
export { default as Blobs } from "./Blobs";
export type { ShapeOption } from "./Blobs";
export { getBackground, getPalettes, gradientCss, gradients, palettes } from "./gradient";
export type { Palette } from "./gradient";
