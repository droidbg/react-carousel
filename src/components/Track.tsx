import { useCarouselContext } from "../context/CarouselContext";
import { cx } from "../utils/cx";
import type { CSSProperties } from "react";

export interface TrackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * The clipping viewport plus the moving track. The track is translated by
 * `--rc-active-index` (set here) combined with the live `--rc-drag` offset that
 * {@link useSwipe} writes during a gesture — all resolved in CSS.
 */
export function Track({ children, className, style, ...rest }: TrackProps) {
  const { activeIndex, isPlaying, orientation, trackRef } = useCarouselContext();

  return (
    <div
      className="rc-viewport"
      data-orientation={orientation}
      // Pause announcements while autoplaying; announce on manual navigation.
      aria-live={isPlaying ? "off" : "polite"}
    >
      <div
        ref={trackRef}
        className={cx("rc-track", className)}
        data-orientation={orientation}
        style={{ "--rc-active-index": activeIndex, ...style } as CSSProperties}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
}
