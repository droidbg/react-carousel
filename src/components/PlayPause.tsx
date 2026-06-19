import { useCarouselContext } from "../context/CarouselContext";
import { cx } from "../utils/cx";

export interface PlayPauseProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {}

/** Inline play (triangle) / pause (bars) icon — no icon dependency. */
function Icon({ playing }: { playing: boolean }) {
  return (
    <svg
      className="rc-button__icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {playing ? (
        <>
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </>
      ) : (
        <polygon points="7 4 20 12 7 20 7 4" />
      )}
    </svg>
  );
}

/**
 * Toggles autoplay. Reflects state via `aria-pressed` and swaps the label
 * between "Play"/"Pause".
 */
export function PlayPause({ className, children, "aria-label": ariaLabel, ...rest }: PlayPauseProps) {
  const { isPlaying, play, pause } = useCarouselContext();

  return (
    <button
      type="button"
      className={cx("rc-button", "rc-button--playpause", className)}
      aria-label={ariaLabel ?? (isPlaying ? "Pause" : "Play")}
      aria-pressed={isPlaying}
      onClick={isPlaying ? pause : play}
      {...rest}
    >
      {children ?? <Icon playing={isPlaying} />}
    </button>
  );
}
