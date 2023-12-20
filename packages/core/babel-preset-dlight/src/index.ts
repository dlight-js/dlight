import syntaxTypescript from "babel-plugin-syntax-typescript-new"
import syntaxDecorators from "@babel/plugin-syntax-decorators"
import dlight from "./plugin"
import { type DLightOption } from "./types"
import { type ConfigAPI, type TransformOptions } from "@babel/core"

export default function(_: ConfigAPI, options: DLightOption): TransformOptions {
  return {
    plugins: [
      syntaxTypescript,
      [syntaxDecorators.default ?? syntaxDecorators, { legacy: true }],
      [dlight, options]
    ]
  }
}

export { type DLightOption }
