/**
 * react-carousel-latest — public API.
 *
 * 2.x primary API is the headless, compound `Carousel`:
 *   import { Carousel } from "react-carousel-latest";
 *   import "react-carousel-latest/styles.css";
 *
 * The 1.x `CardSlider` remains the default export for backwards compatibility:
 *   import CardSlider from "react-carousel-latest";
 *   import "react-carousel-latest/legacy.css";
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
  CarouselOptions,
  CarouselState,
  CarouselAction,
  Orientation,
} from "./core/types";

// --- Backwards-compatible 1.x default export ---
export { default } from "./legacy/CardSlider";
export { default as CardSlider } from "./legacy/CardSlider";
export type { CardSliderProps, CardSliderSlide } from "./legacy/CardSlider";
export type { CardVariant } from "./legacy/Card";
export type { ShapeOption } from "./legacy/Blobs";
