import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    presets: "src/presets/index.ts",
  },
  format: ["esm", "cjs"],
  // Emit .d.ts for every entry (uses tsconfig.build.json's settings).
  dts: { compilerOptions: { composite: false } },
  tsconfig: "./tsconfig.build.json",
  sourcemap: true,
  clean: true,
  treeshake: true,
  // React (and its jsx runtime) and our peer/runtime deps stay external so the
  // consumer dedupes a single copy. tsup auto-externalises dependencies +
  // peerDependencies; the jsx-runtime subpath is listed explicitly to be safe.
  external: ["react", "react-dom", "react/jsx-runtime"],
  // Post-build: ship the standalone CSS (kept out of the JS so the package
  // stays side-effect-free + tree-shakeable), concatenate `bundle.css` (base
  // then presets — neither uses @charset/@import/url(), so order is safe), and
  // prepend a "use client" directive to each JS entry so the package works in
  // Next.js App Router / RSC trees. The directive is added here (not in source)
  // because bundlers strip it from the thin re-export entry modules.
  onSuccess: async () => {
    const { copyFileSync, readFileSync, writeFileSync } = await import("node:fs");
    copyFileSync("src/styles/carousel.css", "dist/styles.css");
    copyFileSync("src/presets/presets.css", "dist/presets.css");
    writeFileSync(
      "dist/bundle.css",
      readFileSync("src/styles/carousel.css", "utf8") +
        readFileSync("src/presets/presets.css", "utf8"),
    );
    for (const file of ["dist/index.js", "dist/index.cjs", "dist/presets.js", "dist/presets.cjs"]) {
      writeFileSync(file, '"use client";\n' + readFileSync(file, "utf8"));
    }
  },
});
