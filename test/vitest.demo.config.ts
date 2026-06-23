import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { fileURLToPath } from "node:url";

const local = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Visual playground: opens a real (non-headless) Chromium and runs the *.demo.tsx
// files, which render components and hold the window open for eyeballing.
// Kept separate from vitest.browser.config.ts so the real suite never picks
// these up. Run with: npm run test:demo  (Ctrl-C to close).
export default defineConfig({
  test: {
    include: ["browser/**/*.demo.tsx"],
    testTimeout: 0, // no timeout — the demo holds the browser open
    browser: {
      enabled: true,
      provider: playwright(),
      headless: false,
      instances: [{ browser: "chromium" }],
    },
  },
  resolve: {
    dedupe: ["react", "react-dom", "framer-motion"],
    alias: {
      react: local("./node_modules/react"),
      "react-dom": local("./node_modules/react-dom"),
      "framer-motion": local("./node_modules/framer-motion"),
    },
  },
});
