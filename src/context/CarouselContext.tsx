import { createContext, useContext } from "react";
import type { CarouselApi } from "../core/types";

/**
 * Holds the live {@link CarouselApi} for the compound components. `null` is the
 * default so we can detect (and loudly reject) usage outside `<Carousel>`.
 */
export const CarouselContext = createContext<CarouselApi | null>(null);

/**
 * Read the carousel API from context. Throws a descriptive error when a part
 * (`Carousel.Track`, `Carousel.Slide`, …) is rendered outside a `<Carousel>`.
 */
export function useCarouselContext(): CarouselApi {
  const api = useContext(CarouselContext);
  if (api === null) {
    throw new Error(
      "Carousel compound components must be rendered inside <Carousel>. " +
        "Did you forget to wrap them, or import the part from a different package version?",
    );
  }
  return api;
}
