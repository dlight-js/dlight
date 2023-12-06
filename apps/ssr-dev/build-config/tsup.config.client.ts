import { defineConfig } from "tsup"
import glob from "tiny-glob"

export default defineConfig({
  entry: await glob("./src/**/!(*.d|*.spec).ts"),
  outDir: "dist/client/src",
  noExternal: ["@dlightjs/dlight-client"],
  format: ["esm"],
  clean: true
  // minify: true
})
