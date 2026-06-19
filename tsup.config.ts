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
  // stays side-effect-free and fully tree-shakeable.
  onSuccess:
    "cp src/styles/carousel.css dist/styles.css && cp src/presets/presets.css dist/presets.css",
});
