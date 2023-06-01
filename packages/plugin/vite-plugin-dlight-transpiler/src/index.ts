import { parseDlightFile } from "@dlightjs/transpiler"
// import optionalThisPlugin from "babel-plugin-optional-this"
// // @ts-ignore
// import { transformSync } from "@babel/core"

// const transformOptionThisOption = {
//   plugins: [
//     optionalThisPlugin(),
//     ["@babel/plugin-syntax-typescript"],
//     "@babel/plugin-syntax-do-expressions",
//     ["@babel/plugin-syntax-decorators", { legacy: true }]
//   ]
// }
// function transformOptionThis(code: string) {
//   return transformSync(code, transformOptionThisOption).code
// }

export default function() {
  return {
    name: "dlight",
    enforce: "pre",
    config(config: any) {
      return {
        ...config,
        esbuild: {
          ...config.esbuild,
          include: /\.(js|ts|jsd|tsd)$/,
          loader: "ts"
        }
      }
    },
    transform(code: string, id: string) {
      if (id.endsWith(".jsd") || id.endsWith(".tsd") ||
        id.endsWith(".view.js") || id.endsWith(".view.ts")) {
        // ---- wait till language server is ready
        // if (optionalThis) code = transformOptionThis(code)
        return parseDlightFile(code)
      }
      return code
    }
  } as any
}
