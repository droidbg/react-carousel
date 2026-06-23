import type { CardVariant, Palette } from "./lib";
import type { Design } from "./types";

/**
 * Copy-pasteable code samples shown in the docs. Keeping every snippet here
 * (rather than inline in JSX) keeps the section components readable and makes
 * the examples easy to review and keep in sync with the public API.
 */

/* ----------------------------- Getting started ----------------------------- */

export const INSTALL_CMD = `npm install react-carousel-latest`;

export const INSTALL_IMPORT = `import { Carousel } from "react-carousel-latest";
import "react-carousel-latest/styles.css";`;

export const QUICKSTART_CODE = `import { Carousel } from "react-carousel-latest";
import "react-carousel-latest/styles.css";

const items = [
  { id: 1, content: "Slide one" },
  { id: 2, content: "Slide two" },
  { id: 3, content: "Slide three" },
];

export function Gallery() {
  return (
    <Carousel slidesCount={items.length} loop autoplay>
      <Carousel.Button dir="prev" />
      <Carousel.Track>
        {items.map((item, i) => (
          <Carousel.Slide key={item.id} index={i}>
            {item.content}
          </Carousel.Slide>
        ))}
      </Carousel.Track>
      <Carousel.Button dir="next" />
      <Carousel.Dots />
    </Carousel>
  );
}`;

/* ----------------------------- Carousel ----------------------------- */

export const CONTROLS_CODE = `<div className="rc-controls">
  <Carousel.Button dir="first" />
  <Carousel.PlayPause />
  <Carousel.Button dir="last" />
</div>`;

export const MULTICARD_CODE = `import { Carousel } from "react-carousel-latest";
import { Card } from "react-carousel-latest/presets";
import "react-carousel-latest/bundle.css";

const cards = [
  { title: "Shooting Star", category: "Astronomy", description: "Catch the next meteor shower in style.", from: "#6A0572", to: "#AB83A1" },
  { title: "Star Chef", category: "Food", description: "A recipe that's out of this world.", from: "#16A085", to: "#1ABC9C" },
  { title: "Rising Star", category: "Entertainment", description: "The actor taking Hollywood by storm.", from: "#D35400", to: "#E67E22" },
  { title: "All-Star", category: "Sports", description: "Highlights from the season's best.", from: "#8E2DE2", to: "#4A00E0" },
];

export function CardCarousel() {
  return (
    <Carousel
      slidesCount={cards.length}
      style={{ "--rc-slide-size": "350px", "--rc-slide-gap": "1.25rem" } as React.CSSProperties}
    >
      <Carousel.Button dir="prev" />
      <Carousel.Track>
        {cards.map((card, i) => (
          <Carousel.Slide key={card.title} index={i}>
            <Card {...card} shape="star" variant="gradient" />
          </Carousel.Slide>
        ))}
      </Carousel.Track>
      <Carousel.Button dir="next" />
      <Carousel.Dots />
    </Carousel>
  );
}`;

export const CUSTOM_SLIDES_CODE = `import { Carousel } from "react-carousel-latest";
import "react-carousel-latest/styles.css";

const scenes = [
  { title: "Aurora", sub: "Northern lights over the fjords", bg: "linear-gradient(135deg,#667eea,#764ba2)" },
  { title: "Desert", sub: "Endless dunes at golden hour", bg: "linear-gradient(135deg,#f093fb,#f5576c)" },
  { title: "Ocean", sub: "Deep blue, calm and vast", bg: "linear-gradient(135deg,#4facfe,#00f2fe)" },
  { title: "Forest", sub: "Mist between ancient pines", bg: "linear-gradient(135deg,#0ba360,#3cba92)" },
];

export function HeroCarousel() {
  return (
    <Carousel slidesCount={scenes.length} loop autoplay autoplayInterval={3800} label="Scenery">
      <Carousel.Button dir="prev" />
      <Carousel.Track>
        {scenes.map((s, i) => (
          <Carousel.Slide key={s.title} index={i}>
            <div style={{ height: 340, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem", color: "#fff", background: s.bg }}>
              <h3 style={{ fontSize: "2.4rem", margin: 0 }}>{s.title}</h3>
              <p style={{ margin: 0, opacity: 0.92 }}>{s.sub}</p>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel.Track>
      <Carousel.Button dir="next" />
      <div className="rc-controls">
        <Carousel.Button dir="first" />
        <Carousel.PlayPause />
        <Carousel.Button dir="last" />
      </div>
      <Carousel.Dots />
    </Carousel>
  );
}`;

/* ----------------------------- Presets ----------------------------- */

/** The single-card + slider snippet shown beneath each design in the gallery. */
export function cardCode(d: Design, p: Palette) {
  return `import { Card, CardSlider } from "react-carousel-latest/presets";
import "react-carousel-latest/presets.css";

const slides = [
  { title: "${d.title}", category: "Preview", description: "Built from --rc-from / --rc-to." },
];

// 1 — the single card shown above
export function CardExample() {
  return (
    <Card
      title="${d.title}"
      category="Preview"
      description="Built from --rc-from / --rc-to."
      from="${p.from}"
      to="${p.to}"
      shape="${d.shape}"
      variant="${d.variant}"
    />
  );
}

// 2 — or a whole slider in the "${d.variant}" design
export function SliderExample() {
  return <CardSlider shape="${d.shape}" variant="${d.variant}" slides={slides} />;
}`;
}

/** The live "Try them live" snippet that tracks the selected variant. */
export function variantSliderCode(variant: CardVariant) {
  return `import CardSlider from "react-carousel-latest";
import "react-carousel-latest/presets.css";

const slides = [
  { title: "Shooting Star", category: "Astronomy", description: "Catch the next meteor shower in style." },
  { title: "Star Chef", category: "Food", description: "A recipe that's out of this world." },
  { title: "Rising Star", category: "Entertainment", description: "The actor taking Hollywood by storm." },
];

export function Example() {
  return <CardSlider shape="star" variant="${variant}" randomBackground slides={slides} />;
}`;
}

export const IMAGE_CODE = `import { ImageSlider } from "react-carousel-latest/presets";
import "react-carousel-latest/bundle.css";

const slides = [
  { src: "/photos/01.jpg", alt: "Abstract waves", caption: "Slide 1" },
  { src: "/photos/02.jpg", alt: "Abstract waves", caption: "Slide 2" },
  { src: "/photos/03.jpg", alt: "Abstract waves", caption: "Slide 3" },
];

export function Hero() {
  return <ImageSlider slides={slides} loop autoplay height={460} />;
}`;

export const SLICER_CODE = `import { SlicerSlider } from "react-carousel-latest/presets";
import "react-carousel-latest/bundle.css";

const slides = [
  { src: "/photos/01.jpg", caption: "Slide 1" },
  { src: "/photos/02.jpg", caption: "Slide 2" },
  { src: "/photos/03.jpg", caption: "Slide 3" },
];

export function Hero() {
  // slices = number of horizontal strips in the wipe transition
  return <SlicerSlider slides={slides} loop autoplay slices={6} height={440} />;
}`;

export const CARDSLIDER_CODE = `import CardSlider from "react-carousel-latest";
import "react-carousel-latest/presets.css";

const slides = [
  { title: "Shooting Star", category: "Astronomy", description: "Catch the next meteor shower.", link: "https://example.com" },
  { title: "Star Chef", category: "Food", description: "A recipe that's out of this world." },
];

export function Example() {
  return <CardSlider shape="star" variant="glass" randomBackground slides={slides} />;
}`;

/* ----------------------------- More ----------------------------- */

export const THEMING_CODE = `.rc-root {
  --rc-slide-size: 350px;
  --rc-slide-gap: 1.25rem;
  --rc-accent: #ff6a3d;
}`;
