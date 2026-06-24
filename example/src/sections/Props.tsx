import { Section } from "../components/Section";
import { carouselProps } from "../data";

export function Props() {
  return (
    <Section id="api" num="08 / Carousel" title="Props">
      <p>Pass these to the <code>&lt;Carousel&gt;</code> root. Every value is also available from the headless <code>useCarousel</code> hook.</p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            {carouselProps.map(([prop, type, description]) => (
              <tr key={prop}><td>{prop}</td><td><code>{type}</code></td><td>{description}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
