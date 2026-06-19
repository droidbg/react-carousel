# Contributing to react-carousel-latest

Thanks for taking the time to contribute! This guide covers everything you need to get productive quickly.

## Ways to contribute

- 🐞 **Report a bug** — open an issue with the [Bug report](https://github.com/droidbg/react-carousel/issues/new/choose) form (a minimal reproduction helps the most).
- ✨ **Request a feature** — use the [Feature request](https://github.com/droidbg/react-carousel/issues/new/choose) form.
- 📖 **Improve the docs** — the documentation site lives in [`example/`](./example).
- 🔧 **Fix something** — see the workflow below.

## Project layout

```
src/
  core/         headless logic — useCarousel, reducer, autoplay/keyboard/swipe hooks
  components/   compound parts — Carousel.Track / Slide / Button / Dots / PlayPause
  context/      CarouselContext
  presets/      ready-made sliders — CardSlider, ImageSlider, SlicerSlider
  styles/       bundled base CSS
example/        the documentation site (Parcel)
scripts/        release tooling
```

## Development setup

Requires **Node 18+**.

```bash
git clone https://github.com/droidbg/react-carousel.git
cd react-carousel
npm install

npm run build      # build the library (dual ESM/CJS + types)
npm run dev        # rebuild on change
npm run example    # run the docs site at http://localhost:1234
```

## Before you open a PR

```bash
npm test           # typecheck + build (this is what CI runs)
npm run lint       # eslint
```

- Keep changes focused; one logical change per PR.
- Match the surrounding code style (TypeScript, no semicolon-free surprises — follow the existing files).
- The library ships **framework-free CSS** — don't introduce Tailwind or other style dependencies into `src/`.
- New public API needs types and a short doc entry in `example/` where relevant.
- Update [`CHANGELOG.md`](./CHANGELOG.md) under an `## [Unreleased]` heading.

## Pull request process

1. Fork and create a branch off `main` (e.g. `feat/vertical-orientation`).
2. Make your change; ensure `npm test` and `npm run lint` pass.
3. Open a PR against `main` with a clear description of **what** and **why**.
4. A maintainer will review; please be responsive to feedback.

## Commit messages

Use clear, imperative summaries (e.g. `Add fade transition to Carousel`). Conventional Commit prefixes (`feat:`, `fix:`, `docs:`) are welcome but not required.

## Releases

Maintainers cut releases with `npm run release` (interactive: beta / stable / custom → npm publish + git tag + GitHub release).

By contributing, you agree that your contributions are licensed under the project's [Apache License](./LICENSE).
