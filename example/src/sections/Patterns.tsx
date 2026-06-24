import { Carousel, Card, palettes } from "../lib";
import { Section } from "../components/Section";
import { Demo } from "../components/Demo";
import { cardSamples } from "../data";
import { MULTICARD_CODE } from "../snippets";

export function Patterns() {
  return (
    <Section id="patterns" num="10 / Carousel" title="Patterns">
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
  );
}
