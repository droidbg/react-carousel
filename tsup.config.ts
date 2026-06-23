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
  // CSS is shipped as standalone files (not imported by the JS) so the package
  // stays side-effect-free and fully tree-shakeable. We also concatenate the
  // two into `bundle.css` (base first, then presets) so consumers who use a
  // preset can do a single import instead of two. Safe to concat: neither file
  // uses @charset / @import / url(), so there are no rule-ordering constraints.
  onSuccess:
    "cp src/styles/carousel.css dist/styles.css && cp src/presets/presets.css dist/presets.css && cat src/styles/carousel.css src/presets/presets.css > dist/bundle.css",
});
