import {geneParserNode, JSXConfig, JSDConfig} from "@dlightjs/transpiler"

export default function() {
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
            if (id.endsWith(".jsd") || id.endsWith(".tsd")) {
                return geneParserNode(code, JSDConfig)
            }
            if (id.endsWith(".jsx") || id.endsWith(".tsx")) {
                return geneParserNode(code, JSXConfig)
            }
            return code
        }
    }
}

