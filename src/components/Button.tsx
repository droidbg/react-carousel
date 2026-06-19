import { useCarouselContext } from "../context/CarouselContext";
import { cx } from "../utils/cx";

export type ButtonDirection = "prev" | "next" | "first" | "last";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Navigation action this button controls. */
  dir: ButtonDirection;
}

const DEFAULT_LABELS: Record<ButtonDirection, string> = {
  prev: "Previous slide",
  next: "Next slide",
  first: "First slide",
  last: "Last slide",
};

/** Inline chevron icon so the core ships with zero icon dependencies. */
function Icon({ dir }: { dir: ButtonDirection }) {
  // first/last render a doubled chevron to read as "jump to end".
  const lines: Record<ButtonDirection, string[]> = {
    prev: ["15 18 9 12 15 6"],
    next: ["9 18 15 12 9 6"],
    first: ["18 18 12 12 18 6", "11 18 5 12 11 6"],
    last: ["13 18 19 12 13 6", "6 18 12 12 6 6"],
  };
  return (
    <svg
      className="rc-button__icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {lines[dir].map((points) => (
        <polyline key={points} points={points} />
      ))}
    </svg>
  );
}

/**
 * Navigation control. `prev`/`next` step one (overlaying the track edges);
 * `first`/`last` jump to the ends. Disables itself at the bounds when the
 * carousel is not looping, and falls back to a built-in icon + ARIA label.
 */
export function Button({
  dir,
  className,
  children,
  disabled,
  "aria-label": ariaLabel,
  ...rest
}: ButtonProps) {
  const { prev, next, goTo, slidesCount, canPrev, canNext } = useCarouselContext();

  const actions: Record<ButtonDirection, () => void> = {
    prev,
    next,
    first: () => goTo(0),
    last: () => goTo(slidesCount - 1),
  };
  // prev/first are blocked at the start; next/last at the end.
  const enabled = dir === "prev" || dir === "first" ? canPrev : canNext;

  return (
    <button
      type="button"
      className={cx("rc-button", `rc-button--${dir}`, className)}
      aria-label={ariaLabel ?? DEFAULT_LABELS[dir]}
      onClick={actions[dir]}
      disabled={disabled ?? !enabled}
      {...rest}
    >
      {children ?? <Icon dir={dir} />}
    </button>
  );
}
