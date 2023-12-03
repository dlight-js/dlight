import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist/server",
  format: ["esm"],
  clean: true
  // minify: true
})
