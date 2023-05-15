import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    target: "es6",
    entry: ["src/index.ts", "src/api.ts"],
    format: ["esm"],
    dts: true,
    clean: true,
    minify: !options.watch,
  };
});
