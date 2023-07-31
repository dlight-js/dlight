import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight-server"

export default defineConfig({
  server: {
    port: 26660
  },
  plugins: [
    dlight({ files: "**/*.view.ts" })
  ]
})
