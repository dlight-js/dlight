import { defineConfig } from 'vite'
// @ts-ignore
import dlight from "vite-plugin-dlight-transpiler"
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts({ include: './src' }),
        dlight()
    ],
    build: {
        lib: {
            entry: resolve(__dirname, './src/index.ts'),
            name: "emotion",
            fileName: 'index'
        },
        rollupOptions: {
            external: ["@dlightjs/dlight"]
        }
    }
});