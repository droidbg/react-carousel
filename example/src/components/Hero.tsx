import { useCopy } from "../hooks";
import { SlicerSlider } from "../lib";
import { photoSlides } from "../data";
import { SLICER_CODE } from "../snippets";
import { Demo } from "./Demo";

const CHIPS = [
  "Compound components",
  "useCarousel hook",
  "Touch & swipe",
  "Keyboard nav",
  "Autoplay",
  "Dual ESM / CJS",
  "No Tailwind required",
];

const INSTALL_CMD = "npm install react-carousel-latest";

/** Landing section: pitch, install command, a live slicer demo, and feature chips. */
export function Hero() {
  const install = useCopy();
  return (
    <section id="overview" className="hero section">
      <div className="hero__mesh" />
      <p className="eyebrow">React · headless · accessible</p>
      <h1>
        Carousels, <em>composed.</em>
      </h1>
      <p className="hero__lede">
        A headless, tree-shakeable React carousel with a compound-component API. Keyboard, swipe,
        autoplay and ARIA built in — bring your own markup, or the batteries-included card preset.
      </p>
      <div className="hero__cta">
        <a className="btn btn--primary" href="#quickstart">Get started →</a>
        <div className="cmd">
          <span><span className="cmd__prompt">$</span> {INSTALL_CMD}</span>
          <button onClick={() => install.copy(INSTALL_CMD)}>
            {install.copied ? "copied ✓" : "copy"}
          </button>
        </div>
      </div>

      <Demo style={{ marginTop: "2.5rem" }} code={SLICER_CODE}>
        <SlicerSlider slides={photoSlides} loop autoplay autoplayInterval={4500} slices={6} height={440} />
      </Demo>

      <div className="chips">
        {CHIPS.map((c) => (
          <span className="chip" key={c}>{c}</span>
        ))}
      </div>
    </section>
  );
}
