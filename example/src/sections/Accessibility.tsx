import { Section } from "../components/Section";

export function Accessibility() {
  return (
    <Section id="a11y" num="16 / More" title="Accessibility">
      <p>Sensible semantics ship by default:</p>
      <ul className="checklist">
        <li>Region with <code>role="region"</code> and <code>aria-roledescription="carousel"</code>.</li>
        <li>Each slide is a labelled <code>group</code> announcing “N of total”.</li>
        <li><code>aria-live</code> politely announces manual navigation, and goes quiet during autoplay.</li>
        <li>Arrow keys, Home / End; prev / next disable at the bounds when not looping.</li>
        <li>Autoplay pauses on hover &amp; focus and respects <code>prefers-reduced-motion</code>.</li>
      </ul>
    </Section>
  );
}
