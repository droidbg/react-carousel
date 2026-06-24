import { useEffect, useState } from "react";
import { CarouselContext } from "../context/CarouselContext";
import { useCarousel } from "../core/useCarousel";
import { Button } from "../components/Button";
import { Dots } from "../components/Dots";
import { cx } from "../utils/cx";
import type { CSSProperties, ReactNode } from "react";

export interface CubeSlide {
  src: string;
  alt?: string;
  caption?: ReactNode;
}

export interface CubeSliderProps {
  slides: CubeSlide[];
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  /** Slide height in px. Default `460`. */
  height?: number;
  /** Spin on the vertical axis (rotateX) instead of horizontal (rotateY). */
  vertical?: boolean;
  /** Darken the side faces + cast a soft ground shadow. Default `true`. */
  shadow?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  label?: string;
}

/**
 * Cube preset — slides are the faces of a 3D cube; navigating rotates the cube
 * 90° to the next face. Like {@link SlicerSlider} it drives the headless
 * `useCarousel` directly and re-exposes it through context so the standard
 * `Carousel.Button` / `Carousel.Dots` work unchanged.
 *
 * Each face is transformed by its offset from the active slide
 * (`rotate(offset·90°) translateZ(depth)`); all faces share one transition, so
 * they orbit together as a rigid cube. `depth` is half the rotation-axis size,
 * measured from the viewport so the cube stays responsive.
 *
 * Needs both stylesheets: `react-carousel-latest/styles.css` and
 * `react-carousel-latest/presets.css`.
 */
export default function CubeSlider({
  slides,
  loop = true,
  autoplay = false,
  autoplayInterval,
  height = 460,
  vertical = false,
  shadow = true,
  showArrows = true,
  showDots = true,
  className,
  label = "Cube carousel",
}: CubeSliderProps) {
  const api = useCarousel({
    slidesCount: slides.length,
    loop,
    autoplay,
    autoplayInterval,
    orientation: vertical ? "vertical" : "horizontal",
  });
  const count = slides.length;

  // translateZ depth = half the rotation-axis extent: width for a horizontal
  // (rotateY) cube, height for a vertical (rotateX) one. Width is responsive,
  // so measure the viewport and feed it to CSS as --rc-cube-depth.
  const [depth, setDepth] = useState(0);
  useEffect(() => {
    const el = api.trackRef.current;
    if (!el) return;
    const measure = () => setDepth((vertical ? el.clientHeight : el.clientWidth) / 2);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [api.trackRef, vertical]);

  // Signed distance from the active face, taking the shorter way around a loop
  // so the wrap-around neighbour is treated as adjacent.
  const offsetOf = (i: number) => {
    let off = i - api.activeIndex;
    if (loop && count > 1) {
      if (off > count / 2) off -= count;
      else if (off < -count / 2) off += count;
    }
    return off;
  };

  return (
    <CarouselContext.Provider value={api}>
      <div
        ref={api.rootRef}
        className={cx("rc-cube", className)}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        data-orientation={vertical ? "vertical" : "horizontal"}
        data-shadow={shadow || undefined}
        style={
          {
            "--rc-image-height": `${height}px`,
            "--rc-cube-depth": `${depth}px`,
          } as CSSProperties
        }
      >
        <div ref={api.trackRef} className="rc-cube__viewport">
          <div className="rc-cube__cage">
            {slides.map((slide, i) => {
              const off = offsetOf(i);
              const active = off === 0;
              return (
                <div
                  key={i}
                  className="rc-cube__face"
                  data-active={active || undefined}
                  aria-hidden={!active || undefined}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  style={
                    {
                      "--off": off,
                      // Only the active face and its two neighbours form the cube.
                      visibility: Math.abs(off) <= 1 ? undefined : "hidden",
                      backgroundImage: `url(${slide.src})`,
                    } as CSSProperties
                  }
                >
                  {slide.caption != null && <div className="rc-cube__caption">{slide.caption}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {shadow && <div className="rc-cube__shadow" aria-hidden="true" />}
        {showArrows && <Button dir="prev" />}
        {showArrows && <Button dir="next" />}
        {showDots && <Dots />}
      </div>
    </CarouselContext.Provider>
  );
}
