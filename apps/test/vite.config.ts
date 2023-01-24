import { defineConfig } from 'vite'
import {dlight} from "vite-plugin-dlight-transpiler"

export default defineConfig({
    base: '',
    plugins: [
        dlight(),
    ]
});