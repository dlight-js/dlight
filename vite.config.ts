import { defineConfig } from 'vite'
import path from 'path';
import dlight from "./src/plugin/vite/index"

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