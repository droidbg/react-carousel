import { forwardRef, useImperativeHandle } from "react";
import { CarouselContext } from "../context/CarouselContext";
import { useCarousel } from "../core/useCarousel";
import { cx } from "../utils/cx";
import type { CSSProperties } from "react";
import type { CarouselHandle, CarouselOptions } from "../core/types";

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
 *
 * A `ref` exposes an imperative {@link CarouselHandle} (`next`/`prev`/`goTo`/
 * `play`/`pause`) for driving the carousel from a parent.
 */
export const Carousel = forwardRef<CarouselHandle, CarouselProps>(function Carousel(
  {
    slidesCount,
    initialIndex,
    loop,
    autoplay,
    autoplayInterval,
    slidesToScroll,
    slidesPerView,
    breakpoints,
    orientation = "horizontal",
    onIndexChange,
    onSettle,
    onSwipeStart,
    onSwipeEnd,
    label = "Carousel",
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const api = useCarousel({
    slidesCount,
    initialIndex,
    loop,
    autoplay,
    autoplayInterval,
    slidesToScroll,
    slidesPerView,
    breakpoints,
    orientation,
    onIndexChange,
    onSettle,
    onSwipeStart,
    onSwipeEnd,
  });

  useImperativeHandle(
    ref,
    (): CarouselHandle => ({
      activeIndex: api.activeIndex,
      canPrev: api.canPrev,
      canNext: api.canNext,
      next: api.next,
      prev: api.prev,
      goTo: api.goTo,
      play: api.play,
      pause: api.pause,
    }),
    [api],
  );

  // Size each slide to fit `slidesPerView` per view. The explicit value wins
  // over any themed --rc-slide-size; other consumer style props are preserved.
  const sizedStyle: CSSProperties | undefined =
    api.slidesPerView > 1
      ? ({
          ...style,
          "--rc-slide-size": `calc((100% - ${api.slidesPerView - 1} * var(--rc-slide-gap)) / ${api.slidesPerView})`,
        } as CSSProperties)
      : style;

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
        style={sizedStyle}
        {...rest}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
