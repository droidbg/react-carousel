import { CodeBlock } from "../components/CodeBlock";
import { Section } from "../components/Section";
import { QUICKSTART_CODE } from "../snippets";

export function QuickStart() {
  return (
    <Section id="quickstart" num="02 / Getting started" title="Quick start">
      <p>Compose the parts. You provide <code>slidesCount</code> and render whatever you like inside each <code>Carousel.Slide</code>.</p>
      <CodeBlock code={QUICKSTART_CODE} />
    </Section>
  );
}
