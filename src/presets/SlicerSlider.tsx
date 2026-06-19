import { CarouselContext } from "../context/CarouselContext";
import { useCarousel } from "../core/useCarousel";
import { Button } from "../components/Button";
import { Dots } from "../components/Dots";
import { cx } from "../utils/cx";
import type { CSSProperties, ReactNode } from "react";

export interface SlicerSlide {
  src: string;
  alt?: string;
  caption?: ReactNode;
}

export interface SlicerSliderProps {
  slides: SlicerSlide[];
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  /** Slide height in px (the slice maths needs a fixed height). Default `460`. */
  height?: number;
  /** Number of horizontal strips the image is sliced into. Default `6`. */
  slices?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  label?: string;
}

/**
 * Slicer preset — transitions between slides with a staggered horizontal-slice
 * wipe. Uses the headless `useCarousel` hook directly (the transition isn't a
 * sliding track) and re-exposes it through context so the standard
 * `Carousel.Button` / `Carousel.Dots` work unchanged.
 *
 * Needs both stylesheets: `react-carousel-latest/styles.css` and
 * `react-carousel-latest/presets.css`.
 */
export default function SlicerSlider({
  slides,
  loop = true,
  autoplay = false,
  autoplayInterval,
  height = 460,
  slices = 6,
  showArrows = true,
  showDots = true,
  className,
  label = "Slicer carousel",
}: SlicerSliderProps) {
  const api = useCarousel({ slidesCount: slides.length, loop, autoplay, autoplayInterval });
  const strips = Array.from({ length: slices }, (_, k) => k);

  return (
    <CarouselContext.Provider value={api}>
      <div
        ref={api.rootRef}
        className={cx("rc-slicer", className)}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        style={
          { "--rc-image-height": `${height}px`, "--rc-slices": slices } as CSSProperties
        }
      >
        <div ref={api.trackRef} className="rc-slicer__viewport">
          {slides.map((slide, i) => {
            const active = i === api.activeIndex;
            return (
              <div
                key={i}
                className="rc-slicer__slide"
                data-active={active || undefined}
                aria-hidden={!active || undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
              >
                {strips.map((k) => (
                  <span
                    key={k}
                    className="rc-slicer__strip"
                    style={{ "--k": k, backgroundImage: `url(${slide.src})` } as CSSProperties}
                  />
                ))}
                {slide.caption != null && <div className="rc-slicer__caption">{slide.caption}</div>}
              </div>
            );
          })}
        </div>

        {showArrows && <Button dir="prev" />}
        {showArrows && <Button dir="next" />}
        {showDots && <Dots />}
      </div>
    </CarouselContext.Provider>
  );
}
