import { defineConfig } from 'vite'
import { dlight } from "vite-plugin-dlight-transpiler"

export default defineConfig({
    server: {
        // open: '/index.html',
        port: 6660
    },
    base: '',
    plugins: [
        dlight(),
    ]
});