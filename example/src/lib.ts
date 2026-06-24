/**
 * Single import boundary for the local library.
 *
 * The example deliberately imports the library *source* (`../../src`) rather
 * than the built package, so editing `src/` hot-reloads the docs instantly
 * with no rebuild step. Centralising it here means that relative path — and
 * the choice of source-vs-package — lives in exactly one file. If you ever
 * want the example to exercise the published build instead, change only the
 * specifiers below to `react-carousel-latest` / `react-carousel-latest/presets`.
 */
export { Carousel, CardSlider, ImageSlider, SlicerSlider, CubeSlider } from "../../src";
export type { CardVariant, ShapeOption, CarouselHandle, DragInfo } from "../../src";
export { default as Card } from "../../src/presets/Card";
export { palettes } from "../../src/presets/gradient";
export type { Palette } from "../../src/presets/gradient";
