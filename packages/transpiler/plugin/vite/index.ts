import { Plugin } from 'vite'
import tsxConfig from "../../src/tsx"
import tsdConfig from "../../src/tsd"
import {geneParserNode} from "../../src"

export default function(): Plugin {
    return {
        name: 'dlight',
        enforce: 'pre',
        config(config) {
            return {
                ...config,
                esbuild: {
                    ...config.esbuild,
                    include: /\.(js|ts|jsd|tsd|jsx|tsx)$/,
                    loader: 'ts',
                },
            };
        },
        transform(code, id) {
            if (id.endsWith(".tsd")) {
                return geneParserNode(code, tsdConfig)
            }
            if (id.endsWith(".tsx")) {
                return geneParserNode(code, tsxConfig)
            }
        }
    };
}

