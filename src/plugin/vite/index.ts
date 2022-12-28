import { Plugin } from 'vite'
import {transpileDLightTsCode} from "../../transpiler";


export default function(): Plugin {
    return {
        name: 'dlight',
        enforce: 'pre',
        config(config) {
            return {
                ...config,
                esbuild: {
                    ...config.esbuild,
                    include: /\.(js|ts|tsd)$/,
                    loader: 'ts',
                },
            };
        },
        transform(code, id) {
            if (id.endsWith(".tsd")) {
                // console.log(transpileDlightTsCode(code))
            }
            return id.endsWith(".tsd") ? transpileDLightTsCode(code) : code
        }
    };
}

