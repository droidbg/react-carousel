import type { CardVariant, ShapeOption } from "./lib";

/** A single card-preset design shown in the "Card designs" gallery. */
export interface Design {
  variant: CardVariant;
  title: string;
  desc: string;
  shape: ShapeOption;
}

/** A full-bleed photo slide used by the image / slicer demos. */
export interface PhotoSlide {
  src: string;
  alt: string;
  caption: string;
}

/** A plain gradient panel used by the hero / custom-slides demos. */
export interface Scene {
  title: string;
  sub: string;
  bg: string;
}

/** A sample card for the card-row demos. */
export interface CardSample {
  title: string;
  category: string;
  description: string;
}

/** One sidebar navigation group: a heading and its `[id, label]` links. */
export interface NavGroup {
  group: string;
  items: [id: string, label: string][];
}
