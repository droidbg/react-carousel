import { useEffect, useState } from "react";
import type { ResponsiveOptions } from "./types";

type Resolved = Required<ResponsiveOptions>;

/**
 * Resolves the active responsive config from a `breakpoints` map keyed by
 * min-width (px) — the largest matching breakpoint wins, merged over `base`.
 *
 * SSR-safe: returns `base` on the server and until mounted, then reconciles on
 * the client and updates on viewport resize. When no breakpoints are given it
 * returns `base` unchanged (no listeners attached).
 */
export function useBreakpoints(
  base: Resolved,
  breakpoints?: Record<number, ResponsiveOptions>,
): Resolved {
  const [resolved, setResolved] = useState<Resolved>(base);

  // Stable dependency for an object that's often passed inline.
  const bpKey = breakpoints ? JSON.stringify(breakpoints) : "";

  useEffect(() => {
    if (!breakpoints || typeof window === "undefined") return;

    const resolve = (): Resolved => {
      const next = { ...base };
      for (const width of Object.keys(breakpoints).map(Number).sort((a, b) => a - b)) {
        if (window.matchMedia(`(min-width: ${width}px)`).matches) {
          const over = breakpoints[width];
          if (over.slidesPerView != null) next.slidesPerView = over.slidesPerView;
          if (over.slidesToScroll != null) next.slidesToScroll = over.slidesToScroll;
        }
      }
      return next;
    };

    const update = () => setResolved(resolve());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // base is read via its primitive fields; bpKey captures breakpoints.
  }, [bpKey, base.slidesPerView, base.slidesToScroll]);

  return breakpoints ? resolved : base;
}
