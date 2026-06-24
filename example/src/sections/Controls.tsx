import { CodeBlock } from "../components/CodeBlock";
import { Section } from "../components/Section";
import { CONTROLS_CODE } from "../snippets";

export function Controls() {
  return (
    <Section id="controls" num="09 / Carousel" title="Controls">
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
      <CodeBlock code={CONTROLS_CODE} />
    </Section>
  );
}
