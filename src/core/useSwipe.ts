import { useEffect, useRef } from "react";
import type { Orientation } from "./types";

interface SwipeParams {
  trackRef: React.RefObject<HTMLElement | null>;
  orientation: Orientation;
  onPrev: () => void;
  onNext: () => void;
  /** Minimum drag distance (px) to commit a slide change. Default `50`. */
  threshold?: number;
}

/**
 * Pointer-based swipe/drag navigation.
 *
 * While dragging we write the live offset to the `--rc-drag` custom property
 * and flag `data-dragging` on the track, so the content follows the finger
 * without React re-renders (the stylesheet disables the transition during a
 * drag). On release we reset the offset and, if the threshold was crossed,
 * commit a navigation — React then animates to the new index.
 */
export function useSwipe({
  trackRef,
  orientation,
  onPrev,
  onNext,
  threshold = 50,
}: SwipeParams): void {
  const handlers = useRef({ onPrev, onNext });
  handlers.current = { onPrev, onNext };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const isHorizontal = orientation === "horizontal";
    let startPos = 0;
    let delta = 0;
    let dragging = false;
    let frame = 0;

    const axis = (event: PointerEvent) => (isHorizontal ? event.clientX : event.clientY);

    const paint = () => {
      frame = 0;
      track.style.setProperty("--rc-drag", `${delta}px`);
    };

    const onPointerDown = (event: PointerEvent) => {
      // Ignore secondary buttons; only start on primary pointer.
      if (event.button !== 0) return;
      dragging = true;
      startPos = axis(event);
      delta = 0;
      track.setAttribute("data-dragging", "true");
      track.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      delta = axis(event) - startPos;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (frame) window.cancelAnimationFrame(frame), (frame = 0);
      track.removeAttribute("data-dragging");
      track.style.setProperty("--rc-drag", "0px");
      if (track.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }
      if (Math.abs(delta) > threshold) {
        // Dragging the content toward the start reveals the next slide.
        delta < 0 ? handlers.current.onNext() : handlers.current.onPrev();
      }
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
    };
  }, [trackRef, orientation, threshold]);
}
