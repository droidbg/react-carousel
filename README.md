# 🔄 react-carousel-latest

A **headless, accessible, tree-shakeable** React carousel with a compound-component API — plus a backwards-compatible `CardSlider` preset for 1.x users.

[Live docs & demo](https://react-carousel-latest.vercel.app/) · [npm](https://www.npmjs.com/package/react-carousel-latest)

---

## ✨ Features

- **Headless core** — all logic in a `useCarousel` hook; bring your own markup.
- **Compound components** — `Carousel.Track`, `Carousel.Slide`, `Carousel.Button`, `Carousel.Dots`, `Carousel.PlayPause`.
- **One slide or many** — set one CSS variable for multi-card / peeking layouts; prev/next still page one slide.
- **Full controls** — prev / next / first / last buttons, play–pause toggle, and clickable dots.
- **Interactions** — keyboard (arrows / Home / End), touch & pointer **swipe**, and **autoplay** that pauses on hover/focus and respects `prefers-reduced-motion`.
- **Accessible** — region/slide roles, `aria-live`, labelled controls, `aria-current` dots.
- **No CSS framework required** — bundled CSS (`rc-` prefixed, themeable via CSS variables). No Tailwind needed.
- **Dual ESM + CJS**, full TypeScript types, `sideEffects: false`.

---

## 📦 Installation

```bash
npm install react-carousel-latest
```

> **2.0 is currently in beta.** To try it without affecting `latest`:
> ```bash
> npm install react-carousel-latest@beta
> ```

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

      {/* optional secondary controls */}
      <div className="rc-controls">
        <Carousel.Button dir="first" />
        <Carousel.PlayPause />
        <Carousel.Button dir="last" />
      </div>

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

### Parts

| Part | Purpose |
| --- | --- |
| `Carousel.Track` | The clipping viewport + moving strip. Wraps the slides. |
| `Carousel.Slide` | A single slide. Takes a zero-based `index`. |
| `Carousel.Button` | Navigation. `dir="prev" \| "next" \| "first" \| "last"`. |
| `Carousel.PlayPause` | Toggles autoplay (`aria-pressed`). |
| `Carousel.Dots` | Clickable pagination, one dot per slide. |

### Multi-card / peeking layout

The same component shows several cards at once — just set the slide width:

```tsx
<Carousel
  slidesCount={cards.length}
  style={{ "--rc-slide-size": "320px", "--rc-slide-gap": "1.25rem" }}
>
  {/* … */}
</Carousel>
```

`--rc-slide-size: 100%` (the default) is one-per-view; any fixed width or percentage shows multiple slides with neighbours peeking, and prev/next still advance exactly one slide.

### Theming

Override CSS variables on `.rc-root` (or any ancestor):

```css
.rc-root {
  --rc-slide-size: 80%;     /* show neighbours */
  --rc-slide-gap: 1.5rem;
  --rc-duration: 400ms;
  --rc-accent: #ff6a3d;     /* focus ring + active dot */
  --rc-button-bg: #111;
}
```

### Fully headless

```tsx
import { useCarousel } from "react-carousel-latest";

const api = useCarousel({ slidesCount: 5, loop: true });
// → { activeIndex, next, prev, goTo, play, pause, isPlaying, canPrev, canNext, trackRef, rootRef }
```

---

## 🧩 Legacy `CardSlider` (1.x compatible)

The original API still works — it's the default export. Just add the legacy stylesheet:

```tsx
import CardSlider from "react-carousel-latest";
import "react-carousel-latest/legacy.css";

<CardSlider
  shape="star"            // "blob" | "heart" | "star" | "bear" | "music" | "trophy" | "ring"
  randomBackground
  variant="glass"         // NEW in 2.x: card design preset
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

## ⬆️ Migrating from 1.x

2.0 is a major release. Your existing code keeps working, with **one required change**:

- **Import the legacy stylesheet.** 1.x relied on the consumer having Tailwind configured. 2.x ships its own CSS, so add `import "react-carousel-latest/legacy.css";` alongside your existing `import CardSlider from "react-carousel-latest";`. Without it the cards render unstyled.
- **React 18 or 19** is now required (the peer range was 15–19).
- Everything else — the `<CardSlider slides shape randomBackground />` API — is unchanged. The new compound `Carousel` is opt-in via the named export.

---

## 🛠 Local development

This package is bundled with [`tsup`](https://tsup.egoist.dev/) (esbuild) into dual ESM/CJS with generated types.

```bash
npm install && npm run build      # build the library
npm run example                   # start the docs site (example/)
```

> **Bundler note:** `tsup` was chosen over Vite library mode / Microbundle because it produces dual ESM+CJS, `.d.ts`, and multi-entry output (`.` and `./legacy`) from one config while keeping the tree shakeable.

---

## License

MIT
