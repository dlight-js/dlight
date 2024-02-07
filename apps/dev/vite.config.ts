import { defineConfig } from "vite"
import dlight from "../../packages/tools/vite-plugin-dlight/dist"

export default defineConfig({
  server: {
    port: 4320,
  },
  base: "",
  optimizeDeps: {
    disabled: true,
  },
  plugins: [dlight({ files: "**/*.view.{ts,js}", enableDevTools: true })],
})
