import { defineConfig } from 'vite'
import path from 'path';
import dlight from "./packages/transpiler/plugin/vite"

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    },
    plugins: [
        dlight(),
    ]
});