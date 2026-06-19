import { useCarouselContext } from "../context/CarouselContext";
import { cx } from "../utils/cx";

export interface DotsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible label for a given dot. Default `"Go to slide N"`. */
  dotLabel?: (index: number) => string;
}

/** Clickable pagination indicators, one per slide. */
export function Dots({ className, dotLabel, ...rest }: DotsProps) {
  const { slidesCount, activeIndex, goTo } = useCarouselContext();

  return (
    <div className={cx("rc-dots", className)} role="tablist" {...rest}>
      {Array.from({ length: slidesCount }, (_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-current={isActive || undefined}
            aria-label={dotLabel ? dotLabel(index) : `Go to slide ${index + 1}`}
            className={cx("rc-dot", isActive && "rc-dot--active")}
            onClick={() => goTo(index)}
          />
        );
      })}
    </div>
  );
}
