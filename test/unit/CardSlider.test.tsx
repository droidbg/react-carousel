import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CardSlider from "../../src";

const slides = [
  { title: "Aurora", category: "Sky", description: "Northern lights." },
  { title: "Desert", category: "Land", description: "Golden dunes." },
  { title: "Ocean", category: "Sea", description: "Deep and calm." },
];

describe("CardSlider", () => {
  beforeAll(() => {
    // jsdom doesn't implement scrollBy; stub it so the arrow handler can run.
    Element.prototype.scrollBy = vi.fn();
  });

  it("renders one card per slide", () => {
    render(<CardSlider shape="star" slides={slides} />);
    for (const s of slides) expect(screen.getByText(s.title)).toBeInTheDocument();
  });

  it("renders labelled prev/next arrows", () => {
    render(<CardSlider shape="star" slides={slides} />);
    expect(screen.getByLabelText("Scroll left")).toBeInTheDocument();
    expect(screen.getByLabelText("Scroll right")).toBeInTheDocument();
  });

  it("scrolls the track when the next arrow is clicked", () => {
    render(<CardSlider shape="star" slides={slides} />);
    (Element.prototype.scrollBy as ReturnType<typeof vi.fn>).mockClear();
    fireEvent.click(screen.getByLabelText("Scroll right"));
    expect(Element.prototype.scrollBy).toHaveBeenCalledTimes(1);
  });

  it("wraps a card in a link when `link` is provided", () => {
    render(
      <CardSlider
        shape="star"
        slides={[{ title: "Linked", category: "X", description: "y", link: "https://example.com" }]}
      />,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});
