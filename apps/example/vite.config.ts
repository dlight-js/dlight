import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"

export default defineConfig({
  server: {
    port: 4320
  },
  base: "",
  optimizeDeps: {
    noDiscovery: true,
    include: undefined
  },
  plugins: [
    dlight({ files: "**/*.{view,model}.{ts,js}", enableDevTools: true }),
  ],
  build: {
    minify: false
  }
})
