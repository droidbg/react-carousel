import { useCopy } from "../hooks";

/** A syntax-styled code block with a faux window bar and a copy button. */
export function CodeBlock({ code, lang = "tsx" }: { code: string; lang?: string }) {
  const { copied, copy } = useCopy();
  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__dot" />
        <span className="code__dot" />
        <span className="code__dot" />
        <span className="code__lang">{lang}</span>
        <button className="code__copy" onClick={() => copy(code)}>
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
