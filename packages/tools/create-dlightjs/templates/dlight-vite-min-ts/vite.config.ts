import { defineConfig } from 'vite'
import dlight from "vite-plugin-dlight"

export default defineConfig({
    plugins: [
        dlight({ files: "**/*.{view,model}.ts" })
    ]
});