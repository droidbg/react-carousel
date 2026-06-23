import type {
  CardSample,
  Design,
  NavGroup,
  PhotoSlide,
  Scene,
} from "./types";

/** Plain gradient panels for the hero / custom-slides demos. */
export const scenes: Scene[] = [
  { title: "Aurora", sub: "Northern lights over the fjords", bg: "linear-gradient(135deg,#667eea,#764ba2)" },
  { title: "Desert", sub: "Endless dunes at golden hour", bg: "linear-gradient(135deg,#f093fb,#f5576c)" },
  { title: "Ocean", sub: "Deep blue, calm and vast", bg: "linear-gradient(135deg,#4facfe,#00f2fe)" },
  { title: "Forest", sub: "Mist between ancient pines", bg: "linear-gradient(135deg,#0ba360,#3cba92)" },
];

/** Sample cards for the multi-card and CardSlider demos. */
export const cardSamples: CardSample[] = [
  { title: "Shooting Star", category: "Astronomy", description: "Catch the next meteor shower in style." },
  { title: "Star Chef", category: "Food", description: "A recipe that's out of this world." },
  { title: "Rising Star", category: "Entertainment", description: "The actor taking Hollywood by storm." },
  { title: "All-Star", category: "Sports", description: "Highlights from the season's best." },
  { title: "Lone Star", category: "Travel", description: "A road trip across the open plains." },
];

/* Photos for the image / slicer sliders.
 *
 * The first argument to `new URL(..., import.meta.url)` MUST be a static string
 * literal — Parcel resolves it to the bundled asset at build time. A computed
 * path (template literal / variable) is left untransformed and breaks to a
 * `file://` URL at runtime, so keep these spelled out.
 *
 * The `?as=webp&width=1280&quality=72` query tells Parcel's image transformer
 * (sharp) to emit a resized WebP at build time — the 1536px JPEGs become much
 * smaller WebP files than the slider ever needs, with no manual conversion. */
export const photoSlides: PhotoSlide[] = [
  { src: new URL("../assets/01.jpg?as=webp&width=1280&quality=72", import.meta.url).href, alt: "Abstract waves", caption: "Slide 1" },
  { src: new URL("../assets/02.jpg?as=webp&width=1280&quality=72", import.meta.url).href, alt: "Abstract waves", caption: "Slide 2" },
  { src: new URL("../assets/03.jpg?as=webp&width=1280&quality=72", import.meta.url).href, alt: "Abstract waves", caption: "Slide 3" },
  { src: new URL("../assets/04.jpg?as=webp&width=1280&quality=72", import.meta.url).href, alt: "Abstract waves", caption: "Slide 4" },
  { src: new URL("../assets/05.jpg?as=webp&width=1280&quality=72", import.meta.url).href, alt: "Abstract waves", caption: "Slide 5" },
];

/** The six card-preset designs, each demoed in the gallery. */
export const designs: Design[] = [
  { variant: "gradient", title: "Gradient", desc: "The original — a full diagonal gradient with white type and floating blobs.", shape: "star" },
  { variant: "glass", title: "Glass", desc: "Frosted translucency layered over the gradient, with a blurred category tag.", shape: "ring" },
  { variant: "solid", title: "Solid", desc: "A flat, confident single-colour fill from the palette's first stop.", shape: "music" },
  { variant: "outline", title: "Outline", desc: "Light card, coloured border and title — quiet but unmistakably on-brand.", shape: "heart" },
  { variant: "dark", title: "Dark", desc: "Deep navy with a neon accent pulled from the palette and an ambient glow.", shape: "trophy" },
  { variant: "minimal", title: "Minimal", desc: "Clean white card; the gradient survives only as a thin progress accent.", shape: "blob" },
];

/** Sidebar navigation. Section order on the page follows this list. */
export const nav: NavGroup[] = [
  { group: "Getting started", items: [["overview", "Overview"], ["install", "Installation"], ["quickstart", "Quick start"]] },
  { group: "Carousel", items: [["api", "Props"], ["controls", "Controls"], ["patterns", "Patterns"]] },
  { group: "Presets", items: [["designs", "Card designs"], ["image", "Image slider"], ["slicer", "Slicer slider"], ["cardslider", "CardSlider"]] },
  { group: "More", items: [["customslides", "Custom slides"], ["theming", "Theming"], ["a11y", "Accessibility"]] },
];

/** Flat list of every section id, in page order — used for scroll-spy. */
export const allSectionIds = nav.flatMap((g) => g.items.map(([id]) => id));

/** id → sidebar label, used to build the document title for the active section. */
export const sectionLabels: Record<string, string> = Object.fromEntries(
  nav.flatMap((g) => g.items),
);

/** `<Carousel>` props, rendered as a reference table. `[prop, type, description]`. */
export const carouselProps: [prop: string, type: string, description: string][] = [
  ["slidesCount", "number", "Required. How many slides the carousel manages."],
  ["initialIndex", "number = 0", "Slide shown first (clamped into range)."],
  ["loop", "boolean = false", "Wrap past the first / last slide."],
  ["autoplay", "boolean = false", "Auto-advance on a timer."],
  ["autoplayInterval", "number = 4000", "Autoplay delay in milliseconds."],
  ["slidesToScroll", "number = 1", "Slides advanced per prev / next."],
  ["orientation", '"horizontal" | "vertical"', "Layout axis. Default horizontal."],
  ["onIndexChange", "(i: number) => void", "Fires whenever the active slide changes."],
  ["label", 'string = "Carousel"', "Accessible name for the region."],
];

/** Themeable CSS custom properties, rendered as a reference table. `[name, description]`. */
export const cssVars: [name: string, description: string][] = [
  ["--rc-slide-size", "Slide width — 100% for one-per-view, 350px / 33% for cards."],
  ["--rc-slide-gap", "Space between slides."],
  ["--rc-duration", "Transition duration of the track."],
  ["--rc-accent", "Focus ring / dot accent colour."],
  ["--rc-button-bg", "Prev / next button background."],
  ["--rc-dot-active-color", "Active pagination dot colour."],
];
