import { Installation } from "./Installation";
import { QuickStart } from "./QuickStart";
import { Props } from "./Props";
import { Controls } from "./Controls";
import { Patterns } from "./Patterns";
import { CardDesigns } from "./CardDesigns";
import { ImageShowcase } from "./ImageShowcase";
import { SlicerShowcase } from "./SlicerShowcase";
import { CardSliderShowcase } from "./CardSliderShowcase";
import { CustomSlides } from "./CustomSlides";
import { Theming } from "./Theming";
import { Accessibility } from "./Accessibility";
import { Responsive } from "./Responsive";
import { Vertical } from "./Vertical";
import { Control } from "./Control";

/**
 * Documentation sections, in page order. The hero (`overview`) is rendered
 * separately in `App`; everything below it lives here. To add a section,
 * create a component and append it — its own `<Section id>` keeps it wired to
 * the sidebar and scroll-spy.
 */
export const sections = [
  Installation,
  QuickStart,
  Props,
  Controls,
  Patterns,
  CardDesigns,
  ImageShowcase,
  SlicerShowcase,
  CardSliderShowcase,
  CustomSlides,
  Theming,
  Accessibility,
  Responsive,
  Vertical,
  Control,
];
