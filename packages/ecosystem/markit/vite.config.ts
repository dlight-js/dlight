import { defineConfig } from "vite"
import { resolve } from "path"
import dlight from "vite-plugin-dlight"
import dlightEasyCSS from "vite-plugin-dlight-easy-css"

export default defineConfig({
  server: {
    port: 26660
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "markit",
      fileName: "index"
    }
  },
  plugins: [
    dlightEasyCSS({ files: "**/*.view.ts" }),
    dlight({ files: "**/*.view.ts" })
  ]
})
