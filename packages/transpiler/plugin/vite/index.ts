import { Plugin } from 'vite'
import {transpileDLightTsCode} from "../../src/fileParser";


export default function(): Plugin {
    return {
        name: 'dlight',
        enforce: 'pre',
        config(config) {
            return {
                ...config,
                esbuild: {
                    ...config.esbuild,
                    include: /\.(js|ts|jsd|tsd)$/,
                    loader: 'ts',
                },
            };
        },
        transform(code, id) {
            return (id.endsWith(".tsd") || id.endsWith(".jsd")) ? transpileDLightTsCode(code) : code
        }
    };
}

