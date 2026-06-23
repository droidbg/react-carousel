import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Carousel } from "../../src";

function renderCarousel(props?: { loop?: boolean }) {
  render(
    <Carousel slidesCount={3} label="Test" {...props}>
      <Carousel.Track>
        <Carousel.Slide index={0}>One</Carousel.Slide>
        <Carousel.Slide index={1}>Two</Carousel.Slide>
        <Carousel.Slide index={2}>Three</Carousel.Slide>
      </Carousel.Track>
    </Carousel>,
  );
  return screen.getByRole("region", { name: "Test" });
}

const activeText = () =>
  document.querySelector(".rc-slide--active")?.textContent;

describe("keyboard navigation", () => {
  it("ArrowRight advances to the next slide", () => {
    const region = renderCarousel();
    expect(activeText()).toBe("One");
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(activeText()).toBe("Two");
  });

  it("ArrowLeft does not move before the first slide without loop", () => {
    const region = renderCarousel();
    fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(activeText()).toBe("One");
  });

  it("Home / End jump to the first and last slide", () => {
    const region = renderCarousel();
    fireEvent.keyDown(region, { key: "End" });
    expect(activeText()).toBe("Three");
    fireEvent.keyDown(region, { key: "Home" });
    expect(activeText()).toBe("One");
  });

  it("the region is focusable and labelled as a carousel", () => {
    const region = renderCarousel();
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    expect(region).toHaveAttribute("tabindex", "0");
  });
});
