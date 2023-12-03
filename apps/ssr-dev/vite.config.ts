import { defineConfig } from "vite"
import dlightServer from "vite-plugin-dlight-server"
import dlightClient from "vite-plugin-dlight-client"
import path from "path"

function mySSRPlugin() {
  return {
    name: "my-ssr",
    enforce: "pre",
    transform(code, id, options) {
      return (options?.ssr ? dlightServer : dlightClient)({ files: "**/*.view.ts" }).transform(code, id)
    }
  }
}

export default defineConfig({
  server: {
    port: 26660
  },
  plugins: [
    mySSRPlugin()
  ]
})
