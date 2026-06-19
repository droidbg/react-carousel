import { useCarouselContext } from "../context/CarouselContext";
import { cx } from "../utils/cx";

export interface SlideProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Zero-based position of this slide. Required so the slide can label itself
   * for assistive tech and report whether it is the active one.
   */
  index: number;
  children: React.ReactNode;
}

/** A single slide. Sizing is governed by the `--rc-slide-size` CSS variable. */
export function Slide({ index, children, className, ...rest }: SlideProps) {
  const { activeIndex, slidesCount } = useCarouselContext();
  const isActive = index === activeIndex;

  return (
    <div
      className={cx("rc-slide", isActive && "rc-slide--active", className)}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${slidesCount}`}
      aria-hidden={!isActive || undefined}
      data-active={isActive || undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
