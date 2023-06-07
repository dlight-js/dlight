import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"

export default defineConfig({
  server: {
    port: 26660
  },
  sourceMap: true,
  plugins: [dlight({ appendix: [".view.js", ".view.ts"] })]
})
