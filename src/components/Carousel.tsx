import { CarouselContext } from "../context/CarouselContext";
import { useCarousel } from "../core/useCarousel";
import { cx } from "../utils/cx";
import type { CarouselOptions } from "../core/types";

export interface CarouselProps
  extends CarouselOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Accessible name for the carousel region. Default `"Carousel"`. */
  label?: string;
  children: React.ReactNode;
}

/**
 * Root of the compound carousel. Owns navigation state via {@link useCarousel}
 * and exposes it to `Carousel.Track`, `Carousel.Slide`, `Carousel.Button`, and
 * `Carousel.Dots` through context.
 */
export function Carousel({
  slidesCount,
  initialIndex,
  loop,
  autoplay,
  autoplayInterval,
  slidesToScroll,
  orientation = "horizontal",
  onIndexChange,
  label = "Carousel",
  className,
  children,
  ...rest
}: CarouselProps) {
  const api = useCarousel({
    slidesCount,
    initialIndex,
    loop,
    autoplay,
    autoplayInterval,
    slidesToScroll,
    orientation,
    onIndexChange,
  });

  return (
    <CarouselContext.Provider value={api}>
      <div
        ref={api.rootRef}
        className={cx("rc-root", className)}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        data-orientation={orientation}
        tabIndex={0}
        {...rest}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}
