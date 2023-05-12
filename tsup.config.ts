import { defineConfig } from "tsup";

export default defineConfig({
  target: "es6",
  entry: ["src/index.ts", "src/api.ts"],
  format: ["esm"],
  clean: true,
});
