import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card, { type CardVariant } from "./Card";
import { getPalettes } from "./gradient";
import type { ShapeOption } from "./Blobs";

export interface CardSliderSlide {
  title: string;
  category: string;
  description: string;
  /** When provided, the card becomes a link opened on click. */
  link?: string;
}

export interface CardSliderProps {
  slides: CardSliderSlide[];
  shape: ShapeOption;
  /** Randomise palette assignment across cards. Default `false`. */
  randomBackground?: boolean;
  /** Card design preset. Default `"gradient"`. */
  variant?: CardVariant;
}

/**
 * Card preset — a horizontal, native-scroll row of decorated cards. Also the
 * default export of the package. Styling is framework-free (no Tailwind), and
 * the `variant` prop selects a card design.
 */
export default function CardSlider({
  slides,
  shape,
  randomBackground = false,
  variant = "gradient",
}: CardSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollByHalf = (direction: 1 | -1) => {
    const el = sliderRef.current;
    if (el) {
      el.scrollBy({ left: (direction * el.clientWidth) / 2, behavior: "smooth" });
    }
  };

  const palettes = getPalettes(randomBackground);

  return (
    <div className="rc-cardslider">
      <div className="rc-cardslider__overlay rc-cardslider__overlay--left" />
      <div className="rc-cardslider__overlay rc-cardslider__overlay--right" />

      <button
        type="button"
        className="rc-cardslider__arrow rc-cardslider__arrow--left"
        aria-label="Scroll left"
        onClick={() => scrollByHalf(-1)}
      >
        <ChevronLeft />
      </button>

      <div ref={sliderRef} className="rc-cardslider__track">
        {slides.map((slide, index) => {
          const palette = palettes[index % palettes.length];
          const card = (
            <Card
              title={slide.title}
              category={slide.category}
              description={slide.description}
              from={palette.from}
              to={palette.to}
              shape={shape}
              variant={variant}
            />
          );
          return (
            <div className="rc-cardslider__item" key={slide.title + index}>
              {slide.link ? (
                <a href={slide.link} target="_blank" rel="noreferrer">
                  {card}
                </a>
              ) : (
                card
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="rc-cardslider__arrow rc-cardslider__arrow--right"
        aria-label="Scroll right"
        onClick={() => scrollByHalf(1)}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
