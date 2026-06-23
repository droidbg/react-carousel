import { render } from "@testing-library/react";
import { test } from "vitest";
import CardSlider from "../../src";
import "../../src/presets/presets.css";

const slides = [
  {
    title: "Shooting Star",
    category: "Astronomy",
    description: "Catch the next meteor shower in style.",
  },
  {
    title: "Star Chef",
    category: "Food",
    description: "A recipe that's out of this world.",
  },
  {
    title: "Rising Star",
    category: "Entertainment",
    description: "The actor taking Hollywood by storm.",
  },
  {
    title: "All-Star",
    category: "Sports",
    description: "Highlights from the season's best.",
  },
  {
    title: "Lone Star",
    category: "Travel",
    description: "A road trip across the open plains.",
  },
];

/**
 * Visual demo — NOT part of the suite (filename is *.demo.tsx, not *.test.tsx).
 * Renders the CardSlider in a centered, full-height consumer-style shell and
 * holds the browser open so you can eyeball it.
 *
 *   npm run test:demo          (from test/, or the repo root)
 *
 * It opens a real Chromium window and stays open until you press Ctrl-C.
 */
test("CardSlider visual demo", async () => {
  document.body.style.margin = "0";
  const host = document.createElement("div");
  host.style.cssText =
    "min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:system-ui,sans-serif";
  document.body.appendChild(host);

  render(
    <CardSlider
      shape="star"
      variant="glass"
      randomBackground
      slides={slides}
    />,
    { container: host },
  );

  // Hold the window open for inspection (test has no timeout in the demo config).
  await new Promise(() => {});
});
