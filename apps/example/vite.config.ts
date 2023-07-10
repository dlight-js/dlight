import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"
import dlightEasyCSS from "vite-plugin-dlight-easy-css"

export default defineConfig({
  server: {
    port: 26660
  },
  sourceMap: true,
  plugins: [
    dlightEasyCSS(),
    dlight()
  ]
})
