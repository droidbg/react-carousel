# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **`slidesPerView` + `breakpoints`** — show multiple slides at once and vary it
  responsively, e.g. `<Carousel slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}>`. Navigation stops at the last full view (no over-scroll).
- **Imperative `ref` handle on `<Carousel>`** — `next`/`prev`/`goTo`/`play`/`pause`
  (+ `activeIndex`/`canPrev`/`canNext`) via `CarouselHandle`, for driving the
  carousel from a parent without the headless hook.
- **Lifecycle callbacks** — `onSettle(index)` (after the slide transition ends),
  `onSwipeStart()`, and `onSwipeEnd({ delta, direction })`.
- **Next.js App Router / RSC support** — the published entries are tagged
  `"use client"`, so the components can be imported into server-component trees
  without a wrapper.
- **Vertical orientation** completed — `--rc-viewport-height` bounds the vertical
  viewport so `orientation="vertical"` lays out and translates correctly.

### Fixed

- **CardSlider** preset styles are now self-contained (own `box-sizing`,
  `text-align`, `font-family`) and the arrows are pinned to the card row, so the
  layout no longer breaks when the host app sets global styles (e.g. centered
  text or a tall flex shell).

## [2.0.2] - 2026-06-23

### Added

- `react-carousel-latest/bundle.css` — a single stylesheet combining the base
  and preset styles, so preset users can import one file instead of two. The
  granular `styles.css` / `presets.css` exports remain for tree-shaking.

### Changed

- Removed the `lucide-react` runtime dependency; the three preset icons are now
  inlined as local SVGs. No API change — smaller install footprint for consumers.

## [2.0.1] - 2026-06-20

### Added

- Community docs: Contributing guide, Code of Conduct, and Security policy.

### Changed

- Relicensed to Apache-2.0.

### Fixed

- CI test script.

## [2.0.0] - 2026-06-20

### Added

- Headless, compound-component `Carousel` API (`Carousel.Track / Slide / Button /
  Dots / PlayPause`) and the `useCarousel` hook for fully custom UI.
- Ready-made presets: `CardSlider`, `ImageSlider`, and `SlicerSlider`.
- Dual ESM + CJS output, bundled TypeScript types, and `sideEffects: false`.
- Keyboard, pointer/touch swipe, and autoplay (pauses on hover/focus, respects
  `prefers-reduced-motion`) with region/slide ARIA roles and `aria-live`.

[Unreleased]: https://github.com/droidbg/react-carousel/compare/v2.0.2...HEAD
[2.0.2]: https://github.com/droidbg/react-carousel/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/droidbg/react-carousel/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/droidbg/react-carousel/releases/tag/v2.0.0
