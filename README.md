# 🔄 react-carousel-latest

A **headless, accessible, tree-shakeable** React carousel with a compound-component API — plus a backwards-compatible `CardSlider` preset for 1.x users.

Check out the [demo](https://react-carousel-latest.vercel.app/) · [npm](https://www.npmjs.com/package/react-carousel-latest)

---

## ✨ Features

- **Headless core** — all logic in a `useCarousel` hook; bring your own markup.
- **Compound components** — `Carousel.Track`, `Carousel.Slide`, `Carousel.Button`, `Carousel.Dots`.
- **Interactions** — keyboard (arrows / Home / End), touch & pointer **swipe**, and **autoplay** that pauses on hover/focus and respects `prefers-reduced-motion`.
- **Accessible** — region/slide roles, `aria-live`, labelled controls, `aria-current` dots.
- **No CSS framework required** — ship bundled CSS (`rc-` prefixed, themeable via CSS variables). No Tailwind needed.
- **Dual ESM + CJS**, full TypeScript types, `sideEffects: false`.

---

## 📦 Installation

```bash
npm install react-carousel-latest
```

---

## 🚀 Usage (2.x compound API)

```tsx
import { Carousel } from "react-carousel-latest";
import "react-carousel-latest/styles.css";

export function Gallery({ items }) {
  return (
    <Carousel slidesCount={items.length} loop autoplay>
      <Carousel.Button dir="prev" />
      <Carousel.Track>
        {items.map((item, i) => (
          <Carousel.Slide key={item.id} index={i}>
            <img src={item.src} alt={item.alt} />
          </Carousel.Slide>
        ))}
      </Carousel.Track>
      <Carousel.Button dir="next" />
      <Carousel.Dots />
    </Carousel>
  );
}
```

### Options (`<Carousel>` props)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `slidesCount` | `number` | — | **Required.** Number of slides. |
| `initialIndex` | `number` | `0` | First active slide. |
| `loop` | `boolean` | `false` | Wrap past the ends. |
| `autoplay` | `boolean` | `false` | Auto-advance. |
| `autoplayInterval` | `number` | `4000` | Autoplay delay (ms). |
| `slidesToScroll` | `number` | `1` | Slides per prev/next. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout axis. |
| `onIndexChange` | `(index: number) => void` | — | Active-slide callback. |
| `label` | `string` | `"Carousel"` | Accessible region name. |

### Theming

Override CSS variables on `.rc-root` (or any ancestor):

```css
.rc-root {
  --rc-slide-size: 80%;     /* show neighbours */
  --rc-slide-gap: 1.5rem;
  --rc-duration: 400ms;
  --rc-button-bg: #111;
}
```

### Fully headless

```tsx
import { useCarousel } from "react-carousel-latest";

const api = useCarousel({ slidesCount: 5, loop: true });
// → { activeIndex, next, prev, goTo, play, pause, canPrev, canNext, trackRef, rootRef, ... }
```

---

## 🧩 Legacy `CardSlider` (1.x compatible)

The original API still works — just add the legacy stylesheet:

```tsx
import CardSlider from "react-carousel-latest";
import "react-carousel-latest/legacy.css";

<CardSlider
  shape="star"            // "blob" | "heart" | "star" | "bear" | "music" | "trophy" | "ring"
  randomBackground
  variant="glass"         // NEW: card design preset
  slides={[
    { title: "Shooting Star", category: "Astronomy", description: "Catch the next meteor shower.", link: "https://example.com" },
    { title: "Star Chef", category: "Food", description: "A recipe that's out of this world." },
  ]}
/>;
```

### Card design variants (`variant` prop)

`"gradient"` (default) · `"glass"` · `"solid"` · `"outline"` · `"dark"` · `"minimal"`

Each variant is built from the card's two palette colours (`--rc-from` / `--rc-to`), so they all stay themeable.

---

## 🛠 Build

This package is bundled with [`tsup`](https://tsup.egoist.dev/) (esbuild) into dual ESM/CJS with generated types. Run the example locally:

```bash
npm install && npm run build      # build the library
npm run example                   # start the Parcel demo
```

> **Bundler note:** `tsup` was chosen over Vite library mode / Microbundle because it produces dual ESM+CJS, `.d.ts`, and multi-entry output (`.` and `./legacy`) from one config while keeping the tree shakeable.

---

## License

MIT
