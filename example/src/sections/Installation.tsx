import { CodeBlock } from "../components/CodeBlock";
import { Section } from "../components/Section";
import { INSTALL_CMD, INSTALL_IMPORT } from "../snippets";

export function Installation() {
  return (
    <Section id="install" num="01 / Getting started" title="Installation">
      <p className="lead">Install the package and import the base stylesheet once at your app root.</p>
      <CodeBlock lang="bash" code={INSTALL_CMD} />
      <CodeBlock code={INSTALL_IMPORT} />
      <p>Using a preset? Add <code>presets.css</code> too — or pull both in with a single <code>react-carousel-latest/bundle.css</code> import.</p>
    </Section>
  );
}
