import { describe, it, expect, vi } from "vitest";
import { createRef } from "react";
import { render, screen, act } from "@testing-library/react";
import { Carousel } from "../../src";
import type { CarouselHandle } from "../../src";

function Slides({ n }: { n: number }) {
  return (
    <Carousel.Track>
      {Array.from({ length: n }, (_, i) => (
        <Carousel.Slide key={i} index={i}>{`Slide ${i + 1}`}</Carousel.Slide>
      ))}
    </Carousel.Track>
  );
}

const activeText = () => document.querySelector(".rc-slide--active")?.textContent;

describe("imperative ref handle", () => {
  it("drives navigation from a parent ref", () => {
    const ref = createRef<CarouselHandle>();
    render(
      <Carousel ref={ref} slidesCount={3} label="Test">
        <Slides n={3} />
      </Carousel>,
    );
    expect(activeText()).toBe("Slide 1");
    act(() => ref.current!.next());
    expect(activeText()).toBe("Slide 2");
    act(() => ref.current!.goTo(2));
    expect(activeText()).toBe("Slide 3");
    expect(ref.current!.canNext).toBe(false);
    act(() => ref.current!.prev());
    expect(activeText()).toBe("Slide 2");
  });
});

describe("slidesPerView", () => {
  it("sets --rc-slide-size on the root from slidesPerView", () => {
    render(
      <Carousel slidesCount={6} slidesPerView={3} label="Test">
        <Slides n={6} />
      </Carousel>,
    );
    const root = screen.getByRole("region", { name: "Test" });
    const size = root.style.getPropertyValue("--rc-slide-size");
    expect(size).toContain("/ 3)");
    expect(size).toContain("var(--rc-slide-gap)");
  });

  it("does not over-scroll past the last full view", () => {
    const ref = createRef<CarouselHandle>();
    render(
      <Carousel ref={ref} slidesCount={5} slidesPerView={2} label="Test">
        <Slides n={5} />
      </Carousel>,
    );
    // maxIndex = 5 - 2 = 3
    act(() => ref.current!.goTo(99));
    expect(activeText()).toBe("Slide 4"); // index 3
    expect(ref.current!.canNext).toBe(false);
  });
});

describe("onSettle", () => {
  it("fires with the active index when the transform transition ends", () => {
    const onSettle = vi.fn();
    const ref = createRef<CarouselHandle>();
    render(
      <Carousel ref={ref} slidesCount={3} label="Test" onSettle={onSettle}>
        <Slides n={3} />
      </Carousel>,
    );
    act(() => ref.current!.next());
    const track = document.querySelector(".rc-track") as HTMLElement;
    const event = new Event("transitionend");
    Object.defineProperty(event, "propertyName", { value: "transform" });
    act(() => {
      track.dispatchEvent(event);
    });
    expect(onSettle).toHaveBeenCalledWith(1);
  });

  it("ignores transitions of other properties", () => {
    const onSettle = vi.fn();
    render(
      <Carousel slidesCount={3} label="Test" onSettle={onSettle}>
        <Slides n={3} />
      </Carousel>,
    );
    const track = document.querySelector(".rc-track") as HTMLElement;
    const event = new Event("transitionend");
    Object.defineProperty(event, "propertyName", { value: "opacity" });
    act(() => {
      track.dispatchEvent(event);
    });
    expect(onSettle).not.toHaveBeenCalled();
  });
});
