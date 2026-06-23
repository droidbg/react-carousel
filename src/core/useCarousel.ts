import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { carouselReducer } from "./carouselReducer";
import { useAutoplay } from "./useAutoplay";
import { useBreakpoints } from "./useBreakpoints";
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
    slidesPerView = 1,
    breakpoints,
    orientation = "horizontal",
    onIndexChange,
    onSettle,
    onSwipeStart,
    onSwipeEnd,
  } = options;

  // Resolve responsive slidesPerView / slidesToScroll for the current viewport.
  const effective = useBreakpoints({ slidesPerView, slidesToScroll }, breakpoints);

  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(
    carouselReducer,
    undefined,
    (): CarouselState => ({
      activeIndex: clamp(initialIndex, 0, Math.max(0, slidesCount - slidesPerView)),
      slidesCount,
      slidesPerView,
      isPlaying: autoplay,
    }),
  );

  // Keep the active index valid when the slide collection changes size.
  useEffect(() => {
    dispatch({ type: "SET_COUNT", slidesCount });
  }, [slidesCount]);

  // Sync the resolved slides-per-view (breakpoint changes) into the reducer.
  useEffect(() => {
    dispatch({ type: "SET_SLIDES_PER_VIEW", slidesPerView: effective.slidesPerView });
  }, [effective.slidesPerView]);

  // Notify consumers of index changes without re-arming on every render.
  const onIndexChangeRef = useRef(onIndexChange);
  onIndexChangeRef.current = onIndexChange;
  useEffect(() => {
    onIndexChangeRef.current?.(state.activeIndex);
  }, [state.activeIndex]);

  // Fire onSettle when the track's transform transition finishes.
  const onSettleRef = useRef(onSettle);
  onSettleRef.current = onSettle;
  const indexRef = useRef(state.activeIndex);
  indexRef.current = state.activeIndex;
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handle = (event: TransitionEvent) => {
      if (event.target === track && event.propertyName === "transform") {
        onSettleRef.current?.(indexRef.current);
      }
    };
    track.addEventListener("transitionend", handle);
    return () => track.removeEventListener("transitionend", handle);
  }, []);

  const step = effective.slidesToScroll;
  const next = useCallback(
    () => dispatch({ type: "NEXT", step, loop }),
    [step, loop],
  );
  const prev = useCallback(
    () => dispatch({ type: "PREV", step, loop }),
    [step, loop],
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
  useSwipe({ trackRef, orientation, onPrev: prev, onNext: next, onSwipeStart, onSwipeEnd });
  useAutoplay({
    enabled: state.isPlaying,
    interval: autoplayInterval,
    onTick: next,
    rootRef,
  });

  const maxIndex = Math.max(0, state.slidesCount - state.slidesPerView);
  const canPrev = loop || state.activeIndex > 0;
  const canNext = loop || state.activeIndex < maxIndex;

  return useMemo<CarouselApi>(
    () => ({
      activeIndex: state.activeIndex,
      slidesCount: state.slidesCount,
      slidesPerView: state.slidesPerView,
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
