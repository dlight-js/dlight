import { transform } from "@babel/core"

export default function() {
  return {
    name: "decorator",
    transform(code: string, id: string) {
      return transform(code, {
        babelrc: false,
        configFile: false,
        plugins: [
          ["@babel/plugin-proposal-decorators", { version: "legacy" }],
          ["@babel/plugin-proposal-class-properties", { loose: true }]
        ],
        sourceMaps: true,
        filename: id
      })
    }
  } as any
}
