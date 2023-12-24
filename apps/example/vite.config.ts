import { defineConfig } from "vite"
import dlightjs from "vite-plugin-dlight-js"
import dlight from "vite-plugin-dlight"

export default defineConfig({
  server: {
    port: 4320
  },
  base: "",
  plugins: [
    dlight({ files: "**/*.view.js", enableDevTools: true }),
    // dlightjs(),
  ]
  // don't minify
  // build: {
  //   minify: false
  // }
})
