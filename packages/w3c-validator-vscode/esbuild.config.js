require("esbuild").build({
  outfile: "out/extension.js",
  external: ["vscode"],
  mainFields: ["require", "main"],
  entryPoints: ["./src/extension.ts"],
  format: "cjs",
  platform: "node",
  bundle: true,
  sourcemap: true,
  minify: true,
});
