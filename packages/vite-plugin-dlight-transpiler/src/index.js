import {parseDlightFile} from "@dlightjs/transpiler"

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
                return parseDlightFile(code, "jsd")
            }
            if (id.endsWith(".jsx") || id.endsWith(".tsx")) {
                return parseDlightFile(code, "jsx")
            }
            return code
        }
    }
}

