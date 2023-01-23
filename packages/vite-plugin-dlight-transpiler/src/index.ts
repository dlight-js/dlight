import tsxConfig from "../../../src/transpiler/tsx"
import tsdConfig from "../../../src/transpiler/tsd"
import {geneParserNode} from "../../../src/transpiler"

export function dlight() {
    return {
        name: 'dlight',
        enforce: 'pre',
        config(config: any) {
            return {
                ...config,
                esbuild: {
                    ...config.esbuild,
                    include: /\.(js|ts|jsd|tsd|jsx|tsx)$/,
                    loader: 'ts',
                },
            };
        },
        transform(code: string, id: string) {
            if (id.endsWith(".tsd") || id.endsWith(".jsd")) {
                return geneParserNode(code, tsdConfig)
            }
            if (id.endsWith(".tsx") || id.endsWith(".jsx")) {
                return geneParserNode(code, tsxConfig)
            }
            return code
        }
    } as any
}

