import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { carouselReducer } from "./carouselReducer";
import { useAutoplay } from "./useAutoplay";
import { useKeyboard } from "./useKeyboard";
import { useSwipe } from "./useSwipe";
import { clamp } from "../utils/clamp";
import type { CarouselApi, CarouselOptions, CarouselState } from "./types";

/**
 * The headless heart of the library: owns navigation state and composes the
 * keyboard, swipe, and autoplay behaviours into a single {@link CarouselApi}.
 *
 * Use it directly to build a fully custom UI, or let `<Carousel>` call it and
 * expose the result through context to the compound components.
 */
export function useCarousel(options: CarouselOptions): CarouselApi {
  const {
    slidesCount,
    initialIndex = 0,
    loop = false,
    autoplay = false,
    autoplayInterval = 4000,
    slidesToScroll = 1,
    orientation = "horizontal",
    onIndexChange,
  } = options;

  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(
    carouselReducer,
    undefined,
    (): CarouselState => ({
      activeIndex: clamp(initialIndex, 0, slidesCount - 1),
      slidesCount,
      isPlaying: autoplay,
    }),
  );

  // Keep the active index valid when the slide collection changes size.
  useEffect(() => {
    dispatch({ type: "SET_COUNT", slidesCount });
  }, [slidesCount]);

  // Notify consumers of index changes without re-arming on every render.
  const onIndexChangeRef = useRef(onIndexChange);
  onIndexChangeRef.current = onIndexChange;
  useEffect(() => {
    onIndexChangeRef.current?.(state.activeIndex);
  }, [state.activeIndex]);

  const next = useCallback(
    () => dispatch({ type: "NEXT", step: slidesToScroll, loop }),
    [slidesToScroll, loop],
  );
  const prev = useCallback(
    () => dispatch({ type: "PREV", step: slidesToScroll, loop }),
    [slidesToScroll, loop],
  );
  const goTo = useCallback((index: number) => dispatch({ type: "GO_TO", index }), []);
  const play = useCallback(() => dispatch({ type: "SET_PLAYING", isPlaying: true }), []);
  const pause = useCallback(() => dispatch({ type: "SET_PLAYING", isPlaying: false }), []);
  const first = useCallback(() => dispatch({ type: "GO_TO", index: 0 }), []);
  const last = useCallback(
    () => dispatch({ type: "GO_TO", index: slidesCount - 1 }),
    [slidesCount],
  );

  useKeyboard({ rootRef, orientation, onPrev: prev, onNext: next, onFirst: first, onLast: last });
  useSwipe({ trackRef, orientation, onPrev: prev, onNext: next });
  useAutoplay({
    enabled: state.isPlaying,
    interval: autoplayInterval,
    onTick: next,
    rootRef,
  });

  const canPrev = loop || state.activeIndex > 0;
  const canNext = loop || state.activeIndex < state.slidesCount - 1;

  return useMemo<CarouselApi>(
    () => ({
      activeIndex: state.activeIndex,
      slidesCount: state.slidesCount,
      isPlaying: state.isPlaying,
      canPrev,
      canNext,
      orientation,
      next,
      prev,
      goTo,
      play,
      pause,
      trackRef,
      rootRef,
    }),
    [state, canPrev, canNext, orientation, next, prev, goTo, play, pause],
  );
}
