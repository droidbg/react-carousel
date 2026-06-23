import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { fileURLToPath } from "node:url";

const local = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Real-browser layer (Playwright/Chromium). This is the ONLY way to verify CSS
// and layout — jsdom has no layout engine, so getBoundingClientRect is all
// zeros there. Run with: npm run test:browser
// (first time only: npx playwright install chromium)
export default defineConfig({
  test: {
    include: ["browser/**/*.test.{ts,tsx}"],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
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
