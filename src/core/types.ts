/**
 * Core carousel types.
 *
 * This module is intentionally free of React markup — it only describes the
 * data shapes that flow through the reducer and the public hook API. Keeping
 * types isolated lets the logic layer be reasoned about (and tested) without
 * pulling in any rendering concerns.
 */

export type Orientation = "horizontal" | "vertical";

/** Options accepted by {@link useCarousel} and the `<Carousel>` root. */
export interface CarouselOptions {
  /** Total number of slides the carousel manages. */
  slidesCount: number;
  /** Slide shown on first render. Clamped into range. Default `0`. */
  initialIndex?: number;
  /** Wrap around past the first/last slide. Default `false`. */
  loop?: boolean;
  /** Start an autoplay timer. Default `false`. */
  autoplay?: boolean;
  /** Autoplay interval in milliseconds. Default `4000`. */
  autoplayInterval?: number;
  /** Slides advanced per prev/next call. Default `1`. */
  slidesToScroll?: number;
  /** Layout axis. Default `"horizontal"`. */
  orientation?: Orientation;
  /** Fired whenever the active slide changes (programmatic or gesture). */
  onIndexChange?: (index: number) => void;
}

/** The serialisable state owned by the reducer. */
export interface CarouselState {
  activeIndex: number;
  slidesCount: number;
  isPlaying: boolean;
}

/** Actions understood by {@link carouselReducer}. */
export type CarouselAction =
  | { type: "NEXT"; step: number; loop: boolean }
  | { type: "PREV"; step: number; loop: boolean }
  | { type: "GO_TO"; index: number }
  | { type: "SET_COUNT"; slidesCount: number }
  | { type: "SET_PLAYING"; isPlaying: boolean };

/**
 * The public surface returned by {@link useCarousel}. Components consume this
 * through context; advanced users can consume it directly to build bespoke UI.
 */
export interface CarouselApi {
  /** Index of the currently active slide. */
  activeIndex: number;
  /** Total slide count. */
  slidesCount: number;
  /** Whether autoplay is currently running. */
  isPlaying: boolean;
  /** True when {@link prev} would move (always true when `loop`). */
  canPrev: boolean;
  /** True when {@link next} would move (always true when `loop`). */
  canNext: boolean;
  /** Resolved orientation. */
  orientation: Orientation;

  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  play: () => void;
  pause: () => void;

  /** Ref for the moving track element (transform target + swipe surface). */
  trackRef: React.RefObject<HTMLDivElement | null>;
  /** Ref for the outer region element (keyboard + autoplay-pause surface). */
  rootRef: React.RefObject<HTMLDivElement | null>;
}
