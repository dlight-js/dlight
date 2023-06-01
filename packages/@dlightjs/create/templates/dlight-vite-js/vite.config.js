import { defineConfig } from 'vite'
import dlight from "vite-plugin-dlight-transpiler"

export default defineConfig({
    server: {
        port: 6660
    },
    base: '',
    plugins: [
        dlight(),
    ]
});