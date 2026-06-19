import { Carousel } from "../components";
import { cx } from "../utils/cx";
import type { CSSProperties, ReactNode } from "react";

export interface ImageSlide {
  /** Image URL (used as a full-bleed background). */
  src: string;
  /** Accessible description of the image. */
  alt?: string;
  /** Optional overlay caption, centered on the slide. */
  caption?: ReactNode;
  /** When set, the slide links out. */
  href?: string;
}

export interface ImageSliderProps {
  slides: ImageSlide[];
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  /** Slide height (px number or any CSS length). Default `460`. */
  height?: number | string;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  label?: string;
}

/**
 * Image preset — a full-bleed image carousel with an optional centered caption,
 * thin overlaid arrows, and overlaid pagination dots. Built on the headless
 * `Carousel`, so keyboard / swipe / autoplay come for free.
 *
 * Needs both stylesheets: `react-carousel-latest/styles.css` and
 * `react-carousel-latest/presets.css`.
 */
export default function ImageSlider({
  slides,
  loop = true,
  autoplay = false,
  autoplayInterval,
  height = 460,
  showArrows = true,
  showDots = true,
  className,
  label = "Image carousel",
}: ImageSliderProps) {
  return (
    <Carousel
      slidesCount={slides.length}
      loop={loop}
      autoplay={autoplay}
      autoplayInterval={autoplayInterval}
      label={label}
      className={cx("rc-image", className)}
      style={
        {
          "--rc-image-height": typeof height === "number" ? `${height}px` : height,
        } as CSSProperties
      }
    >
      {showArrows && <Carousel.Button dir="prev" />}
      <Carousel.Track>
        {slides.map((slide, i) => {
          const inner = (
            <div
              className="rc-image__slide"
              style={{ backgroundImage: `url(${slide.src})` }}
              role="img"
              aria-label={slide.alt}
            >
              {slide.caption != null && <div className="rc-image__caption">{slide.caption}</div>}
            </div>
          );
          return (
            <Carousel.Slide key={i} index={i}>
              {slide.href ? (
                <a className="rc-image__link" href={slide.href} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </Carousel.Slide>
          );
        })}
      </Carousel.Track>
      {showArrows && <Carousel.Button dir="next" />}
      {showDots && <Carousel.Dots />}
    </Carousel>
  );
}
