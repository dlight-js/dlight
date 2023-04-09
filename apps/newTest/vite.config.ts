import { defineConfig } from 'vite'
// @ts-ignore
import dlight from "vite-plugin-dlight-transpiler"

export default defineConfig({
    server: {
        port: 26660
    },
    base: '',
    plugins: [
        dlight(),
    ]
});