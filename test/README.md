# Tests

Isolated test suite for `react-carousel-latest`. All test tooling (including the
Playwright browser) lives **here**, never in the published library — a normal
`npm install` at the repo root pulls none of it.

## Setup

```bash
cd test
npm install
```

## Two layers

### Unit / behaviour (jsdom) — fast, no browser

```bash
npm test          # from test/    (or: npm run test:unit  from the repo root)
npm run test:watch
```

Covers reducer/index math, keyboard navigation, ARIA, and component behaviour
(`unit/`). jsdom has **no layout engine**, so it cannot verify CSS or pixel
positions — that's the browser layer's job.

### Layout / CSS (real browser via Playwright)

```bash
npx playwright install chromium   # one-time, downloads the browser binary
npm run test:browser              # from test/  (or: from the repo root)
```

`browser/cardslider-layout.test.tsx` renders the CardSlider in a centered,
full-height host (the kind of shell CRA/Vite templates generate) and asserts the
arrows stay vertically centered on the cards — the regression guard for the
arrow-alignment bug.

> Note: a *passing* test won't leave anything on screen — it renders, asserts,
> and tears the DOM down. To actually **see** a component, use the visual demo.

### Visual demo (eyeball a component in a real browser)

```bash
npm run test:demo                 # from test/  (or: from the repo root)
```

Opens a non-headless Chromium running `browser/*.demo.tsx`, which render
components and hold the window open so you can inspect them. Press **Ctrl-C** to
close. These files are deliberately named `*.demo.tsx` (not `*.test.tsx`) so the
real suite never runs them.

## Notes

- Tests import the library **source** (`../src`), so no build step is needed
  between edits.
- The vitest configs pin `react` / `react-dom` / `framer-motion` to this
  folder's single installed copy to avoid duplicate-React hook errors across the
  source boundary.
