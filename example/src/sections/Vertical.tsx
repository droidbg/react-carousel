import { Carousel } from "../lib";
import { Section } from "../components/Section";
import { Demo } from "../components/Demo";
import { Panel } from "../components/Panel";
import { panels } from "../data";
import { VERTICAL_CODE } from "../snippets";
import type { CSSProperties } from "react";

export function Vertical() {
  return (
    <Section id="vertical" num="14 / New in 2.1" title="Vertical">
      <p className="lead">
        Set <code>orientation="vertical"</code> and give the viewport a height with
        <code>--rc-viewport-height</code>. Keyboard (↑/↓) and swipe follow the axis automatically.
      </p>
      <Demo code={VERTICAL_CODE}>
        <Carousel
          slidesCount={panels.length}
          orientation="vertical"
          label="Vertical gallery"
          style={{ "--rc-viewport-height": "320px" } as CSSProperties}
        >
          <Carousel.Button dir="prev" />
          <Carousel.Track>
            {panels.map((p, i) => (
              <Carousel.Slide key={i} index={i}>
                <Panel bg={p.bg} label={p.title} height="100%" />
              </Carousel.Slide>
            ))}
          </Carousel.Track>
          <Carousel.Button dir="next" />
          <Carousel.Dots />
        </Carousel>
      </Demo>
    </Section>
  );
}
