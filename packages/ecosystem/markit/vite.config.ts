import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"
import { resolve } from "path"
import dts from "vite-plugin-dts"
import { dependencies } from "./package.json"
import easyCss from "vite-plugin-easy-css"

export default defineConfig({
  plugins: [
    easyCss(),
    dts(),
    dlight({ appendix: ".view.ts" })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "emotion",
      fileName: "index"
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)]
    }
  }
})
