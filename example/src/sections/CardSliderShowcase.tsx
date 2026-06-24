import { CardSlider } from "../lib";
import { Section } from "../components/Section";
import { Demo } from "../components/Demo";
import { cardSamples } from "../data";
import { CARDSLIDER_CODE } from "../snippets";

export function CardSliderShowcase() {
  return (
    <Section id="cardslider" num="07 / Presets" title="CardSlider">
      <p>The card preset is also the package's default export — a native-scroll row of decorated cards. Add the presets stylesheet; the <code>variant</code> prop selects the design.</p>
      <Demo code={CARDSLIDER_CODE}>
        <CardSlider shape="star" variant="glass" randomBackground slides={cardSamples} />
      </Demo>
    </Section>
  );
}
