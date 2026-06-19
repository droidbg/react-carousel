import { useEffect, useMemo, useState } from "react";
import CardSlider, { Carousel, type CardVariant } from "../src";
import Card from "../src/legacy/Card";
import { palettes, type Palette } from "../src/legacy/gradient";
import type { ShapeOption } from "../src/legacy/Blobs";
// docs.css @imports the library stylesheets so everything lands in one bundle.
import "./docs.css";

/* ----------------------------- data ----------------------------- */

const scenes = [
  { title: "Aurora", sub: "Northern lights over the fjords", bg: "linear-gradient(135deg,#667eea,#764ba2)" },
  { title: "Desert", sub: "Endless dunes at golden hour", bg: "linear-gradient(135deg,#f093fb,#f5576c)" },
  { title: "Ocean", sub: "Deep blue, calm and vast", bg: "linear-gradient(135deg,#4facfe,#00f2fe)" },
  { title: "Forest", sub: "Mist between ancient pines", bg: "linear-gradient(135deg,#0ba360,#3cba92)" },
];

const cardSamples = [
  { title: "Shooting Star", category: "Astronomy", description: "Catch the next meteor shower in style." },
  { title: "Star Chef", category: "Food", description: "A recipe that's out of this world." },
  { title: "Rising Star", category: "Entertainment", description: "The actor taking Hollywood by storm." },
  { title: "All-Star", category: "Sports", description: "Highlights from the season's best." },
  { title: "Lone Star", category: "Travel", description: "A road trip across the open plains." },
];

type Design = { variant: CardVariant; title: string; desc: string; shape: ShapeOption };
const designs: Design[] = [
  { variant: "gradient", title: "Gradient", desc: "The original — a full diagonal gradient with white type and floating blobs.", shape: "star" },
  { variant: "glass", title: "Glass", desc: "Frosted translucency layered over the gradient, with a blurred category tag.", shape: "ring" },
  { variant: "solid", title: "Solid", desc: "A flat, confident single-colour fill from the palette's first stop.", shape: "music" },
  { variant: "outline", title: "Outline", desc: "Light card, coloured border and title — quiet but unmistakably on-brand.", shape: "heart" },
  { variant: "dark", title: "Dark", desc: "Deep navy with a neon accent pulled from the palette and an ambient glow.", shape: "trophy" },
  { variant: "minimal", title: "Minimal", desc: "Clean white card; the gradient survives only as a thin progress accent.", shape: "blob" },
];

const NAV: { group: string; items: [string, string][] }[] = [
  { group: "Getting started", items: [["overview", "Overview"], ["install", "Installation"], ["quickstart", "Quick start"]] },
  { group: "Carousel", items: [["api", "Props"], ["controls", "Controls"], ["patterns", "Patterns"]] },
  { group: "Cards", items: [["designs", "Card designs"], ["theming", "Theming"]] },
  { group: "Compatibility", items: [["legacy", "Legacy CardSlider"], ["a11y", "Accessibility"]] },
];
const ALL_IDS = NAV.flatMap((g) => g.items.map(([id]) => id));

const props: [string, string, string][] = [
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

const cssVars: [string, string][] = [
  ["--rc-slide-size", "Slide width — 100% for one-per-view, 350px / 33% for cards."],
  ["--rc-slide-gap", "Space between slides."],
  ["--rc-duration", "Transition duration of the track."],
  ["--rc-accent", "Focus ring / dot accent colour."],
  ["--rc-button-bg", "Prev / next button background."],
  ["--rc-dot-active-color", "Active pagination dot colour."],
];

/* ----------------------------- code snippets ----------------------------- */

const HERO_CODE = `<Carousel slidesCount={scenes.length} loop autoplay autoplayInterval={3800} label="Scenery">
  <Carousel.Button dir="prev" />
  <Carousel.Track>
    {scenes.map((s, i) => (
      <Carousel.Slide key={s.title} index={i}>
        <div className="scene" style={{ background: s.bg }}>
          <h3>{s.title}</h3>
          <p>{s.sub}</p>
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
</Carousel>`;

const MULTICARD_CODE = `<Carousel
  slidesCount={cards.length}
  style={{ "--rc-slide-size": "350px", "--rc-slide-gap": "1.25rem" }}
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
</Carousel>`;

function cardCode(d: Design, p: Palette) {
  return `import { Card } from "react-carousel-latest/legacy";

// the exact card shown above
<Card
  title="${d.title}"
  category="Preview"
  description="Built from --rc-from / --rc-to."
  from="${p.from}"
  to="${p.to}"
  shape="${d.shape}"
  variant="${d.variant}"
/>

// …or get this design straight from the slider
<CardSlider shape="${d.shape}" variant="${d.variant}" slides={slides} />`;
}

/* ----------------------------- hooks ----------------------------- */

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      },
      () => undefined,
    );
  };
  return { copied, copy };
}

function useTheme() {
  const [theme, setTheme] = useState<string>(
    () => document.documentElement.getAttribute("data-theme") || "dark",
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("rc-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);
  return [theme, setTheme] as const;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/* ----------------------------- pieces ----------------------------- */

function CodeBlock({ code, lang = "tsx" }: { code: string; lang?: string }) {
  const { copied, copy } = useCopy();
  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__dot" />
        <span className="code__dot" />
        <span className="code__dot" />
        <span className="code__lang">{lang}</span>
        <button className="code__copy" onClick={() => copy(code)}>{copied ? "copied ✓" : "copy"}</button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Demo({
  code,
  lang,
  className,
  style,
  children,
}: {
  code: string;
  lang?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`demo${className ? ` ${className}` : ""}`} style={style}>
      <button className="demo__toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {open ? "Hide code" : "Get code"}
      </button>
      {children}
      {open && <CodeBlock code={code} lang={lang} />}
    </div>
  );
}

function VariantCard({ design, palette }: { design: Design; palette: Palette }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="variant">
      <div className="variant__preview">
        <Card
          title={design.title}
          category="Preview"
          description="Built from --rc-from / --rc-to."
          from={palette.from}
          to={palette.to}
          shape={design.shape}
          variant={design.variant}
        />
      </div>
      <div className="variant__body">
        <span className="variant__name">variant="{design.variant}"</span>
        <h3 className="variant__title" style={{ margin: "0.15rem 0 0.4rem" }}>{design.title}</h3>
        <p className="variant__desc">{design.desc}</p>
        <button className="variant__code" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? "Hide code" : "Get code"}
        </button>
        {open && <CodeBlock code={cardCode(design, palette)} />}
      </div>
    </div>
  );
}

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section">
      <div className="section__num">{num}</div>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function SunMoon({ theme }: { theme: string }) {
  return theme === "dark" ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

/* ----------------------------- app ----------------------------- */

export default function Example() {
  const [theme, setTheme] = useTheme();
  const ids = useMemo(() => ALL_IDS, []);
  const active = useActiveSection(ids);
  const [variant, setVariant] = useState<CardVariant>("gradient");
  const install = useCopy();

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#overview">
          <span className="brand__mark" />
          <span className="brand__name">
            react&#8202;<em>carousel</em>
          </span>
        </a>
        <span className="pill">v2.0</span>
        <span className="topbar__spacer" />
        <a className="topbar__link" href="https://github.com/droidbg/react-carousel" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle colour theme">
          <SunMoon theme={theme} />
        </button>
      </header>

      <div className="layout">
        {/* sidebar */}
        <aside className="sidebar">
          {NAV.map((group) => (
            <div className="sidebar__group" key={group.group}>
              <p className="sidebar__title">{group.group}</p>
              {group.items.map(([id, label]) => (
                <a key={id} href={`#${id}`} className={`sidebar__link${active === id ? " is-active" : ""}`}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </aside>

        {/* content */}
        <main className="content">
          {/* hero */}
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
                <span><span className="cmd__prompt">$</span> npm install react-carousel-latest</span>
                <button onClick={() => install.copy("npm install react-carousel-latest")}>
                  {install.copied ? "copied ✓" : "copy"}
                </button>
              </div>
            </div>

            <Demo className="demo--pad-lg" style={{ marginTop: "2.5rem" }} code={HERO_CODE}>
              <Carousel slidesCount={scenes.length} loop autoplay autoplayInterval={3800} label="Scenery"
                style={{ borderRadius: 14, overflow: "hidden" }}>
                <Carousel.Button dir="prev" />
                <Carousel.Track>
                  {scenes.map((s, i) => (
                    <Carousel.Slide key={s.title} index={i}>
                      <div style={{ height: 340, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem", color: "#fff", background: s.bg }}>
                        <span style={{ fontFamily: "Fraunces, serif", fontSize: "2.4rem", fontWeight: 500 }}>{s.title}</span>
                        <span style={{ opacity: 0.92 }}>{s.sub}</span>
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
            </Demo>

            <div className="chips">
              {["Compound components", "useCarousel hook", "Touch & swipe", "Keyboard nav", "Autoplay", "Dual ESM / CJS", "No Tailwind required"].map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          </section>

          <hr className="rule" />

          <Section id="install" num="01 / Getting started" title="Installation">
            <p className="lead">Install the package and import the base stylesheet once at your app root.</p>
            <CodeBlock lang="bash" code={`npm install react-carousel-latest`} />
            <CodeBlock code={`import { Carousel } from "react-carousel-latest";\nimport "react-carousel-latest/styles.css";`} />
          </Section>

          <Section id="quickstart" num="02 / Getting started" title="Quick start">
            <p>Compose the parts. You provide <code>slidesCount</code> and render whatever you like inside each <code>Carousel.Slide</code>.</p>
            <CodeBlock code={`<Carousel slidesCount={items.length} loop autoplay>\n  <Carousel.Button dir="prev" />\n  <Carousel.Track>\n    {items.map((item, i) => (\n      <Carousel.Slide key={item.id} index={i}>\n        {item.content}\n      </Carousel.Slide>\n    ))}\n  </Carousel.Track>\n  <Carousel.Button dir="next" />\n  <Carousel.Dots />\n</Carousel>`} />
          </Section>

          <Section id="api" num="03 / Carousel" title="Props">
            <p>Pass these to the <code>&lt;Carousel&gt;</code> root. Every value is also available from the headless <code>useCarousel</code> hook.</p>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
                <tbody>
                  {props.map(([p, t, d]) => (
                    <tr key={p}><td>{p}</td><td><code>{t}</code></td><td>{d}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="controls" num="04 / Carousel" title="Controls">
            <p>Drop-in controls read state from context — no wiring required. Group secondary controls in a <code>.rc-controls</code> row.</p>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Part</th><th>Purpose</th></tr></thead>
                <tbody>
                  <tr><td>&lt;Carousel.Button dir="prev | next" /&gt;</td><td>Step one slide (overlays the track edges).</td></tr>
                  <tr><td>&lt;Carousel.Button dir="first | last" /&gt;</td><td>Jump to the start or end.</td></tr>
                  <tr><td>&lt;Carousel.PlayPause /&gt;</td><td>Toggle autoplay (reflects <code>aria-pressed</code>).</td></tr>
                  <tr><td>&lt;Carousel.Dots /&gt;</td><td>Clickable pagination, one per slide.</td></tr>
                </tbody>
              </table>
            </div>
            <CodeBlock code={`<div className="rc-controls">\n  <Carousel.Button dir="first" />\n  <Carousel.PlayPause />\n  <Carousel.Button dir="last" />\n</div>`} />
          </Section>

          <Section id="patterns" num="05 / Carousel" title="Patterns">
            <p>One slide or many — the same component. Set <code>--rc-slide-size</code> to a fixed width and several cards share the view, with neighbours peeking. Prev / next still page one card at a time. Hit <strong>Get code</strong> on the demo for the full snippet.</p>
            <Demo code={MULTICARD_CODE}>
              <Carousel slidesCount={cardSamples.length} label="Featured cards"
                style={{ ["--rc-slide-size" as string]: "350px", ["--rc-slide-gap" as string]: "1.25rem" }}>
                <Carousel.Button dir="prev" />
                <Carousel.Track>
                  {cardSamples.map((c, i) => {
                    const p = palettes[(i * 3) % palettes.length];
                    return (
                      <Carousel.Slide key={c.title} index={i}>
                        <Card title={c.title} category={c.category} description={c.description} from={p.from} to={p.to} shape="star" variant="gradient" />
                      </Carousel.Slide>
                    );
                  })}
                </Carousel.Track>
                <Carousel.Button dir="next" />
                <Carousel.Dots />
              </Carousel>
            </Demo>
          </Section>

          <Section id="designs" num="06 / Cards" title="Card designs">
            <p className="lead">The card preset ships six designs. Each is built from the card's two palette colours (<code>--rc-from</code> / <code>--rc-to</code>), so they stay fully themeable. Every card has its own <strong>Get code</strong>.</p>

            <div className="gallery">
              {designs.map((d, i) => (
                <VariantCard key={d.variant} design={d} palette={palettes[(i * 2) % palettes.length]} />
              ))}
            </div>

            <h3>Try them live</h3>
            <p>Switch the <code>variant</code> prop on a single <code>&lt;CardSlider&gt;</code> — the snippet updates with it:</p>
            <div className="switcher">
              {designs.map((d) => (
                <button key={d.variant} aria-pressed={variant === d.variant} onClick={() => setVariant(d.variant)}>
                  {d.variant}
                </button>
              ))}
            </div>
            <Demo code={`<CardSlider shape="star" variant="${variant}" slides={slides} />`}>
              <CardSlider shape="star" randomBackground variant={variant} slides={cardSamples} />
            </Demo>
          </Section>

          <Section id="theming" num="07 / Cards" title="Theming">
            <p>Override CSS custom properties on <code>.rc-root</code> (or any ancestor). No utility framework, no build step.</p>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Variable</th><th>Controls</th></tr></thead>
                <tbody>{cssVars.map(([v, d]) => (<tr key={v}><td>{v}</td><td>{d}</td></tr>))}</tbody>
              </table>
            </div>
            <CodeBlock lang="css" code={`.rc-root {\n  --rc-slide-size: 350px;\n  --rc-slide-gap: 1.25rem;\n  --rc-accent: #ff6a3d;\n}`} />
            <p style={{ marginTop: "1rem" }}>This very page retints the carousel chrome for dark mode by overriding <code>--rc-button-bg</code> and <code>--rc-dot-active-color</code> — try the toggle, top right.</p>
          </Section>

          <Section id="legacy" num="08 / Compatibility" title="Legacy CardSlider">
            <p>The original 1.x API still works — it's the default export. Add the legacy stylesheet and you're done; the new <code>variant</code> prop is the only addition.</p>
            <CodeBlock code={`import CardSlider from "react-carousel-latest";\nimport "react-carousel-latest/legacy.css";\n\n<CardSlider shape="star" variant="glass" randomBackground slides={slides} />`} />
          </Section>

          <Section id="a11y" num="09 / Compatibility" title="Accessibility">
            <p>Sensible semantics ship by default:</p>
            <ul className="checklist">
              <li>Region with <code>role="region"</code> and <code>aria-roledescription="carousel"</code>.</li>
              <li>Each slide is a labelled <code>group</code> announcing “N of total”.</li>
              <li><code>aria-live</code> politely announces manual navigation, and goes quiet during autoplay.</li>
              <li>Arrow keys, Home / End; prev / next disable at the bounds when not looping.</li>
              <li>Autoplay pauses on hover &amp; focus and respects <code>prefers-reduced-motion</code>.</li>
            </ul>
          </Section>

          <footer className="footer">
            <span>react-carousel-latest · MIT</span>
            <span>Built with Fraunces &amp; Hanken Grotesk</span>
          </footer>
        </main>
      </div>
    </>
  );
}
