import { describe, it, expect, afterEach } from "vitest";
import { render } from "@testing-library/react";
import CardSlider from "../../src";
// The stylesheet under test. In browser mode Vite applies it for real, so
// getBoundingClientRect returns true layout coordinates.
import "../../src/presets/presets.css";

const slides = [
  { title: "Aurora", category: "Sky", description: "Northern lights." },
  { title: "Desert", category: "Land", description: "Golden dunes." },
  { title: "Ocean", category: "Sea", description: "Deep and calm." },
];

afterEach(() => {
  document.body.innerHTML = "";
});

/**
 * Regression guard for the arrow-alignment bug: in a centered, full-height host
 * (the kind of shell CRA/Vite templates generate), the arrows must stay
 * vertically centered on the card row — not drift to the bottom.
 */
describe("CardSlider layout", () => {
  it("keeps the arrows centered on the cards inside a centered, tall host", () => {
    document.body.style.margin = "0";
    const host = document.createElement("div");
    host.style.cssText =
      "min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center";
    document.body.appendChild(host);

    render(<CardSlider shape="star" variant="glass" slides={slides} />, { container: host });

    const leftArrow = host.querySelector(".rc-cardslider__arrow--left") as HTMLElement;
    const rightArrow = host.querySelector(".rc-cardslider__arrow--right") as HTMLElement;
    const card = host.querySelector(".rc-card") as HTMLElement;
    expect(leftArrow && rightArrow && card).toBeTruthy();

    const center = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.top + r.height / 2;
    };
    const cardCenter = center(card);
    // Each arrow's vertical center should sit within a few px of the card's.
    expect(Math.abs(center(leftArrow) - cardCenter)).toBeLessThan(8);
    expect(Math.abs(center(rightArrow) - cardCenter)).toBeLessThan(8);
  });
});
