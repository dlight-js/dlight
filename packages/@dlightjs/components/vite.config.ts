import { defineConfig } from 'vite'
import { dlight } from "vite-plugin-dlight-transpiler"
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts({ include: './src' }),
        dlight()
    ],
    build: {
        minify: true,
        lib: {
            entry: resolve(__dirname, './src/index.ts'),
            name: 'Bundle',
            fileName: 'index'
        }
    }
});