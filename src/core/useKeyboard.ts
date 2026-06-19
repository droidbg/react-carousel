import { useEffect, useRef } from "react";
import type { Orientation } from "./types";

interface KeyboardParams {
  rootRef: React.RefObject<HTMLElement | null>;
  orientation: Orientation;
  onPrev: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
}

/**
 * Wires arrow-key navigation (plus Home/End) onto the region element. The axis
 * of the relevant arrow keys follows {@link Orientation}.
 */
export function useKeyboard({
  rootRef,
  orientation,
  onPrev,
  onNext,
  onFirst,
  onLast,
}: KeyboardParams): void {
  // Stash handlers in a ref so the listener is attached only once per element.
  const handlers = useRef({ onPrev, onNext, onFirst, onLast });
  handlers.current = { onPrev, onNext, onFirst, onLast };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
    const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";

    const onKeyDown = (event: KeyboardEvent) => {
      const { onPrev, onNext, onFirst, onLast } = handlers.current;
      switch (event.key) {
        case prevKey:
          event.preventDefault();
          onPrev();
          break;
        case nextKey:
          event.preventDefault();
          onNext();
          break;
        case "Home":
          event.preventDefault();
          onFirst();
          break;
        case "End":
          event.preventDefault();
          onLast();
          break;
      }
    };

    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [rootRef, orientation]);
}
