import { defineConfig } from 'vite'
import dlight from "vite-plugin-dlight"

export default defineConfig({
    server: {
        port: 5780
    },
    base: '',
    plugins: [
        dlight({ appendix: [".view.js"] }),
    ]
});