import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"
import easyCSS from "vite-plugin-easy-css"
export default defineConfig({
  server: {
    port: 26660
  },
  sourceMap: true,
  plugins: [easyCSS(), dlight({ appendix: [".view.js", ".view.ts"] })]
})
