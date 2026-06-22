import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";

interface DemoProps {
  /** The source shown when the viewer expands "Get code". */
  code: string;
  lang?: string;
  className?: string;
  style?: CSSProperties;
  /** The live, rendered example. */
  children: ReactNode;
}

/** A live example paired with a toggle that reveals its source. */
export function Demo({ code, lang, className, style, children }: DemoProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`demo${className ? ` ${className}` : ""}`} style={style}>
      <button className="demo__toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {open ? "Hide code" : "Get code"}
      </button>
      {children}
      {open && <CodeBlock code={code} lang={lang} />}
    </div>
  );
}
