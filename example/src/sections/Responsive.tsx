import { Carousel } from "../lib";
import { Section } from "../components/Section";
import { Demo } from "../components/Demo";
import { Panel } from "../components/Panel";
import { panels } from "../data";
import { RESPONSIVE_CODE } from "../snippets";

export function Responsive() {
  return (
    <Section id="responsive" num="11 / Carousel" title="Responsive (slidesPerView)">
      <p className="lead">
        Show several slides at once with <code>slidesPerView</code>, and vary it per
        screen with <code>breakpoints</code>. <strong>Resize the window</strong> — this demo shows
        1 slide on phones, 2 on tablets, and 3 on desktop. Prev / next still page one
        at a time and stop at the last full view.
      </p>
      <Demo code={RESPONSIVE_CODE}>
        <Carousel
          slidesCount={panels.length}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          label="Responsive gallery"
        >
          <Carousel.Button dir="prev" />
          <Carousel.Track>
            {panels.map((p, i) => (
              <Carousel.Slide key={i} index={i}>
                <Panel bg={p.bg} label={p.title} />
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
