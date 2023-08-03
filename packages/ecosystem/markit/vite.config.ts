import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"
import dlightEasyCSS from "vite-plugin-dlight-easy-css"

export default defineConfig({
  server: {
    port: 26660
  },
  plugins: [
    dlightEasyCSS({ files: "**/*.view.ts" }),
    dlight({ files: "**/*.view.ts" })
  ]
})
