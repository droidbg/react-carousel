<div align="center">

<img src="https://raw.githubusercontent.com/droidbg/react-carousel/main/.github/logo.svg" alt="react-carousel" width="480" />

<p>
  <a href="https://www.npmjs.com/package/react-carousel-latest"><img src="https://img.shields.io/npm/v/react-carousel-latest?color=ff6a3d&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/react-carousel-latest"><img src="https://img.shields.io/npm/dm/react-carousel-latest?color=ff6a3d" alt="downloads" /></a>
  <img src="https://img.shields.io/bundlephobia/minzip/react-carousel-latest?color=ff6a3d" alt="minzipped size" />
  <img src="https://img.shields.io/npm/types/react-carousel-latest?color=ff6a3d" alt="types included" />
  <img src="https://img.shields.io/npm/l/react-carousel-latest?color=ff6a3d" alt="license" />
</p>

<p><strong>A headless, accessible, tree-shakeable React carousel</strong><br/>compound-component API · keyboard · swipe · autoplay · ARIA · ready-made presets</p>

<p>
  <a href="https://react-carousel-latest.vercel.app/"><b>📖 Documentation &amp; Live demos</b></a> ·
  <a href="https://www.npmjs.com/package/react-carousel-latest">npm</a> ·
  <a href="https://github.com/droidbg/react-carousel/issues/new/choose">Report a bug</a>
</p>

<img src="https://raw.githubusercontent.com/droidbg/react-carousel/main/.github/media/slicer.gif" alt="Slicer slider demo" width="720" />

</div>

---

## 📦 Installation

```bash
npm install react-carousel-latest
```

Import the base stylesheet once at your app root (and `presets.css` if you use a preset):

```tsx
import "react-carousel-latest/styles.css";
import "react-carousel-latest/presets.css";
```

> Using a preset? You can import both in one line instead:
> `import "react-carousel-latest/bundle.css";`

---

## 🚀 Quick start

A full-bleed image carousel with the staggered slice transition:

```tsx
import { SlicerSlider } from "react-carousel-latest/presets";
import "react-carousel-latest/bundle.css";

const slides = [
  { src: "/photos/01.jpg", caption: "Slide 1" },
  { src: "/photos/02.jpg", caption: "Slide 2" },
  { src: "/photos/03.jpg", caption: "Slide 3" },
];

export default function App() {
  return <SlicerSlider slides={slides} loop autoplay slices={6} height={460} />;
}
```

> Building something custom? The headless `<Carousel>` primitives, the other presets, theming, and the complete prop reference live in the **[documentation](https://react-carousel-latest.vercel.app/)** — with copy-paste code for every example.

---

## ✨ Features

- **Headless core** — all logic in a `useCarousel` hook; bring your own markup.
- **Compound components** — `Carousel.Track / Slide / Button / Dots / PlayPause`.
- **Ready-made presets** — `CardSlider`, `ImageSlider`, and `SlicerSlider`.
- **Interactions** — keyboard (arrows / Home / End), touch & pointer swipe, and autoplay that pauses on hover/focus and respects `prefers-reduced-motion`.
- **Accessible** — region/slide roles, `aria-live`, labelled controls.
- **No CSS framework required** — bundled, themeable CSS. No Tailwind.
- **Dual ESM + CJS**, full TypeScript types, `sideEffects: false`.

---

## 🧩 What's in the box

| Export                     | What it is                                                  |
| -------------------------- | ----------------------------------------------------------- |
| `Carousel` + `useCarousel` | Headless compound primitives — compose your own UI.         |
| `CardSlider`               | Decorated card row with six design variants.                |
| `ImageSlider`              | Full-bleed image carousel with caption + overlaid controls. |
| `SlicerSlider`             | Staggered horizontal-slice wipe transition.                 |

Checkout Full API, theming, accessibility notes, and live demos: **<https://react-carousel-latest.vercel.app/>**

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing guide](./CONTRIBUTING.md) and our [Code of Conduct](./CODE_OF_CONDUCT.md). For bugs and ideas, use the [issue templates](https://github.com/droidbg/react-carousel/issues/new/choose).

## 🔒 Security

Found a vulnerability? Please follow the [Security policy](./SECURITY.md) — don't open a public issue.

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release notes.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
