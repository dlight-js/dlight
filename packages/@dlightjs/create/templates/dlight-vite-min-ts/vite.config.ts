import { defineConfig } from 'vite'
import dlight from "vite-plugin-dlight"

export default defineConfig({
    server: {
        port: 4320
    },
    base: '',
    plugins: [
        dlight({ appendix: [".view.ts"] }),
    ]
});