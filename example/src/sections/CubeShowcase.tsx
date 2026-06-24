import { useState } from "react";
import { CubeSlider } from "../lib";
import { Section } from "../components/Section";
import { Demo } from "../components/Demo";
import { cubePhotos } from "../data";
import { CUBE_CODE } from "../snippets";

export function CubeShowcase() {
  const [vertical, setVertical] = useState(false);

  return (
    <Section id="cube" num="06 / Presets" title="Cube slider">
      <p className="lead">
        Slides are the faces of a 3D cube — navigating rotates it 90° to the next
        face, with subtle face shadows for depth. Spins on either axis and works
        with any number of slides.
      </p>
      <div className="switcher" style={{ marginBottom: "1rem" }}>
        <button aria-pressed={!vertical} onClick={() => setVertical(false)}>Horizontal</button>
        <button aria-pressed={vertical} onClick={() => setVertical(true)}>Vertical</button>
      </div>
      <Demo code={CUBE_CODE}>
        {/* Remount on axis change so the depth is re-measured for the new axis. */}
        <CubeSlider key={vertical ? "v" : "h"} slides={cubePhotos} loop vertical={vertical} height={460} />
      </Demo>
    </Section>
  );
}
