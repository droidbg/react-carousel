import { Carousel as CarouselRoot } from "./Carousel";
import { Track } from "./Track";
import { Slide } from "./Slide";
import { Button } from "./Button";
import { Dots } from "./Dots";
import { PlayPause } from "./PlayPause";

/**
 * The compound carousel. Use the namespaced parts for the common case:
 *
 * ```tsx
 * <Carousel slidesCount={items.length} loop autoplay>
 *   <Carousel.Button dir="prev" />
 *   <Carousel.Track>
 *     {items.map((item, i) => (
 *       <Carousel.Slide key={item.id} index={i}>{item.content}</Carousel.Slide>
 *     ))}
 *   </Carousel.Track>
 *   <Carousel.Button dir="next" />
 *   <div className="rc-controls">
 *     <Carousel.Button dir="first" />
 *     <Carousel.PlayPause />
 *     <Carousel.Button dir="last" />
 *   </div>
 *   <Carousel.Dots />
 * </Carousel>
 * ```
 *
 * The parts are also exported individually for tree-shaking or custom layouts.
 */
export const Carousel = Object.assign(CarouselRoot, {
  Track,
  Slide,
  Button,
  Dots,
  PlayPause,
});

export { Track, Slide, Button, Dots, PlayPause };
export type { CarouselProps } from "./Carousel";
export type { TrackProps } from "./Track";
export type { SlideProps } from "./Slide";
export type { ButtonProps, ButtonDirection } from "./Button";
export type { DotsProps } from "./Dots";
export type { PlayPauseProps } from "./PlayPause";
