import { CodeBlock } from "../components/CodeBlock";
import { Section } from "../components/Section";
import { cssVars } from "../data";
import { THEMING_CODE } from "../snippets";

export function Theming() {
  return (
    <Section id="theming" num="11 / More" title="Theming">
      <p>Override CSS custom properties on <code>.rc-root</code> (or any ancestor). No utility framework, no build step.</p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Variable</th><th>Controls</th></tr></thead>
          <tbody>{cssVars.map(([v, d]) => (<tr key={v}><td>{v}</td><td>{d}</td></tr>))}</tbody>
        </table>
      </div>
      <CodeBlock lang="css" code={THEMING_CODE} />
      <p style={{ marginTop: "1rem" }}>This very page retints the carousel chrome for dark mode by overriding <code>--rc-button-bg</code> and <code>--rc-dot-active-color</code> — try the toggle, top right.</p>
    </Section>
  );
}
