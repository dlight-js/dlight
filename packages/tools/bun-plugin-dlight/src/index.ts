import type { BunPlugin } from "bun"
import { transform } from "@babel/core"
import dlight, { type DLightOption } from "babel-preset-dlight"

export const dlightPlugin = ({
  filter = /\.(view|model)\.[tj]s$/,
  options = {},
}: {
  filter?: RegExp
  options?: DLightOption
} = {}): BunPlugin => ({
  name: "bun-plugin-dlight",
  setup(build) {
    build.onLoad({ filter }, async args => {
      const code = await Bun.file(args.path).text()

      const result = transform(code, {
        babelrc: false,
        configFile: false,
        presets: [[dlight, options]],
        sourceMaps: true,
        filename: args.path,
      })

      if (!result || !result.code) {
        throw new Error(`bun-plugin-dlight failed to process ${args.path}`)
      }

      return {
        contents: result.code,
        loader: "ts",
      }
    })
  },
})
