import { CodeBlock } from "../components/CodeBlock";
import { Section } from "../components/Section";
import { CARDSLIDER_CODE } from "../snippets";

export function CardSliderShowcase() {
  return (
    <Section id="cardslider" num="09 / Presets" title="CardSlider">
      <p>The card preset is also the package's default export — a native-scroll row of decorated cards. Add the presets stylesheet; the <code>variant</code> prop selects the design.</p>
      <CodeBlock code={CARDSLIDER_CODE} />
    </Section>
  );
}
