import { defineConfig } from "vite"
import dlight from "../../plugin/vite-plugin-dlight/dist"
import { resolve } from "path"
import dts from "vite-plugin-dts"
import { dependencies } from "./package.json"

export default defineConfig({
  plugins: [
    dts(),
    dlight()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "component",
      fileName: "index"
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)]
    }
  }
})
