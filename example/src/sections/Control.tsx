import { useRef, useState } from "react";
import { Carousel } from "../lib";
import type { CarouselHandle, DragInfo } from "../lib";
import { Section } from "../components/Section";
import { Demo } from "../components/Demo";
import { Panel } from "../components/Panel";
import { panels } from "../data";
import { CONTROL_CODE } from "../snippets";

export function Control() {
  const ref = useRef<CarouselHandle>(null);
  const [status, setStatus] = useState("ready");

  return (
    <Section id="control" num="15 / New in 2.1" title="Programmatic control">
      <p className="lead">
        Drive the carousel from outside with a <code>ref</code> (the imperative
        <code>CarouselHandle</code>), and react to lifecycle callbacks like
        <code>onSettle</code> and <code>onSwipeEnd</code>.
      </p>
      <Demo code={CONTROL_CODE}>
        <div className="switcher" style={{ marginBottom: "1rem" }}>
          <button onClick={() => ref.current?.prev()}>Prev</button>
          <button onClick={() => ref.current?.goTo(0)}>First</button>
          <button onClick={() => ref.current?.next()}>Next</button>
        </div>
        <Carousel
          ref={ref}
          slidesCount={panels.length}
          label="Controlled gallery"
          onSettle={(i) => setStatus(`settled on ${i + 1}`)}
          onSwipeEnd={(d: DragInfo) => setStatus(`swiped ${d.direction}`)}
        >
          <Carousel.Track>
            {panels.map((p, i) => (
              <Carousel.Slide key={i} index={i}>
                <Panel bg={p.bg} label={p.title} />
              </Carousel.Slide>
            ))}
          </Carousel.Track>
          <Carousel.Dots />
        </Carousel>
        <p style={{ marginTop: "0.75rem", fontFamily: "var(--font-mono)" }}>status: {status}</p>
      </Demo>
    </Section>
  );
}
