import { defineConfig } from "vite"
import dlight from "../../packages/tools/vite-plugin-dlight/dist"

export default defineConfig({
  plugins: [dlight({ files: "**/*.view.{ts,js}" })],
})
