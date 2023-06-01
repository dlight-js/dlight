import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight-transpiler" // 关键代码，引用dlight插件

export default defineConfig({
  server: {
    port: 26660
  },
  base: "",
  plugins: [
    dlight()
  ]
})
