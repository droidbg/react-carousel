import { useEffect, useRef } from "react";

interface AutoplayParams {
  /** Whether the timer should be active. */
  enabled: boolean;
  /** Tick interval in milliseconds. */
  interval: number;
  /** Called on each tick (typically advances to the next slide). */
  onTick: () => void;
  /** Region element; autoplay pauses while it is hovered or focused. */
  rootRef: React.RefObject<HTMLElement | null>;
}

/**
 * Drives autoplay. Pauses on pointer hover, keyboard focus, and tab
 * backgrounding, and never starts when the user prefers reduced motion.
 */
export function useAutoplay({ enabled, interval, onTick, rootRef }: AutoplayParams): void {
  // Keep the latest callback without re-arming the interval every render.
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const root = rootRef.current;
    let paused = false;
    const pause = () => (paused = true);
    const resume = () => (paused = false);

    const timer = window.setInterval(() => {
      if (!paused && !document.hidden) onTickRef.current();
    }, interval);

    root?.addEventListener("pointerenter", pause);
    root?.addEventListener("pointerleave", resume);
    root?.addEventListener("focusin", pause);
    root?.addEventListener("focusout", resume);

    return () => {
      window.clearInterval(timer);
      root?.removeEventListener("pointerenter", pause);
      root?.removeEventListener("pointerleave", resume);
      root?.removeEventListener("focusin", pause);
      root?.removeEventListener("focusout", resume);
    };
  }, [enabled, interval, rootRef]);
}
