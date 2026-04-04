import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    cli: "src/cli.ts",
  },
  format: ["esm"],
  platform: "node",
  target: "node18",
  sourcemap: true,
  dts: true,
  clean: true,
  splitting: false,
  external: ["bun"],
});
