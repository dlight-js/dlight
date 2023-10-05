import { defineConfig } from 'vite'
import dlight from "../../packages/tools/vite-plugin-dlight/dist"

export default defineConfig({
    server: {
        port: 4320
    },
    base: '',
    plugins: [
        dlight({ files: "**/*.view.ts" }),
    ]
});