import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"
import dlightEasyCSS from "vite-plugin-dlight-easy-css"
console.log(dlight)
export default defineConfig({
  server: {
    port: 26660
  },
  plugins: [
    dlightEasyCSS(),
    dlight()
  ]
})
