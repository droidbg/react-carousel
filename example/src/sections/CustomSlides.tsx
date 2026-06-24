import { Carousel } from "../lib";
import { Section } from "../components/Section";
import { Demo } from "../components/Demo";
import { scenes } from "../data";
import { CUSTOM_SLIDES_CODE } from "../snippets";

export function CustomSlides() {
  return (
    <Section id="customslides" num="13 / Carousel" title="Custom slides">
      <p>A slide can hold any markup. Here are plain gradient panels driven by the headless <code>Carousel</code> with the full control set — Start / Prev / Play-Pause / Next / End plus dots.</p>
      <Demo code={CUSTOM_SLIDES_CODE}>
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
    </Section>
  );
}
