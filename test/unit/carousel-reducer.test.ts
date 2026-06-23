import { describe, it, expect } from "vitest";
import { carouselReducer } from "../../src/core/carouselReducer";
import type { CarouselState } from "../../src/core/types";

const base: CarouselState = { activeIndex: 0, slidesCount: 3, isPlaying: false };

describe("carouselReducer", () => {
  it("NEXT advances by the given step", () => {
    expect(carouselReducer(base, { type: "NEXT", step: 1, loop: false }).activeIndex).toBe(1);
    expect(carouselReducer(base, { type: "NEXT", step: 2, loop: false }).activeIndex).toBe(2);
  });

  it("NEXT clamps at the last slide without loop (and returns the same state)", () => {
    const atEnd: CarouselState = { ...base, activeIndex: 2 };
    // No change → same reference, so React can bail out of a re-render.
    expect(carouselReducer(atEnd, { type: "NEXT", step: 1, loop: false })).toBe(atEnd);
  });

  it("NEXT wraps to the start with loop", () => {
    const atEnd: CarouselState = { ...base, activeIndex: 2 };
    expect(carouselReducer(atEnd, { type: "NEXT", step: 1, loop: true }).activeIndex).toBe(0);
  });

  it("PREV wraps to the end with loop", () => {
    expect(carouselReducer(base, { type: "PREV", step: 1, loop: true }).activeIndex).toBe(2);
  });

  it("PREV clamps at the first slide without loop", () => {
    expect(carouselReducer(base, { type: "PREV", step: 1, loop: false })).toBe(base);
  });

  it("GO_TO clamps the requested index into range", () => {
    expect(carouselReducer(base, { type: "GO_TO", index: 99 }).activeIndex).toBe(2);
    expect(carouselReducer(base, { type: "GO_TO", index: -5 }).activeIndex).toBe(0);
  });

  it("SET_COUNT keeps the active index valid when the collection shrinks", () => {
    const atEnd: CarouselState = { ...base, activeIndex: 2 };
    const next = carouselReducer(atEnd, { type: "SET_COUNT", slidesCount: 1 });
    expect(next.slidesCount).toBe(1);
    expect(next.activeIndex).toBe(0);
  });

  it("SET_PLAYING toggles isPlaying", () => {
    expect(carouselReducer(base, { type: "SET_PLAYING", isPlaying: true }).isPlaying).toBe(true);
  });
});
