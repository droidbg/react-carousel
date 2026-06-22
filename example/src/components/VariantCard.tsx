import { useState } from "react";
import { Card } from "../lib";
import type { Palette } from "../lib";
import type { Design } from "../types";
import { cardCode } from "../snippets";
import { CodeBlock } from "./CodeBlock";

/** A card-design gallery tile: a live preview, its blurb, and a code toggle. */
export function VariantCard({ design, palette }: { design: Design; palette: Palette }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="variant">
      <div className="variant__preview">
        <Card
          title={design.title}
          category="Preview"
          description="Built from --rc-from / --rc-to."
          from={palette.from}
          to={palette.to}
          shape={design.shape}
          variant={design.variant}
        />
      </div>
      <div className="variant__body">
        <span className="variant__name">variant="{design.variant}"</span>
        <h3 className="variant__title" style={{ margin: "0.15rem 0 0.4rem" }}>{design.title}</h3>
        <p className="variant__desc">{design.desc}</p>
        <button className="variant__code" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? "Hide code" : "Get code"}
        </button>
        {open && <CodeBlock code={cardCode(design, palette)} />}
      </div>
    </div>
  );
}
