import { defineConfig } from 'vite'
import path from 'path';
// import {dlight} from "vite-plugin-dlight-transpiler"
import {dlight} from "./packages/vite-plugin-dlight-transpiler/src"

export default defineConfig({
    base: '',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    },
    plugins: [
        dlight(),
    ]
});