import type { CarouselAction, CarouselState } from "./types";
import { clamp, wrapIndex } from "../utils/clamp";

/**
 * Pure reducer for carousel navigation. All index math (clamping, looping,
 * step size) lives here so the behaviour is deterministic and unit-testable
 * in isolation from React.
 */
export function carouselReducer(
  state: CarouselState,
  action: CarouselAction,
): CarouselState {
  // Furthest index that still keeps a full view on screen. With
  // slidesPerView > 1 this stops the last slide being scrolled past alone.
  const maxIndex = Math.max(0, state.slidesCount - state.slidesPerView);

  switch (action.type) {
    case "NEXT": {
      const target = state.activeIndex + action.step;
      const next = action.loop
        ? wrapIndex(target, state.slidesCount)
        : clamp(target, 0, maxIndex);
      return next === state.activeIndex ? state : { ...state, activeIndex: next };
    }
    case "PREV": {
      const target = state.activeIndex - action.step;
      const next = action.loop
        ? wrapIndex(target, state.slidesCount)
        : clamp(target, 0, maxIndex);
      return next === state.activeIndex ? state : { ...state, activeIndex: next };
    }
    case "GO_TO": {
      const next = clamp(action.index, 0, maxIndex);
      return next === state.activeIndex ? state : { ...state, activeIndex: next };
    }
    case "SET_COUNT": {
      if (action.slidesCount === state.slidesCount) return state;
      // Keep the active slide valid if the collection shrank.
      const activeIndex = clamp(state.activeIndex, 0, Math.max(0, action.slidesCount - state.slidesPerView));
      return { ...state, slidesCount: action.slidesCount, activeIndex };
    }
    case "SET_SLIDES_PER_VIEW": {
      if (action.slidesPerView === state.slidesPerView) return state;
      const activeIndex = clamp(state.activeIndex, 0, Math.max(0, state.slidesCount - action.slidesPerView));
      return { ...state, slidesPerView: action.slidesPerView, activeIndex };
    }
    case "SET_PLAYING": {
      return action.isPlaying === state.isPlaying
        ? state
        : { ...state, isPlaying: action.isPlaying };
    }
    default:
      return state;
  }
}
