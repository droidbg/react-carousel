import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CubeSlider } from "../../src";

const slides = [
  { src: "/a.jpg", alt: "A", caption: "Cap A" },
  { src: "/b.jpg", alt: "B" },
  { src: "/c.jpg", alt: "C" },
];

describe("CubeSlider", () => {
  it("renders one face per slide", () => {
    const { container } = render(<CubeSlider slides={slides} />);
    expect(container.querySelectorAll(".rc-cube__face")).toHaveLength(3);
  });

  it("renders prev/next arrows and dots", () => {
    render(<CubeSlider slides={slides} />);
    expect(screen.getByLabelText("Previous slide")).toBeInTheDocument();
    expect(screen.getByLabelText("Next slide")).toBeInTheDocument();
    expect(document.querySelectorAll(".rc-dot")).toHaveLength(3);
  });

  it("marks the active face and advances on next", () => {
    const { container } = render(<CubeSlider slides={slides} />);
    const faces = () => Array.from(container.querySelectorAll(".rc-cube__face"));
    expect(faces()[0]).toHaveAttribute("data-active", "true");
    fireEvent.click(screen.getByLabelText("Next slide"));
    expect(faces()[1]).toHaveAttribute("data-active", "true");
    expect(faces()[0]).not.toHaveAttribute("data-active");
  });

  it("renders a caption when provided", () => {
    render(<CubeSlider slides={slides} />);
    expect(screen.getByText("Cap A")).toBeInTheDocument();
  });

  it("switches axis with the vertical prop", () => {
    render(<CubeSlider slides={slides} vertical />);
    expect(screen.getByRole("region")).toHaveAttribute("data-orientation", "vertical");
  });

  it("omits arrows/dots when disabled", () => {
    render(<CubeSlider slides={slides} showArrows={false} showDots={false} />);
    expect(screen.queryByLabelText("Next slide")).not.toBeInTheDocument();
    expect(document.querySelectorAll(".rc-dot")).toHaveLength(0);
  });
});
