import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight-transpiler"
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
      name: "emotion",
      fileName: "index"
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)]
    }
  }
})
