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
  switch (action.type) {
    case "NEXT": {
      const target = state.activeIndex + action.step;
      const next = action.loop
        ? wrapIndex(target, state.slidesCount)
        : clamp(target, 0, state.slidesCount - 1);
      return next === state.activeIndex ? state : { ...state, activeIndex: next };
    }
    case "PREV": {
      const target = state.activeIndex - action.step;
      const next = action.loop
        ? wrapIndex(target, state.slidesCount)
        : clamp(target, 0, state.slidesCount - 1);
      return next === state.activeIndex ? state : { ...state, activeIndex: next };
    }
    case "GO_TO": {
      const next = clamp(action.index, 0, state.slidesCount - 1);
      return next === state.activeIndex ? state : { ...state, activeIndex: next };
    }
    case "SET_COUNT": {
      if (action.slidesCount === state.slidesCount) return state;
      // Keep the active slide valid if the collection shrank.
      const activeIndex = clamp(state.activeIndex, 0, action.slidesCount - 1);
      return { ...state, slidesCount: action.slidesCount, activeIndex };
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
