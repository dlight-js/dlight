import { Plugin } from 'vite'
import {go} from "../../src/babel"


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
            if (id.endsWith(".tsd")) {
                
                return go(code)

            }
            return code
        }
    };
}

