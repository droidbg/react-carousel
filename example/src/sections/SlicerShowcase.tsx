import { SlicerSlider } from "../lib";
import { Section } from "../components/Section";
import { Demo } from "../components/Demo";
import { photoSlides } from "../data";
import { SLICER_CODE } from "../snippets";

export function SlicerShowcase() {
  return (
    <Section id="slicer" num="08 / Presets" title="Slicer slider">
      <p className="lead">The same effect that greets you up top — transitions with a staggered <strong>horizontal-slice</strong> wipe. Tune it with the <code>slices</code> prop.</p>
      <Demo code={SLICER_CODE}>
        <SlicerSlider slides={photoSlides} loop slices={6} height={460} />
      </Demo>
    </Section>
  );
}
