import { useState, useTransition } from "react";
import { CardSlider, palettes } from "../lib";
import type { CardVariant } from "../lib";
import { Section } from "../components/Section";
import { Demo } from "../components/Demo";
import { VariantCard } from "../components/VariantCard";
import { cardSamples, designs } from "../data";
import { variantSliderCode } from "../snippets";

export function CardDesigns() {
  const [variant, setVariant] = useState<CardVariant>("gradient");
  // Switching variant re-renders the whole CardSlider (5 motion cards). Mark it
  // non-urgent so rapid clicks stay responsive and React can interrupt.
  const [isPending, startTransition] = useTransition();

  return (
    <Section id="designs" num="06 / Presets" title="Card designs">
      <p className="lead">The card preset ships six designs. Each is built from the card's two palette colours (<code>--rc-from</code> / <code>--rc-to</code>), so they stay fully themeable. Every card has its own <strong>Get code</strong>.</p>

      <div className="gallery">
        {designs.map((d, i) => (
          <VariantCard key={d.variant} design={d} palette={palettes[(i * 2) % palettes.length]} />
        ))}
      </div>

      <h3>Try them live</h3>
      <p>Switch the <code>variant</code> prop on a single <code>&lt;CardSlider&gt;</code> — the snippet updates with it:</p>
      <div className="switcher">
        {designs.map((d) => (
          <button key={d.variant} aria-pressed={variant === d.variant} onClick={() => startTransition(() => setVariant(d.variant))}>
            {d.variant}
          </button>
        ))}
      </div>
      <Demo
        code={variantSliderCode(variant)}
        style={{ opacity: isPending ? 0.65 : 1, transition: "opacity 0.2s ease" }}
      >
        <CardSlider shape="star" randomBackground variant={variant} slides={cardSamples} />
      </Demo>
    </Section>
  );
}
