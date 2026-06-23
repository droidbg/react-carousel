import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const local = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Fast, browserless layer: behaviour, logic, ARIA, DOM structure.
// Tests import the library SOURCE (../src) so no build step is needed.
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setup.ts"],
    include: ["unit/**/*.test.{ts,tsx}"],
  },
  // The library source resolves React from the repo root while framer-motion
  // resolves it here — two copies break hooks. Pin all of them to this folder's
  // single installed copy.
  resolve: {
    dedupe: ["react", "react-dom", "framer-motion"],
    alias: {
      react: local("./node_modules/react"),
      "react-dom": local("./node_modules/react-dom"),
      "framer-motion": local("./node_modules/framer-motion"),
    },
  },
});
