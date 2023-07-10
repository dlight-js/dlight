// @ts-ignore
import { transform } from "@babel/core"
import dlight, { type DLightOption } from "babel-preset-dlight"

export default function(options: DLightOption = {}) {
  return {
    name: "dlight",
    enforce: "pre",
    transform(code: string, id: string) {
      return transform(code, {
        presets: [[dlight, options]],
        sourceMaps: true,
        filename: id
      })
    }
  } as any
}
