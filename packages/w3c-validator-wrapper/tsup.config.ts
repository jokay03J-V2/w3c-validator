import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    minify: !options.watch,
    entry: ["src/"],
    splitting: false,
    clean: true,
    format: ["cjs", "esm"],
    dts: true,
    tsconfig: "./tsconfig.json",
  };
});
