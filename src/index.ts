/**
 * react-carousel-latest — public API.
 *
 * 2.x primary API is the headless, compound `Carousel`:
 *   import { Carousel } from "react-carousel-latest";
 *   import "react-carousel-latest/styles.css";
 *
 * Ready-made presets (CardSlider, ImageSlider, SlicerSlider) live under
 * `./presets` and need the presets stylesheet:
 *   import { ImageSlider } from "react-carousel-latest/presets";
 *   import "react-carousel-latest/presets.css";
 *
 * `CardSlider` is also the default export of the package root.
 */

// --- Compound components (primary 2.x API) ---
export { Carousel, Track, Slide, Button, Dots, PlayPause } from "./components";
export type {
  CarouselProps,
  TrackProps,
  SlideProps,
  ButtonProps,
  ButtonDirection,
  DotsProps,
  PlayPauseProps,
} from "./components";

// --- Headless hook + supporting types (for fully custom UI) ---
export { useCarousel } from "./core/useCarousel";
export type {
  CarouselApi,
  CarouselHandle,
  CarouselOptions,
  CarouselState,
  CarouselAction,
  Orientation,
  ResponsiveOptions,
  DragInfo,
  DragDirection,
} from "./core/types";

// --- Preset sliders ---
export { default } from "./presets/CardSlider";
export { default as CardSlider } from "./presets/CardSlider";
export type { CardSliderProps, CardSliderSlide } from "./presets/CardSlider";
export { default as ImageSlider } from "./presets/ImageSlider";
export type { ImageSliderProps, ImageSlide } from "./presets/ImageSlider";
export { default as SlicerSlider } from "./presets/SlicerSlider";
export type { SlicerSliderProps, SlicerSlide } from "./presets/SlicerSlider";
export { default as CubeSlider } from "./presets/CubeSlider";
export type { CubeSliderProps, CubeSlide } from "./presets/CubeSlider";
export type { CardVariant } from "./presets/Card";
export type { ShapeOption } from "./presets/Blobs";

