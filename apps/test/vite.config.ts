import { defineConfig } from "vite"
import dlight from "../../packages/plugin/vite-plugin-dlight/dist" // 关键代码，引用dlight插件

export default defineConfig({
  server: {
    port: 26660
  },
  base: "",
  plugins: [
    dlight()
  ]
})
