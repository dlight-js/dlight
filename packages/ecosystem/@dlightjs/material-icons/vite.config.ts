import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"
import { resolve } from "path"
import dts from "vite-plugin-dts"
import { dependencies } from "./package.json"

export default defineConfig({
  plugins: [
    dts(),
    dlight({ appendix: ".view.ts" })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "material-icons",
      fileName: "index"
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)]
    }
  }
})
